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
  UseGuards,
  ParseUUIDPipe
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
  ApiTags,
} from '@nestjs/swagger';
import {
  AlreadyExistsError,
  ForeignKeyError,
  NotFoundError,
} from 'src/common/errors/service.error';
import { ResponseDto } from 'src/common/dto/response.dto';
import { HigherEducationStudyDto } from './dto/higher-education-study.dto';
import { PaginationParamsDto } from 'src/common/dto/pagination-params.dto';
import { SessionAuthGuard } from 'src/auth/session/session.guard';
import { PermissionsGuard } from 'src/permissions/permissions.guard';
import { Allowed } from 'src/permissions/allowed-roles.decorator';
import { SessionUser } from 'src/auth/session/session-user.decorator';
import { User } from 'prisma/ualumni/client';
import { PaginatedResponseDto } from 'src/common/dto/paginated-response.dto';
import { SessionNotRequired } from 'src/auth/session/session-not-required.decorator';

@ApiTags('higher-education-study')
@Controller('alumni')
@UseGuards(SessionAuthGuard, PermissionsGuard)
export class HigherEducationStudyController {
  constructor(
    private readonly higherEducationStudyService: HigherEducationStudyService,
  ) {}

  @Post('me/higher-education-studies')
  @Allowed('alumni')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    description: 'The higher education study was succesfully created',
  })
  @ApiBadRequestResponse({
    description: 'Already exists a higher education study with the given title',
  })
  async createMine(
    @SessionUser() user: User,
    @Body() createHigherEducationStudyDto: CreateHigherEducationStudyDto,
  ): Promise<ResponseDto<HigherEducationStudyDto>> {
    try {
      const data = await this.higherEducationStudyService.create(
        user.id,
        createHigherEducationStudyDto,
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

  @Post(':alumniId/higher-education-studies')
  @Allowed('admin')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    description: 'The higher education study was succesfully created',
  })
  @ApiBadRequestResponse({
    description: 'Already exists a higher education study with the given title',
  })
  async create(
    @Param('alumniId', ParseUUIDPipe) alumniId: string,
    @Body() createHigherEducationStudyDto: CreateHigherEducationStudyDto,
  ): Promise<ResponseDto<HigherEducationStudyDto>> {
    try {
      const data = await this.higherEducationStudyService.create(
        alumniId,
        createHigherEducationStudyDto,
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

  @Get('me/higher-education-studies')
  @Allowed('alumni')
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
  async findMyPage(
    @SessionUser() user: User,
    @Query() paginationParamsDto: PaginationParamsDto,
  ): Promise<PaginatedResponseDto<HigherEducationStudyDto>> {
    if (paginationParamsDto.itemsPerPage < 1)
      throw new BadRequestException('Invalid number of items per page');

    const paginationResponse =
      await this.higherEducationStudyService.findMany(
        user.id,
        paginationParamsDto.pageNumber,
        paginationParamsDto.itemsPerPage,
      );
    return {
      statusCode: HttpStatus.OK,
      data: paginationResponse,
    };
  }

  @Get(':alumniId/higher-education-studies')
  @SessionNotRequired()
  @Allowed('admin', 'visitor')
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
  async findPage(
    @Param('alumniId', ParseUUIDPipe) alumniId: string,
    @Query() paginationParamsDto: PaginationParamsDto,
  ): Promise<PaginatedResponseDto<HigherEducationStudyDto>> {
    if (paginationParamsDto.itemsPerPage < 1)
      throw new BadRequestException('Invalid number of items per page');
    const paginationResponse =
      await this.higherEducationStudyService.findMany(
        alumniId,
        paginationParamsDto.pageNumber,
        paginationParamsDto.itemsPerPage,
      );
    return {
      statusCode: HttpStatus.OK,
      data: paginationResponse,
    };
  }

  @Get('me/higher-education-studies/:title')
  @Allowed('alumni')
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
  async findMine(
    @SessionUser() user: User,
    @Param('title') title: string,
  ): Promise<ResponseDto<HigherEducationStudyDto>> {
    const higherEducationStudy = await this.higherEducationStudyService.findOne(
      title,
      user.id,
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

  @Get(':alumniId/higher-education-studies/:title')
  @SessionNotRequired()
  @Allowed('admin', 'visitor')
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
    @Param('alumniId', ParseUUIDPipe) alumniId: string,
    @Param('title') title: string,
  ): Promise<ResponseDto<HigherEducationStudyDto>> {
    const higherEducationStudy = await this.higherEducationStudyService.findOne(
      title,
      alumniId,
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

  @Patch('me/higher-education-studies/:title')
  @Allowed('alumni')
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
  async updateMine(
    @SessionUser() user: User,
    @Param('title') title: string,
    @Body() updateHigherEducationStudyDto: UpdateHigherEducationStudyDto,
  ): Promise<ResponseDto<HigherEducationStudyDto>> {
    try {
      const updatedHigherEducationStudy =
        await this.higherEducationStudyService.update(
          title,
          user.id,
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
      throw error;
    }
  }

  @Patch(':alumniId/higher-education-studies/:title')
  @Allowed('admin')
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
    @Param('alumniId', ParseUUIDPipe) alumniId: string,
    @Param('title') title: string,
    @Body() updateHigherEducationStudyDto: UpdateHigherEducationStudyDto,
  ): Promise<ResponseDto<HigherEducationStudyDto>> {
    try {
      const updatedHigherEducationStudy =
        await this.higherEducationStudyService.update(
          title,
          alumniId,
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
      throw error;
    }
  }

  @Delete('me/higher-education-studies/:title')
  @Allowed('alumni')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Higher education study was succesfully deleted',
  })
  @ApiNotFoundResponse({
    description:
      'The higher education study with the requested title was not found',
  })
  @ApiInternalServerErrorResponse({
    description: 'An unexpected situation ocurred',
  })
  async removeMine(
    @SessionUser() user: User,
    @Param('title') title: string,
  ): Promise<ResponseDto<HigherEducationStudyDto>> {
    try {
      const deletedHigherEducationStudy =
        await this.higherEducationStudyService.remove(title, user.id);
      return {
        statusCode: HttpStatus.OK,
        data: deletedHigherEducationStudy,
      };
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new NotFoundException(error.message, { cause: error });
      }
      throw error;
    }
  }

  @Delete(':alumniId/higher-education-studies/:title')
  @Allowed('admin')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Higher education study was succesfully deleted',
  })
  @ApiNotFoundResponse({
    description:
      'The higher education study with the requested title was not found',
  })
  @ApiInternalServerErrorResponse({
    description: 'An unexpected situation ocurred',
  })
  async remove(
    @Param('alumniId', ParseUUIDPipe) alumniId: string,
    @Param('title') title: string,
  ): Promise<ResponseDto<HigherEducationStudyDto>> {
    try {
      const deletedHigherEducationStudy =
        await this.higherEducationStudyService.remove(title, alumniId);
      return {
        statusCode: HttpStatus.OK,
        data: deletedHigherEducationStudy,
      };
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new NotFoundException(error.message, { cause: error });
      }
      throw error;
    }
  }
}
