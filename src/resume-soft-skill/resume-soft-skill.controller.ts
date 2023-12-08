import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  BadRequestException,
  InternalServerErrorException,
  DefaultValuePipe,
  ParseIntPipe,
  Query,
  HttpException,
  NotFoundException,
} from '@nestjs/common';
import { ResumeSoftSkillService } from './resume-soft-skill.service';
import { CreateResumeSoftSkillDto } from './dto/create-resume-soft-skill.dto';
import { UpdateResumeSoftSkillDto } from './dto/update-resume-soft-skill.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  AlreadyExistsError,
  ForeignKeyError,
} from 'src/common/errors/service.error';
import { NotFoundError } from 'src/common/errors/service.error';
import { ResponseDto } from 'src/common/dto/response.dto';
import { ResumeSoftSkillDto } from './dto/resume-soft-skill.dto';

@ApiTags('resume-soft-skill')
@Controller('user/:email/resume/soft-skill')
export class ResumeSoftSkillController {
  constructor(
    private readonly resumeSoftSkillService: ResumeSoftSkillService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    description: 'The resume soft skill was succesfully created',
  })
  @ApiBadRequestResponse({
    description: 'Already exists a resume soft skill with the given title',
  })
  async create(
    @Param('email') resumeOwnerEmail: string,
    @Body() createResumeSoftSkillDto: CreateResumeSoftSkillDto,
  ) {
    try {
      const data = await this.resumeSoftSkillService.create(
        resumeOwnerEmail,
        createResumeSoftSkillDto,
      );
      return {
        statusCode: HttpStatus.CREATED,
        data,
      };
    } catch (error) {
      if (error instanceof AlreadyExistsError)
        throw new BadRequestException(error.message, { cause: error });
      if (error instanceof ForeignKeyError)
        throw new BadRequestException(error.message, { cause: error });
      throw new InternalServerErrorException(
        'An unexpected situation ocurred',
        { cause: error },
      );
    }
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description:
      'The list of higher education studies was succesfully obtained',
  })
  @ApiBadRequestResponse({
    description: 'Invalid number of items per page requested',
  })
  @ApiInternalServerErrorResponse({
    description: 'An unexpected situation ocurred',
  })
  async findMany(
    @Param('email') resumeOwnerEmail: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('per-page', new DefaultValuePipe(10), ParseIntPipe) perPage: number,
  ): Promise<any> {
    if (perPage < 1)
      throw new BadRequestException('Invalid number of items per page');
    try {
      const paginationResponse = await this.resumeSoftSkillService.findMany(
        resumeOwnerEmail,
        page,
        perPage,
      );
      return {
        statusCode: HttpStatus.OK,
        data: paginationResponse,
      };
    } catch (error) {
      const message = error.response ? error.response : 'Bad Request';
      throw new HttpException(message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':title')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Higher education study was succesfully found',
  })
  @ApiNotFoundResponse({
    description: 'The resume soft skill for the requested alumni was not found',
  })
  @ApiInternalServerErrorResponse({
    description: 'An unexpected situation ocurred',
  })
  async findOne(
    @Param('email') resumeOwnerEmail: string,
    @Param('title') title: string,
  ) {
    const resumeSoftSkill = await this.resumeSoftSkillService.findOne(
      title,
      resumeOwnerEmail,
    );

    if (!resumeSoftSkill)
      throw new NotFoundException(
        `There is no resume soft skill with the given \`title\` (${title})`,
      );
    return {
      statusCode: HttpStatus.OK,
      data: resumeSoftSkill,
    };
  }

  @Patch(':title')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Higher education study was succesfully updated',
  })
  @ApiNotFoundResponse({
    description: 'The resume soft skill with the requested name was not found',
  })
  @ApiBadRequestResponse({
    description: 'Already exist a resume soft skill with the given title',
  })
  @ApiInternalServerErrorResponse({
    description: 'An unexpected situation ocurred',
  })
  async update(
    @Param('email') resumeOwnerEmail: string,
    @Param('title') title: string,
    @Body() updateResumeSoftSkillDto: UpdateResumeSoftSkillDto,
  ) {
    try {
      const updatedResumeSoftSkill = await this.resumeSoftSkillService.update(
        title,
        resumeOwnerEmail,
        updateResumeSoftSkillDto,
      );
      return { statusCode: HttpStatus.OK, data: updatedResumeSoftSkill };
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new NotFoundException(error.message, { cause: error });
      }
      if (error instanceof AlreadyExistsError) {
        throw new BadRequestException(error.message, { cause: error });
      }
      throw new InternalServerErrorException(
        'An unexpected situation ocurred',
        { cause: error },
      );
    }
  }

  @Delete(':title')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Higher education study was succesfully deleted',
  })
  @ApiNotFoundResponse({
    description: 'The resume soft skill with the requested title was not found',
  })
  @ApiInternalServerErrorResponse({
    description: 'An unexpected situation ocurred',
  })
  async remove(
    @Param('email') resumeOwnerEmail: string,
    @Param('title') title: string,
  ): Promise<ResponseDto<ResumeSoftSkillDto>> {
    try {
      const deletedResumeSoftSkill = await this.resumeSoftSkillService.remove(
        title,
        resumeOwnerEmail,
      );
      return {
        statusCode: HttpStatus.OK,
        data: deletedResumeSoftSkill,
      };
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new NotFoundException(error.message, { cause: error });
      }
      throw new InternalServerErrorException(
        'An unexpected situation ocurred',
        { cause: error },
      );
    }
  }
}
