import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  BadRequestException,
  Query,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { JobApplicationsService } from './job-applications.service';
import { CreateJobApplicationDto } from './dto/create-job-application.dto';
import { UpdateJobApplicationDto } from './dto/update-job-application.dto';
import {
  AlreadyExistsError,
  NotFoundError,
} from 'src/common/errors/service.error';
import { PaginationParamsDto } from 'src/common/dto/pagination-params.dto';
import { PagedResponseDto } from 'src/common/dto/paged-response.dto';
import { JobApplicationDto } from './dto/job-application.dto';
import { SessionAuthGuard } from 'src/auth/session/session.guard';
import { PermissionsGuard } from 'src/permissions/permissions.guard';
import { Allowed } from 'src/permissions/allowed-roles.decorator';
import { SessionUser } from 'src/auth/session/session-user.decorator';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'prisma/ualumni/client';
import { MailingService } from 'src/mailing/mailing.service';

@ApiTags('job-applications')
@Controller('alumni')
@UseGuards(SessionAuthGuard, PermissionsGuard)
export class JobApplicationsController {
  constructor(
    private readonly jobApplicationsService: JobApplicationsService,
    private readonly mailingService: MailingService,
  ) {}

  @Post('me/job-applications')
  @Allowed('alumni')
  async createMine(
    @SessionUser() user: User,
    @Body() createJobApplicationDto: CreateJobApplicationDto,
  ) {
    try {
      let createdJobApplication = await this.jobApplicationsService.create(
        user.email,
        createJobApplicationDto,
      );

      let sentEmail = await this.mailingService.sendResume(
        user.email,
        createJobApplicationDto.jobOfferId,
      );

      return {
        statusCode: HttpStatus.CREATED,
        data: createdJobApplication,
      };
    } catch (error) {
      if (error instanceof AlreadyExistsError) {
        throw new BadRequestException(error.message, { cause: error });
      }
      if (error instanceof NotFoundError) {
        throw new NotFoundException(error.message, { cause: error });
      }
      throw error;
    }
  }

  @Post(':alumniEmail/job-applications')
  @Allowed('admin')
  async create(
    @Param('alumniEmail') alumniEmail: string,
    @Body() createJobApplicationDto: CreateJobApplicationDto,
  ) {
    try {
      let createdJobApplication = await this.jobApplicationsService.create(
        alumniEmail,
        createJobApplicationDto,
      );
      return {
        statusCode: HttpStatus.CREATED,
        data: createdJobApplication,
      };
    } catch (error) {
      if (error instanceof AlreadyExistsError) {
        throw new BadRequestException(error.message, { cause: error });
      }
      if (error instanceof NotFoundError) {
        throw new NotFoundException(error.message, { cause: error });
      }
      throw error;
    }
  }

  @Get('me/job-applications')
  @Allowed('alumni')
  async findMyPage(
    @SessionUser() user: User,
    @Query() paginationParamsDto: PaginationParamsDto,
  ): Promise<PagedResponseDto<JobApplicationDto>> {
    let jobApplicationsPage = await this.jobApplicationsService.findPage(
      user.email,
      paginationParamsDto,
    );
    return {
      statusCode: HttpStatus.OK,
      data: jobApplicationsPage,
    };
  }

  @Get(':alumniEmail/job-applications')
  @Allowed('admin')
  async findPage(
    @Param('alumniEmail') alumniEmail: string,
    @Query() paginationParamsDto: PaginationParamsDto,
  ): Promise<PagedResponseDto<JobApplicationDto>> {
    let jobApplicationsPage = await this.jobApplicationsService.findPage(
      alumniEmail,
      paginationParamsDto,
    );
    return {
      statusCode: HttpStatus.OK,
      data: jobApplicationsPage,
    };
  }

  @Get('me/job-applications/:jobOfferId')
  @Allowed('alumni')
  async findMine(
    @SessionUser() user: User,
    @Param('jobOfferId') jobOfferId: string,
  ) {
    let jobApplication = await this.jobApplicationsService.findOne(
      user.email,
      jobOfferId,
    );

    if (!jobApplication) {
      throw new NotFoundException(
        `There is no job application for offer with \`id\` equal to \`${jobOfferId}\` corresponding to alumni with \`email\` equal to \`${user.email}\``,
        {},
      );
    }

    return {
      statusCode: HttpStatus.OK,
      data: jobApplication,
    };
  }

  @Get(':alumniEmail/job-applications/:jobOfferId')
  @Allowed('admin')
  async findOne(
    @Param('alumniEmail') alumniEmail: string,
    @Param('jobOfferId') jobOfferId: string,
  ) {
    let jobApplication = await this.jobApplicationsService.findOne(
      alumniEmail,
      jobOfferId,
    );

    if (!jobApplication) {
      throw new NotFoundException(
        `There is no job application for offer with \`id\` equal to \`${jobOfferId}\` corresponding to alumni with \`email\` equal to \`${alumniEmail}\``,
        {},
      );
    }

    return {
      statusCode: HttpStatus.OK,
      data: jobApplication,
    };
  }

  @Patch('me/job-applications/:jobOfferId')
  @Allowed('alumni')
  async updateMine(
    @SessionUser() user: User,
    @Param('jobOfferId') jobOfferId: string,
    @Body() updateJobApplicationDto: UpdateJobApplicationDto,
  ) {
    try {
      let updatedJobApplication = await this.jobApplicationsService.update(
        user.email,
        jobOfferId,
        updateJobApplicationDto,
      );

      return {
        statusCode: HttpStatus.CREATED,
        data: updatedJobApplication,
      };
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new NotFoundException(error.message, { cause: error });
      }
      if (error instanceof AlreadyExistsError) {
        throw new BadRequestException(error.message, { cause: error });
      }
      throw error;
    }
  }

  @Patch(':alumniEmail/job-applications/:jobOfferId')
  @Allowed('admin')
  async update(
    @Param('alumniEmail') alumniEmail: string,
    @Param('jobOfferId') jobOfferId: string,
    @Body() updateJobApplicationDto: UpdateJobApplicationDto,
  ) {
    try {
      let updatedJobApplication = await this.jobApplicationsService.update(
        alumniEmail,
        jobOfferId,
        updateJobApplicationDto,
      );

      return {
        statusCode: HttpStatus.CREATED,
        data: updatedJobApplication,
      };
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new NotFoundException(error.message, { cause: error });
      }
      if (error instanceof AlreadyExistsError) {
        throw new BadRequestException(error.message, { cause: error });
      }
      throw error;
    }
  }

  @Delete('me/job-applications/:jobOfferId')
  @Allowed('alumni')
  async removeMine(
    @SessionUser() user: User,
    @Param('jobOfferId') jobOfferId: string,
  ) {
    try {
      let removedJobApplication = await this.jobApplicationsService.remove(
        user.email,
        jobOfferId,
      );

      return {
        statusCode: HttpStatus.CREATED,
        data: removedJobApplication,
      };
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new NotFoundException(error.message, { cause: error });
      }
      throw error;
    }
  }

  @Delete(':alumniEmail/job-applications/:jobOfferId')
  @Allowed('admin')
  async remove(
    @Param('alumniEmail') alumniEmail: string,
    @Param('jobOfferId') jobOfferId: string,
  ) {
    try {
      let removedJobApplication = await this.jobApplicationsService.remove(
        alumniEmail,
        jobOfferId,
      );

      return {
        statusCode: HttpStatus.CREATED,
        data: removedJobApplication,
      };
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new NotFoundException(error.message, { cause: error });
      }
      throw error;
    }
  }
}
