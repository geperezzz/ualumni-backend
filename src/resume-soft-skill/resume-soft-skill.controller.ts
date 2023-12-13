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
  UseGuards,
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
import { SessionUser } from 'src/auth/session/session-user.decorator';
import { User } from '@prisma/client';
import { SessionAuthGuard } from 'src/auth/session/session.guard';
import { PermissionsGuard } from 'src/permissions/permissions.guard';
import { Allowed } from 'src/permissions/allowed-roles.decorator';
import { PaginationParamsDto } from 'src/common/dto/pagination-params.dto';
import { PaginatedResponseDto } from 'src/common/dto/paginated-response.dto';
import { SessionNotRequired } from 'src/auth/session/session-not-required.decorator';

@ApiTags('resume-soft-skill')
@Controller('alumni')
@UseGuards(SessionAuthGuard, PermissionsGuard)
export class ResumeSoftSkillController {
  constructor(
    private readonly resumeSoftSkillService: ResumeSoftSkillService,
  ) {}

  @Post('me/resume/soft-skill')
  @Allowed('alumni')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    description: 'The resume soft skill was succesfully created',
  })
  @ApiBadRequestResponse({
    description: 'Already exists a resume soft skill with the given title',
  })
  async addMine(
    @SessionUser() user: User,
    @Body() createResumeSoftSkillDto: CreateResumeSoftSkillDto,
  ): Promise<ResponseDto<ResumeSoftSkillDto>> {
    try {
      const data = await this.resumeSoftSkillService.create(
        user.email,
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

  @Post(':email/resume/soft-skill')
  @Allowed('admin')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    description: 'The resume soft skill was succesfully created',
  })
  @ApiBadRequestResponse({
    description: 'Already exists a resume soft skill with the given title',
  })
  async add(
    @Param('email') resumeOwnerEmail: string,
    @Body() createResumeSoftSkillDto: CreateResumeSoftSkillDto,
  ): Promise<ResponseDto<ResumeSoftSkillDto>> {
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

  @Get('me/resume/soft-skill')
  @Allowed('alumni')
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
  async findPageMine(
    @SessionUser() user: User,
    @Query() paginationParamsDto: PaginationParamsDto,
  ): Promise<PaginatedResponseDto<ResumeSoftSkillDto>> {
    if (paginationParamsDto.itemsPerPage < 1)
      throw new BadRequestException('Invalid number of items per page');
    try {
      const paginationResponse = await this.resumeSoftSkillService.findMany(
        user.email,
        paginationParamsDto.pageNumber,
        paginationParamsDto.itemsPerPage,
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

  @Get(':email/resume/soft-skill')
  @SessionNotRequired()
  @Allowed('admin', 'visitor')
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
  async findPage(
    @Param('email') resumeOwnerEmail: string,
    @Query() paginationParamsDto: PaginationParamsDto,
  ): Promise<PaginatedResponseDto<ResumeSoftSkillDto>> {
    if (paginationParamsDto.itemsPerPage < 1)
      throw new BadRequestException('Invalid number of items per page');
    try {
      const paginationResponse = await this.resumeSoftSkillService.findMany(
        resumeOwnerEmail,
        paginationParamsDto.pageNumber,
        paginationParamsDto.itemsPerPage,
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

  @Get('me/resume/soft-skill/:title')
  @Allowed('alumni')
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
  async findMine(
    @SessionUser() user: User,
    @Param('title') title: string,
  ): Promise<ResponseDto<ResumeSoftSkillDto>> {
    const resumeSoftSkill = await this.resumeSoftSkillService.findOne(
      title,
      user.email,
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

  @Get(':email/resume/soft-skill/:title')
  @SessionNotRequired()
  @Allowed('admin', 'visitor')
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
  ): Promise<ResponseDto<ResumeSoftSkillDto>> {
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

  @Patch('me/resume/soft-skill/:title')
  @Allowed('alumni')
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
  async updateMine(
    @SessionUser() user: User,
    @Param('title') title: string,
    @Body() updateResumeSoftSkillDto: UpdateResumeSoftSkillDto,
  ): Promise<ResponseDto<ResumeSoftSkillDto>> {
    try {
      const updatedResumeSoftSkill = await this.resumeSoftSkillService.update(
        title,
        user.email,
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

  @Patch(':email/resume/soft-skill/:title')
  @Allowed('admin')
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
  ): Promise<ResponseDto<ResumeSoftSkillDto>> {
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

  @Delete('me/resume/soft-skill/:title')
  @Allowed('alumni')
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
  async removeMine(
    @SessionUser() user: User,
    @Param('title') title: string,
  ): Promise<ResponseDto<ResumeSoftSkillDto>> {
    try {
      const deletedResumeSoftSkill = await this.resumeSoftSkillService.remove(
        title,
        user.email,
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

  @Delete(':email/resume/soft-skill/:title')
  @Allowed('admin')
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
