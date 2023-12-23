import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  HttpStatus,
  NotFoundException,
  Query,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { WorkExperiencesService } from './work-experiences.service';
import { CreateWorkExperienceDto } from './dto/create-work-experience.dto';
import { UpdateWorkExperienceDto } from './dto/update-work-experience.dto';
import { SessionAuthGuard } from 'src/auth/session/session.guard';
import { PermissionsGuard } from 'src/permissions/permissions.guard';
import { Allowed } from 'src/permissions/allowed-roles.decorator';
import { SessionUser } from 'src/auth/session/session-user.decorator';
import { User } from '../../prisma/ualumni/client';
import { ApiTags } from '@nestjs/swagger';
import { SessionNotRequired } from 'src/auth/session/session-not-required.decorator';
import { ResponseDto } from 'src/common/dto/response.dto';
import { WorkExperienceDto } from './dto/work-experience.dto';
import { PaginationParamsDto } from 'src/common/dto/pagination-params.dto';
import { PageDto, PagedResponseDto } from 'src/common/dto/paged-response.dto';
import { NotFoundError } from 'src/common/errors/service.error';

@Controller('alumni')
@UseGuards(SessionAuthGuard, PermissionsGuard)
@ApiTags('Work Experiences')
export class WorkExperiencesController {
  constructor(
    private readonly workExperiencesService: WorkExperiencesService,
  ) {}

