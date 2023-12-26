import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
  DefaultValuePipe,
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
  UseGuards,
  ParseUUIDPipe
} from '@nestjs/common';
import { IndustryOfInterestService } from './industry-of-interest.service';
import { CreateIndustryOfInterestDto } from './dto/create-industry-of-interest.dto';
import { UpdateIndustryOfInterestDto } from './dto/update-industry-of-interest.dto';
import { ResponseDto } from 'src/common/dto/response.dto';
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
  NotFoundError,
} from 'src/common/errors/service.error';
import { IndustryOfInterestDto } from './dto/industry-of-interest.dto';
import { PaginatedResponseDto } from 'src/common/dto/paginated-response.dto';
import { SessionUser } from 'src/auth/session/session-user.decorator';
import { User } from 'prisma/ualumni/client';
import { PaginationParamsDto } from 'src/common/dto/pagination-params.dto';
import { SessionAuthGuard } from 'src/auth/session/session.guard';
import { PermissionsGuard } from 'src/permissions/permissions.guard';
import { Allowed } from 'src/permissions/allowed-roles.decorator';
import { SessionNotRequired } from 'src/auth/session/session-not-required.decorator';

@ApiTags('industry-of-interest')
@Controller('alumni')
@UseGuards(SessionAuthGuard, PermissionsGuard)
export class IndustryOfInterestController {
  constructor(
    private readonly industryOfInterestService: IndustryOfInterestService,
  ) {}

