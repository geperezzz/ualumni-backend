import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
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
import { ApiTags } from '@nestjs/swagger';
import { ForeignKeyError } from 'src/common/error/service.error';

@ApiTags('resume-ciap-courses')
@Controller('user/:email/resume/resume-ciap-courses')
export class ResumeCiapCoursesController {
  constructor(
    private readonly resumeCiapCoursesService: ResumeCiapCoursesService,
  ) {}

  @Post()
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

  @Get(':name')
  @HttpCode(HttpStatus.OK)
  async findOne(
    @Param('email') ownerEmail: string,
    @Param('name') name: string,
  ): Promise<ResponseDto<ResumeCiapCourseDto>> {
    const resumeCiapCourse = await this.resumeCiapCoursesService.findOne(
      ownerEmail,
      name,
    );
    if (!resumeCiapCourse) {
      throw new NotFoundException(
        `There is no ciap course did by alumni with the \`email\` (${ownerEmail}) with the given \`name\` (${name})`,
      );
    }
    return {
      statusCode: HttpStatus.OK,
      data: resumeCiapCourse,
    };
  }

  @Delete(':name')
  async remove(
    @Param('email') ownerEmail: string,
    @Param('name') name: string,
  ): Promise<ResponseDto<ResumeCiapCourseDto>> {
    try {
      const deletedResumeCiapCourse =
        await this.resumeCiapCoursesService.remove(ownerEmail, name);
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