  @Post('me/resume/work-experiences')
  @Allowed('alumni')
  async create(
    @SessionUser() user: User,
    @Body() createWorkExperienceDto: CreateWorkExperienceDto,
  ): Promise<ResponseDto<WorkExperienceDto>> {
    try {
      const createdWorkExperience = await this.workExperiencesService.create(
        user.email,
        createWorkExperienceDto,
      );

      return {
        statusCode: HttpStatus.CREATED,
        data: createdWorkExperience,
      };
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new BadRequestException(error.message, { cause: error.cause });
      }
      throw error;
    }
  }

  @Get('me/resume/work-experiences/:workExperienceNumber')
  @Allowed('alumni')
  async findMine(
    @SessionUser() user: User,
    @Param('workExperienceNumber', ParseIntPipe) workExperienceNumber: number,
  ): Promise<ResponseDto<WorkExperienceDto>> {
    const workExperience = await this.workExperiencesService.findOne(
      user.email,
      workExperienceNumber,
    );

    if (!workExperience) {
      throw new NotFoundException(
        `There is no work experience #${workExperienceNumber} for alumni with email \`${user.email}\``,
        {},
      );
    }

    return {
      statusCode: HttpStatus.OK,
      data: workExperience,
    };
  }

  @Get(':resumeOwnerEmail/resume/work-experiences/:workExperienceNumber')
  @SessionNotRequired()
  @Allowed('admin', 'visitor')
  async findOne(
    @Param('resumeOwnerEmail') resumeOwnerEmail: string,
    @Param('workExperienceNumber', ParseIntPipe) workExperienceNumber: number,
    @SessionUser() user?: User,
  ): Promise<ResponseDto<WorkExperienceDto>> {
    let workExperience: WorkExperienceDto | null;
    if (!user) {
      workExperience = await this.workExperiencesService.findOne(
        resumeOwnerEmail,
        workExperienceNumber,
      );
    } else {
      workExperience = await this.workExperiencesService.findVisibleOne(
        resumeOwnerEmail,
        workExperienceNumber,
      );
    }

    if (!workExperience) {
      throw new NotFoundException(
        `There is no work experience #${workExperienceNumber} for alumni with email \`${resumeOwnerEmail}\``,
        {},
      );
    }

    return {
      statusCode: HttpStatus.OK,
      data: workExperience,
    };
  }

  @Get('me/resume/work-experiences')
  @SessionNotRequired()
  @Allowed('alumni')
  async findMyPage(
    @SessionUser() user: User,
    @Query() paginationParamsDto: PaginationParamsDto,
  ): Promise<PagedResponseDto<WorkExperienceDto>> {
    const workExperiencesPage = await this.workExperiencesService.findPage(
      user.email,
      paginationParamsDto,
    );

    return {
      statusCode: HttpStatus.OK,
      data: workExperiencesPage,
    };
  }

  @Get(':resumeOwnerEmail/resume/work-experiences')
  @SessionNotRequired()
  @Allowed('admin', 'visitor')
  async findPage(
    @Param('resumeOwnerEmail') resumeOwnerEmail: string,
    @Query() paginationParamsDto: PaginationParamsDto,
    @SessionUser() user?: User,
  ): Promise<PagedResponseDto<WorkExperienceDto>> {
    let workExperiencesPage: PageDto<WorkExperienceDto>;
    if (!user) {
      workExperiencesPage = await this.workExperiencesService.findVisiblePage(
        resumeOwnerEmail,
        paginationParamsDto,
      );
    } else {
      workExperiencesPage = await this.workExperiencesService.findPage(
        resumeOwnerEmail,
        paginationParamsDto,
      );
    }

    return {
      statusCode: HttpStatus.OK,
      data: workExperiencesPage,
    };
  }

  @Patch('me/resume/work-experiences/:workExperienceNumber')
  @Allowed('alumni')
  async updateMine(
    @SessionUser() user: User,
    @Param('workExperienceNumber', ParseIntPipe) workExperienceNumber: number,
    @Body() updateWorkExperienceDto: UpdateWorkExperienceDto,
  ): Promise<ResponseDto<WorkExperienceDto>> {
    try {
      const updatedWorkExperience = await this.workExperiencesService.update(
        user.email,
        workExperienceNumber,
        updateWorkExperienceDto,
      );

      return {
        statusCode: HttpStatus.OK,
        data: updatedWorkExperience,
      };
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new NotFoundException(error.message, { cause: error.cause });
      }
      throw error;
    }
  }

  @Patch(':resumeOwnerEmail/resume/work-experiences/:workExperienceNumber')
  @Allowed('admin')
  async updateOne(
    @Param('resumeOwnerEmail') resumeOwnerEmail: string,
    @Param('workExperienceNumber', ParseIntPipe) workExperienceNumber: number,
    @Body() updateWorkExperienceDto: UpdateWorkExperienceDto,
  ): Promise<ResponseDto<WorkExperienceDto>> {
    try {
      const updatedWorkExperience = await this.workExperiencesService.update(
        resumeOwnerEmail,
        workExperienceNumber,
        updateWorkExperienceDto,
      );

      return {
        statusCode: HttpStatus.OK,
        data: updatedWorkExperience,
      };
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new NotFoundException(error.message, { cause: error.cause });
      }
      throw error;
    }
  }

  @Delete('me/resume/work-experiences/:workExperienceNumber')
  @Allowed('alumni')
  async removeMine(
    @SessionUser() user: User,
    @Param('workExperienceNumber', ParseIntPipe) workExperienceNumber: number,
  ): Promise<ResponseDto<WorkExperienceDto>> {
    try {
      const removedWorkExperience = await this.workExperiencesService.remove(
        user.email,
        workExperienceNumber,
      );

      return {
        statusCode: HttpStatus.OK,
        data: removedWorkExperience,
      };
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new NotFoundException(error.message, { cause: error.cause });
      }
      throw error;
    }
  }

  @Delete(':resumeOwnerEmail/resume/work-experiences/:workExperienceNumber')
  @Allowed('admin')
  async removeOne(
    @Param('resumeOwnerEmail') resumeOwnerEmail: string,
    @Param('workExperienceNumber', ParseIntPipe) workExperienceNumber: number,
  ): Promise<ResponseDto<WorkExperienceDto>> {
    try {
      const removedWorkExperience = await this.workExperiencesService.remove(
        resumeOwnerEmail,
        workExperienceNumber,
      );

      return {
        statusCode: HttpStatus.OK,
        data: removedWorkExperience,
      };
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new NotFoundException(error.message, { cause: error.cause });
      }
      throw error;
    }
  }
}
