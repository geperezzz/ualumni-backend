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

@Controller('alumni/:alumniEmail/job-applications')
export class JobApplicationsController {
  constructor(
    private readonly jobApplicationsService: JobApplicationsService,
  ) {}

  @Post()
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

  @Get()
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

  @Get(':jobOfferId')
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

  @Patch(':jobOfferId')
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

  @Delete(':jobOfferId')
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