  @Post('me/industry-of-interest')
  @Allowed('alumni')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    description: 'industry of interest was succesfully created',
  })
  @ApiBadRequestResponse({
    description: 'Alredy exists a industry of interest with the given name',
  })
  @ApiInternalServerErrorResponse({
    description: 'An unexpected situation ocurred',
  })
  async createMine(
    @SessionUser() user: User,
    @Body() createIndustryOfInterestDto: CreateIndustryOfInterestDto,
  ): Promise<ResponseDto<IndustryOfInterestDto>> {
    try {
      const data = await this.industryOfInterestService.create(
        user.id,
        createIndustryOfInterestDto,
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

  @Post(':alumniId/industry-of-interest')
  @Allowed('admin')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    description: 'industry of interest was succesfully created',
  })
  @ApiBadRequestResponse({
    description: 'Alredy exists a industry of interest with the given name',
  })
  @ApiInternalServerErrorResponse({
    description: 'An unexpected situation ocurred',
  })
  async create(
    @Param('alumniId', ParseUUIDPipe) alumniId: string,
    @Body() createIndustryOfInterestDto: CreateIndustryOfInterestDto,
  ): Promise<ResponseDto<IndustryOfInterestDto>> {
    try {
      const data = await this.industryOfInterestService.create(
        alumniId,
        createIndustryOfInterestDto,
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

  @Get('me/industry-of-interest')
  @Allowed('alumni')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'The list of industries of interest was succesfully obtained',
  })
  @ApiBadRequestResponse({
    description: 'Invalid number of items per page requested',
  })
  @ApiInternalServerErrorResponse({
    description: 'An unexpected situation ocurred',
  })
  async findMyPage(
    @SessionUser() user: User,
    @Query() paginationParamsDto: PaginationParamsDto,
  ): Promise<PaginatedResponseDto<IndustryOfInterestDto>> {
    if (paginationParamsDto.itemsPerPage < 1)
      throw new BadRequestException('Invalid number of items per page');

    const paginationResponse = await this.industryOfInterestService.findMany(
      user.id,
      paginationParamsDto.pageNumber,
      paginationParamsDto.itemsPerPage,
    );
    return {
      statusCode: HttpStatus.OK,
      data: paginationResponse,
    };
  }

  @Get(':alumniId/industry-of-interest')
  @SessionNotRequired()
  @Allowed('admin', 'visitor')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'The list of industries of interest was succesfully obtained',
  })
  @ApiBadRequestResponse({
    description: 'Invalid number of items per page requested',
  })
  @ApiInternalServerErrorResponse({
    description: 'An unexpected situation ocurred',
  })
  async findMany(
    @Param('alumniId', ParseUUIDPipe) alumniId: string,
    @Query() paginationParamsDto: PaginationParamsDto,
  ): Promise<PaginatedResponseDto<IndustryOfInterestDto>> {
    if (paginationParamsDto.itemsPerPage < 1)
      throw new BadRequestException('Invalid number of items per page');

    const paginationResponse = await this.industryOfInterestService.findMany(
      alumniId,
      paginationParamsDto.pageNumber,
      paginationParamsDto.itemsPerPage,
    );
    return {
      statusCode: HttpStatus.OK,
      data: paginationResponse,
    };
  }

  @Get('me/industry-of-interest/:industryName')
  @Allowed('alumni')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Industry of interest was succesfully found',
  })
  @ApiNotFoundResponse({
    description:
      'The industry of interest for the requested alumni was not found',
  })
  @ApiInternalServerErrorResponse({
    description: 'An unexpected situation ocurred',
  })
  async findMine(
    @SessionUser() user: User,
    @Param('industryName') industryName: string,
  ) {
    const industryOfInterest = await this.industryOfInterestService.findOne(
      user.id,
      industryName,
    );

    if (!industryOfInterest)
      throw new NotFoundException(
        `There is no industry of interest with the given \`name\` (${industryName})`,
      );
    return {
      statusCode: HttpStatus.OK,
      data: industryOfInterest,
    };
  }

  @Get(':alumniId/industry-of-interest/:industryName')
  @SessionNotRequired()
  @Allowed('admin', 'visitor')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Industry of interest was succesfully found',
  })
  @ApiNotFoundResponse({
    description:
      'The industry of interest for the requested alumni was not found',
  })
  @ApiInternalServerErrorResponse({
    description: 'An unexpected situation ocurred',
  })
  async findOne(
    @Param('alumniId', ParseUUIDPipe) alumniId: string,
    @Param('industryName') industryName: string,
  ) {
    const industryOfInterest = await this.industryOfInterestService.findOne(
      alumniId,
      industryName,
    );

    if (!industryOfInterest)
      throw new NotFoundException(
        `There is no industry of interest with the given \`name\` (${industryName})`,
      );
    return {
      statusCode: HttpStatus.OK,
      data: industryOfInterest,
    };
  }

  @Patch('me/industry-of-interest/:industryName')
  @Allowed('alumni')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Industry of interest was succesfully updated',
  })
  @ApiNotFoundResponse({
    description:
      'The industry of interest with the requested name was not found',
  })
  @ApiBadRequestResponse({
    description: 'Already exists a industry of interest with the given title',
  })
  @ApiInternalServerErrorResponse({
    description: 'An unexpected situation ocurred',
  })
  async updateMine(
    @SessionUser() user: User,
    @Param('industryName') industryName: string,
    @Body() updateIndustryOfInterestDto: UpdateIndustryOfInterestDto,
  ) {
    try {
      const updatedIndustryOfInterest =
        await this.industryOfInterestService.update(
          user.id,
          industryName,
          updateIndustryOfInterestDto,
        );
      return { statusCode: HttpStatus.OK, data: updatedIndustryOfInterest };
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

  @Patch(':alumniId/industry-of-interest/:industryName')
  @Allowed('admin')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Industry of interest was succesfully updated',
  })
  @ApiNotFoundResponse({
    description:
      'The industry of interest with the requested name was not found',
  })
  @ApiBadRequestResponse({
    description: 'Already exists a industry of interest with the given title',
  })
  @ApiInternalServerErrorResponse({
    description: 'An unexpected situation ocurred',
  })
  async update(
    @Param('alumniId', ParseUUIDPipe) alumniId: string,
    @Param('industryName') industryName: string,
    @Body() updateIndustryOfInterestDto: UpdateIndustryOfInterestDto,
  ) {
    try {
      const updatedIndustryOfInterest =
        await this.industryOfInterestService.update(
          alumniId,
          industryName,
          updateIndustryOfInterestDto,
        );
      return { statusCode: HttpStatus.OK, data: updatedIndustryOfInterest };
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

  @Delete('me/industry-of-interest/:industryName')
  @Allowed('alumni')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Industry of interest was succesfully deleted',
  })
  @ApiNotFoundResponse({
    description:
      'The industry of interest with the requested name was not found',
  })
  @ApiInternalServerErrorResponse({
    description: 'An unexpected situation ocurred',
  })
  async removeMine(
    @SessionUser() user: User,
    @Param('industryName') industryName: string,
  ): Promise<ResponseDto<IndustryOfInterestDto>> {
    try {
      const deletedIndustryOfInterest =
        await this.industryOfInterestService.remove(user.id, industryName);
      return {
        statusCode: HttpStatus.OK,
        data: deletedIndustryOfInterest,
      };
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new NotFoundException(error.message, { cause: error });
      }
      throw error;
    }
  }

  @Delete(':alumniId/industry-of-interest/:industryName')
  @Allowed('admin')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Industry of interest was succesfully deleted',
  })
  @ApiNotFoundResponse({
    description:
      'The industry of interest with the requested name was not found',
  })
  @ApiInternalServerErrorResponse({
    description: 'An unexpected situation ocurred',
  })
  async remove(
    @Param('alumniId', ParseUUIDPipe) alumniId: string,
    @Param('industryName') industryName: string,
  ): Promise<ResponseDto<IndustryOfInterestDto>> {
    try {
      const deletedIndustryOfInterest =
        await this.industryOfInterestService.remove(
          alumniId,
          industryName,
        );
      return {
        statusCode: HttpStatus.OK,
        data: deletedIndustryOfInterest,
      };
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new NotFoundException(error.message, { cause: error });
      }
      throw error;
    }
  }
}
