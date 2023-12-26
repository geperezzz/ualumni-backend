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
  UseGuards,
  Query,
  Patch,
  ParseUUIDPipe,
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
import { ForeignKeyError } from 'src/common/errors/service.error';
import { PermissionsGuard } from 'src/permissions/permissions.guard';
import { SessionAuthGuard } from 'src/auth/session/session.guard';
import { Allowed } from 'src/permissions/allowed-roles.decorator';
import { SessionUser } from 'src/auth/session/session-user.decorator';
import { User } from 'prisma/ualumni/client';
import { SessionNotRequired } from 'src/auth/session/session-not-required.decorator';
import { PaginationParamsDto } from 'src/common/dto/pagination-params.dto';
import { PaginatedResponseDto } from 'src/common/dto/paginated-response.dto';
import { UpdateResumeCiapCourseDto } from './dto/update-resume-ciap-course.dto';

@ApiTags('resume-ciap-courses')
@Controller('alumni')
@UseGuards(SessionAuthGuard, PermissionsGuard)
export class ResumeCiapCoursesController {
  constructor(
    private readonly resumeCiapCoursesService: ResumeCiapCoursesService,
  ) {}

  @Post('me/resume/ciap-courses')
  @Allowed('alumni')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    description: 'The CIAP course was succesfully added to the resume',
  })
  @ApiBadRequestResponse({
    description:
      'There is no CIAP course with the given id',
  })
  @ApiInternalServerErrorResponse({
    description: 'An unexpected situation ocurred',
  })
  async addMine(
    @SessionUser() user: User,
    @Body() createResumeCiapCourseDto: CreateResumeCiapCourseDto,
  ): Promise<ResponseDto<ResumeCiapCourseDto>> {
    try {
      const resumeCiapCourse = await this.resumeCiapCoursesService.create(
        user.id,
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

      throw error;
    }
  }

  @Post('alumniId:/resume/ciap-courses')
  @Allowed('admin')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    description: 'The CIAP course was succesfully added to the resume',
  })
  @ApiBadRequestResponse({
    description:
      'There is no alumni with the given id, or there is no CIAP course with the given id',
  })
  @ApiInternalServerErrorResponse({
    description: 'An unexpected situation ocurred',
  })
  async add(
    @Param('alumniId', ParseUUIDPipe) alumniId: string,
    @Body() createResumeCiapCourseDto: CreateResumeCiapCourseDto,
  ): Promise<ResponseDto<ResumeCiapCourseDto>> {
    try {
      const resumeCiapCourse = await this.resumeCiapCoursesService.create(
        alumniId,
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

      throw error;
    }
  }

  @Get('me/resume/ciap-courses')
  @Allowed('alumni')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description:
      'The list of CIAP courses done by the alumni was succesfully obtained',
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
  ): Promise<PaginatedResponseDto<ResumeCiapCourseDto>> {
    const resumeCiapCourses = await this.resumeCiapCoursesService.findMany(
      user.id,
      paginationParamsDto.pageNumber,
      paginationParamsDto.itemsPerPage,
    );
    return {
      statusCode: HttpStatus.OK,
      data: resumeCiapCourses,
    };
  }

  @Get(':alumniId/resume/ciap-courses')
  @SessionNotRequired()
  @Allowed('admin', 'visitor')
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
  async findPage(
    @Param('alumniId', ParseUUIDPipe) alumniId: string,
    @Query() paginationParamsDto: PaginationParamsDto,
  ): Promise<PaginatedResponseDto<ResumeCiapCourseDto>> {
    const resumeCiapCourses = await this.resumeCiapCoursesService.findMany(
      alumniId,
      paginationParamsDto.pageNumber,
      paginationParamsDto.itemsPerPage,
    );
    return {
      statusCode: HttpStatus.OK,
      data: resumeCiapCourses,
    };
  }

  @Get('me/resume/ciap-courses/:id')
  @Allowed('alumni')
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
  async findOneMine(
    @SessionUser() user: User,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseDto<ResumeCiapCourseDto>> {
    const resumeCiapCourse = await this.resumeCiapCoursesService.findOne(
      user.id,
      id,
    );
    if (!resumeCiapCourse) {
      throw new NotFoundException(
        `There is no ciap course did by alumni with the \`id\` (${user.id}) with the given \`id\` (${id})`,
      );
    }
    return {
      statusCode: HttpStatus.OK,
      data: resumeCiapCourse,
    };
  }

  @Get(':alumniId/resume/ciap-courses/:id')
  @SessionNotRequired()
  @Allowed('admin', 'visitor')
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
    @Param('alumniId', ParseUUIDPipe) alumniId: string,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseDto<ResumeCiapCourseDto>> {
    const resumeCiapCourse = await this.resumeCiapCoursesService.findOne(
      alumniId,
      id,
    );
    if (!resumeCiapCourse) {
      throw new NotFoundException(
        `There is no ciap course did by alumni with the \`id\` (${alumniId}) with the given \`id\` (${id})`,
      );
    }
    return {
      statusCode: HttpStatus.OK,
      data: resumeCiapCourse,
    };
  }

  @Patch('me/resume/ciap-courses/:courseId')
  @Allowed('alumni')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'CIAP course did by the alumni was succesfully updated',
  })
  @ApiNotFoundResponse({
    description:
      'The CIAP course did by the alumni with the requested id was not found',
  })
  @ApiInternalServerErrorResponse({
    description: 'An unexpected situation ocurred',
  })
  async updateMine(
    @SessionUser() user: User,
    @Param('courseId') courseId: string,
    @Body() updateResumeCiapCourseDto: UpdateResumeCiapCourseDto,
  ): Promise<ResponseDto<ResumeCiapCourseDto>> {
    try {
      const updatedResumeCiapCourse =
        await this.resumeCiapCoursesService.update(
          user.id,
          courseId,
          updateResumeCiapCourseDto,
        );
      return {
        statusCode: HttpStatus.OK,
        data: updatedResumeCiapCourse,
      };
    } catch (error) {
      if (error instanceof ForeignKeyError) {
        throw new BadRequestException(error.message, { cause: error });
      }
      throw error;
    }
  }

  @Patch(':alumniId/resume/ciap-courses/:courseId')
  @Allowed('admin')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'CIAP course did by the alumni was succesfully updated',
  })
  @ApiNotFoundResponse({
    description:
      'The CIAP course did by the alumni with the requested id was not found',
  })
  @ApiInternalServerErrorResponse({
    description: 'An unexpected situation ocurred',
  })
  async update(
    @Param('alumniId') alumniId: string,
    @Param('courseId') courseId: string,
    @Body() updateResumeCiapCourseDto: UpdateResumeCiapCourseDto,
  ): Promise<ResponseDto<ResumeCiapCourseDto>> {
    try {
      const updatedResumeCiapCourse =
        await this.resumeCiapCoursesService.update(
          alumniId,
          courseId,
          updateResumeCiapCourseDto,
        );
      return {
        statusCode: HttpStatus.OK,
        data: updatedResumeCiapCourse,
      };
    } catch (error) {
      if (error instanceof ForeignKeyError) {
        throw new BadRequestException(error.message, { cause: error });
      }
      throw error;
    }
  }

  @Delete('me/resume/ciap-courses/:id')
  @Allowed('alumni')
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
  async removeMine(
    @SessionUser() user: User,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseDto<ResumeCiapCourseDto>> {
    try {
      const deletedResumeCiapCourse =
        await this.resumeCiapCoursesService.remove(user.id, id);
      return {
        statusCode: HttpStatus.OK,
        data: deletedResumeCiapCourse,
      };
    } catch (error) {
      if (error instanceof ForeignKeyError) {
        throw new BadRequestException(error.message, { cause: error });
      }
      throw error;
    }
  }

  @Delete(':alumniId/resume/ciap-courses/:id')
  @Allowed('alumni')
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
    @Param('alumniId', ParseUUIDPipe) alumniId: string,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseDto<ResumeCiapCourseDto>> {
    try {
      const deletedResumeCiapCourse =
        await this.resumeCiapCoursesService.remove(alumniId, id);
      return {
        statusCode: HttpStatus.OK,
        data: deletedResumeCiapCourse,
      };
    } catch (error) {
      if (error instanceof ForeignKeyError) {
        throw new BadRequestException(error.message, { cause: error });
      }
      throw error;
    }
  }
}
