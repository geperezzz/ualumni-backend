import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpStatus,
  InternalServerErrorException,
  BadRequestException,
  HttpCode,
  NotFoundException,
} from '@nestjs/common';
import { ResumeCiapCoursesService } from './resume-ciap-courses.service';
import { CreateResumeCiapCourseDto } from './dto/create-resume-ciap-course.dto';
import { ResponseDto } from 'src/common/dto/response.dto';
import { ResumeCiapCourseDto } from './dto/resume-ciap-course.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ForeignKeyError } from 'src/common/error/service.error';

@ApiTags('resume-ciap-courses')
@Controller('user/:email/resume/ciap-courses')
export class ResumeCiapCoursesController {
  constructor(
    private readonly resumeCiapCoursesService: ResumeCiapCoursesService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    description: 'The CIAP course was succesfully added to the resume',
  })
  @ApiBadRequestResponse({
    description:
      'There is no alumni with the given email, or there is no CIAP course with the given id',
  })
  @ApiInternalServerErrorResponse({
    description: 'An unexpected situation ocurred',
  })
  async create(
    @Param('email') ownerEmail: string,
    @Body() createResumeCiapCourseDto: CreateResumeCiapCourseDto,
  ): Promise<ResponseDto<ResumeCiapCourseDto>> {
    try {
      const resumeCiapCourse = await this.resumeCiapCoursesService.create(
        ownerEmail,
        createResumeCiapCourseDto,
      );
      return {
        statusCode: HttpStatus.CREATED,
        data: resumeCiapCourse,
      };
    } catch (error) {
      if (error instanceof ForeignKeyError) {
        throw new BadRequestException(error.message, { cause: error });
      }

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
      'The list of CIAP courses did by the alumni was succesfully obtained',
  })
  @ApiBadRequestResponse({
    description: 'Invalid number of items per page requested',
  })
  @ApiInternalServerErrorResponse({
    description: 'An unexpected situation ocurred',
  })
  async findAll(
    @Param('email') ownerEmail: string,
  ): Promise<ResponseDto<ResumeCiapCourseDto[]>> {
    try {
      const resumeCiapCourses =
        await this.resumeCiapCoursesService.findAll(ownerEmail);
      return {
        statusCode: HttpStatus.OK,
        data: resumeCiapCourses,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'An unexpected situation ocurred',
        { cause: error },
      );
    }
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'CIAP course did by the alumni was succesfully found',
  })
  @ApiNotFoundResponse({
    description:
      'The CIAP course did by the alumni with the requested id was not found',
  })
  @ApiInternalServerErrorResponse({
    description: 'An unexpected situation ocurred',
  })
  @HttpCode(HttpStatus.OK)
  async findOne(
    @Param('email') ownerEmail: string,
    @Param('id') id: string,
  ): Promise<ResponseDto<ResumeCiapCourseDto>> {
    const resumeCiapCourse = await this.resumeCiapCoursesService.findOne(
      ownerEmail,
      id,
    );
    if (!resumeCiapCourse) {
      throw new NotFoundException(
        `There is no ciap course did by alumni with the \`email\` (${ownerEmail}) with the given \`id\` (${id})`,
      );
    }
    return {
      statusCode: HttpStatus.OK,
      data: resumeCiapCourse,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'CIAP course did by the alumni was succesfully delete',
  })
  @ApiNotFoundResponse({
    description:
      'The CIAP course did by the alumni with the requested id was not found',
  })
  @ApiInternalServerErrorResponse({
    description: 'An unexpected situation ocurred',
  })
  async remove(
    @Param('email') ownerEmail: string,
    @Param('id') id: string,
  ): Promise<ResponseDto<ResumeCiapCourseDto>> {
    try {
      const deletedResumeCiapCourse =
        await this.resumeCiapCoursesService.remove(ownerEmail, id);
      return {
        statusCode: HttpStatus.OK,
        data: deletedResumeCiapCourse,
      };
    } catch (error) {
      if (error instanceof ForeignKeyError) {
        throw new BadRequestException(error.message, { cause: error });
      }
      throw new InternalServerErrorException(
        'An unexpected situation ocurred',
        { cause: error },
      );
    }
  }
}
