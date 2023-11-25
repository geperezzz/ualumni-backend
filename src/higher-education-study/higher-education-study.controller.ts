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
  HttpException,
  DefaultValuePipe,
  ParseIntPipe,
  BadRequestException,
  NotFoundException,
  InternalServerErrorException,
  Query,
} from '@nestjs/common';
import { HigherEducationStudyService } from './higher-education-study.service';
import { CreateHigherEducationStudyDto } from './dto/create-higher-education-study.dto';
import { UpdateHigherEducationStudyDto } from './dto/update-higher-education-study.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import {
  AlreadyExistsError,
  NotFoundError,
} from 'src/common/error/service.error';
import { ResponseDto } from 'src/common/dto/response.dto';
import { HigherEducationStudyDto } from './dto/higher-education-study.dto';
import { title } from 'process';

@Controller('higher-education-study')
export class HigherEducationStudyController {
  constructor(
    private readonly higherEducationStudyService: HigherEducationStudyService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    description: 'The higher education study was succesfully created',
  })
  @ApiBadRequestResponse({
    description: 'Already exists a higher education study with the given title',
  })
  async create(
    @Body() createHigherEducationStudyDto: CreateHigherEducationStudyDto,
  ) {
    try {
      console.log(createHigherEducationStudyDto)

      const data = await this.higherEducationStudyService.create(
        createHigherEducationStudyDto,
      );
      return {
        statusCode: HttpStatus.CREATED,
        data,
      };
    } catch (error) {
      if (error instanceof AlreadyExistsError)
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
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('per-page', new DefaultValuePipe(10), ParseIntPipe) perPage: number,
  ): Promise<any> {
    if (perPage < 1)
      throw new BadRequestException('Invalid number of items per page');
    try {
      const paginationResponse =
        await this.higherEducationStudyService.findMany(page, perPage);
      return {
        statusCode: HttpStatus.OK,
        data: paginationResponse,
      };
    } catch (error) {
      const message = error.response ? error.response : 'Bad Request';
      throw new HttpException(message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':resumeOwnerEmail/:title')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Higher education study was succesfully found',
  })
  @ApiNotFoundResponse({
    description:
      'The higher education study for the requested alumni was not found',
  })
  @ApiInternalServerErrorResponse({
    description: 'An unexpected situation ocurred',
  })
  async findOne(
    @Param('resumeOwnerEmail') resumeOwnerEmail: string,
    @Param('title') title: string,
  ) {
    const higherEducationStudy = await this.higherEducationStudyService.findOne(
      title,
      resumeOwnerEmail,
    );

    if (!higherEducationStudy)
      throw new NotFoundException(
        `There is no higher education study with the given \`title\` (${title})`,
      );
    return {
      statusCode: HttpStatus.OK,
      data: higherEducationStudy,
    };
  }

  @Patch(':resumeOwnerEmail/:title')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Higher education study was succesfully updated',
  })
  @ApiNotFoundResponse({
    description:
      'The higher education study with the requested name was not found',
  })
  @ApiBadRequestResponse({
    description: 'Already exist a higher education study with the given title',
  })
  @ApiInternalServerErrorResponse({
    description: 'An unexpected situation ocurred',
  })
  async update(
    @Param('resumeOwnerEmail') resumeOwnerEmail: string,
    @Param('title') title: string,
    @Body() updateHigherEducationStudyDto: UpdateHigherEducationStudyDto,
  ) {
    try {
      const updatedHigherEducationStudy =
        await this.higherEducationStudyService.update(
          title,
          resumeOwnerEmail,
          updateHigherEducationStudyDto,
        );
      return { statusCode: HttpStatus.OK, data: updatedHigherEducationStudy };
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

  @Delete(':resumeOwnerEmail/:title')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Higher education study was succesfully delete',
  })
  @ApiNotFoundResponse({
    description:
      'The higher education study with the requested name was not found',
  })
  @ApiInternalServerErrorResponse({
    description: 'An unexpected situation ocurred',
  })
  async remove(
    @Param('resumeOwnerEmail') resumeOwnerEmail: string,
    @Param('title') title: string,
  ): Promise<ResponseDto<HigherEducationStudyDto>> {
    try {
      const deletedHigherEducationStudy =
        await this.higherEducationStudyService.remove(title, resumeOwnerEmail);
      return {
        statusCode: HttpStatus.OK,
        data: deletedHigherEducationStudy,
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