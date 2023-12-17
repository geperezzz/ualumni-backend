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
import { PrismaClient} from '@prisma/client';
import { SessionNotRequired } from 'src/auth/session/session-not-required.decorator';
import { PaginationParamsDto } from 'src/common/dto/pagination-params.dto';
import { PaginatedResponseDto } from 'src/common/dto/paginated-response.dto';

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
      'There is no alumni with the given email, or there is no CIAP course with the given id',
  })
  @ApiInternalServerErrorResponse({
    description: 'An unexpected situation ocurred',
  })
  async addMine(
    @SessionUser() user: PrismaClient,
    @Body() createResumeCiapCourseDto: CreateResumeCiapCourseDto,
  ): Promise<ResponseDto<ResumeCiapCourseDto>> {
    try {
      const resumeCiapCourse = await this.resumeCiapCoursesService.create(
        user.email,
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

  @Post('email:/resume/ciap-courses')
  @Allowed('admin')
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
  async add(
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

  @Get('me/resume/ciap-courses')
  @Allowed('alumni')
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
  async findPageMine(
    @SessionUser() user: PrismaClient,
    @Query() paginationParamsDto: PaginationParamsDto,
  ): Promise<PaginatedResponseDto<ResumeCiapCourseDto>> {
    try {
      const resumeCiapCourses = await this.resumeCiapCoursesService.findMany(
        user.email,
        paginationParamsDto.pageNumber,
        paginationParamsDto.itemsPerPage,
      );
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

  @Get(':email/resume/ciap-courses')
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
    @Param('email') ownerEmail: string,
    @Query() paginationParamsDto: PaginationParamsDto,
  ): Promise<PaginatedResponseDto<ResumeCiapCourseDto>> {
    try {
      const resumeCiapCourses = await this.resumeCiapCoursesService.findMany(
        ownerEmail,
        paginationParamsDto.pageNumber,
        paginationParamsDto.itemsPerPage,
      );
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
    @SessionUser() user: PrismaClient,
    @Param('id') id: string,
  ): Promise<ResponseDto<ResumeCiapCourseDto>> {
    const resumeCiapCourse = await this.resumeCiapCoursesService.findOne(
      user.email,
      id,
    );
    if (!resumeCiapCourse) {
      throw new NotFoundException(
        `There is no ciap course did by alumni with the \`email\` (${user.email}) with the given \`id\` (${id})`,
      );
    }
    return {
      statusCode: HttpStatus.OK,
      data: resumeCiapCourse,
    };
  }

  @Get(':email/resume/ciap-courses/:id')
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
    @SessionUser() user: PrismaClient,
    @Param('id') id: string,
  ): Promise<ResponseDto<ResumeCiapCourseDto>> {
    try {
      const deletedResumeCiapCourse =
        await this.resumeCiapCoursesService.remove(user.email, id);
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

  @Delete(':email/resume/ciap-courses/:id')
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
