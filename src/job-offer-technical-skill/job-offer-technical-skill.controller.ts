import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
  BadRequestException,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { JobOfferTechnicalSkillService } from './job-offer-technical-skill.service';
import { CreateJobOfferTechnicalSkillDto } from './dto/create-job-offer-technical-skill.dto';
import { UpdateJobOfferTechnicalSkillDto } from './dto/update-job-offer-technical-skill.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PermissionsGuard } from 'src/permissions/permissions.guard';
import { SessionAuthGuard } from 'src/auth/session/session.guard';
import { Allowed } from 'src/permissions/allowed-roles.decorator';
import { ResponseDto } from 'src/common/dto/response.dto';
import { JobOfferTechnicalSkillDto } from './dto/job-offer-technical-skill.dto';
import {
  AlreadyExistsError,
  ForeignKeyError,
  NotFoundError,
} from 'src/common/errors/service.error';
import { PaginatedResponseDto } from 'src/common/dto/paginated-response.dto';
import { PaginationParamsDto } from 'src/common/dto/pagination-params.dto';

@ApiTags('job-offer-technical-skill')
@Controller('job-offer')
@UseGuards(SessionAuthGuard, PermissionsGuard)
export class JobOfferTechnicalSkillController {
  constructor(
    private readonly jobOfferTechnicalSkillService: JobOfferTechnicalSkillService,
  ) {}

  @Post(':jobOfferId/skill-category/technical-skill')
  @Allowed('admin')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    description: 'The technical skill was succesfully added',
  })
  @ApiBadRequestResponse({
    description: 'Already exists a technical skill with the given name',
  })
  @ApiBadRequestResponse({
    description: 'There is no job offer with the given id',
  })
  async add(
    @Param('jobOfferId', ParseUUIDPipe) jobOfferId: string,
    @Body() createJobOfferTechnicalSkillDto: CreateJobOfferTechnicalSkillDto,
  ): Promise<ResponseDto<JobOfferTechnicalSkillDto>> {
    try {
      const data = await this.jobOfferTechnicalSkillService.create(
        jobOfferId,
        createJobOfferTechnicalSkillDto,
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
      throw error;
    }
  }

  @Get(':jobOfferId/skill-category/technical-skill')
  @Allowed('admin', 'alumni')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'The list of technical skills was succesfully obtained',
  })
  @ApiBadRequestResponse({
    description: 'Invalid number of items per page requested',
  })
  @ApiInternalServerErrorResponse({
    description: 'An unexpected situation ocurred',
  })
  async findPage(
    @Param('jobOfferId', ParseUUIDPipe) jobOfferId: string,
    @Query() paginationParamsDto: PaginationParamsDto,
  ): Promise<PaginatedResponseDto<JobOfferTechnicalSkillDto>> {
    if (paginationParamsDto.itemsPerPage < 1)
      throw new BadRequestException('Invalid number of items per page');

    const data = await this.jobOfferTechnicalSkillService.findMany(
      jobOfferId,
      paginationParamsDto.pageNumber,
      paginationParamsDto.itemsPerPage,
    );
    return {
      statusCode: HttpStatus.OK,
      data,
    };
  }

  @Get(':jobOfferId/skill-category/:skillCategory/technical-skill/:skillName')
  @Allowed('admin', 'alumni')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'A technical skill was succesfully found',
  })
  @ApiNotFoundResponse({
    description:
      'The technical skill for the requested job offer was not found',
  })
  @ApiInternalServerErrorResponse({
    description: 'An unexpected situation ocurred',
  })
  async findOne(
    @Param('jobOfferId', ParseUUIDPipe) jobOfferId: string,
    @Param('skillCategory') skillCategory: string,
    @Param('skillName') skillName: string,
  ): Promise<ResponseDto<JobOfferTechnicalSkillDto>> {
    const data = await this.jobOfferTechnicalSkillService.findOne(
      jobOfferId,
      skillCategory,
      skillName,
    );

    if (!data)
      throw new NotFoundException(
        `There is no technical skill with the given \`skillName\` (${skillName})`,
      );
    return {
      statusCode: HttpStatus.OK,
      data,
    };
  }
  @ApiOkResponse({
    description: 'A technical skill was succesfully updated',
  })
  @ApiNotFoundResponse({
    description: 'The technical skill with the requested name was not found',
  })
  @ApiBadRequestResponse({
    description: 'Already exist a technical skill with the given skillName',
  })
  @ApiBadRequestResponse({
    description: 'There is no job offer with the given id',
  })
  @ApiInternalServerErrorResponse({
    description: 'An unexpected situation ocurred',
  })
  @Patch(':jobOfferId/skill-category/:skillCategory/technical-skill/:skillName')
  @Allowed('admin')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('jobOfferId', ParseUUIDPipe) jobOfferId: string,
    @Param('skillCategory') skillCategory: string,
    @Param('skillName') skillName: string,
    @Body() updateJobOfferTechnicalSkillDto: UpdateJobOfferTechnicalSkillDto,
  ): Promise<ResponseDto<JobOfferTechnicalSkillDto>> {
    try {
      const updateJobOfferTechnicalSkill =
        await this.jobOfferTechnicalSkillService.update(
          jobOfferId,
          skillCategory,
          skillName,
          updateJobOfferTechnicalSkillDto,
        );
      return {
        statusCode: HttpStatus.OK,
        data: updateJobOfferTechnicalSkill,
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

  @Delete(
    ':jobOfferId/skill-category/:skillCategory/technical-skill/:skillName',
  )
  @Allowed('admin')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'A technical skill was succesfully deleted',
  })
  @ApiNotFoundResponse({
    description:
      'The technical skill with the requested skillName was not found',
  })
  @ApiInternalServerErrorResponse({
    description: 'An unexpected situation ocurred',
  })
  async remove(
    @Param('jobOfferId', ParseUUIDPipe) jobOfferId: string,
    @Param('skillCategory') skillCategory: string,
    @Param('skillName') skillName: string,
  ): Promise<ResponseDto<JobOfferTechnicalSkillDto>> {
    try {
      const data = await this.jobOfferTechnicalSkillService.remove(
        jobOfferId,
        skillCategory,
        skillName,
      );
      return {
        statusCode: HttpStatus.OK,
        data,
      };
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new NotFoundException(error.message, { cause: error });
      }
      throw error;
    }
  }
}
