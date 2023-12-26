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
  BadRequestException,
  InternalServerErrorException,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { PositionOfInterestService } from './position-of-interest.service';
import { CreatePositionOfInterestDto } from './dto/create-position-of-interest.dto';
import { UpdatePositionOfInterestDto } from './dto/update-position-of-interest.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SessionAuthGuard } from 'src/auth/session/session.guard';
import { PermissionsGuard } from 'src/permissions/permissions.guard';
import { Allowed } from 'src/permissions/allowed-roles.decorator';
import { ResponseDto } from 'src/common/dto/response.dto';
import { PositionOfInterestDto } from './dto/position-of-interest.dto';
import { SessionUser } from 'src/auth/session/session-user.decorator';
import { User } from 'prisma/ualumni/client';
import {
  AlreadyExistsError,
  ForeignKeyError,
} from 'src/common/errors/service.error';
import { PaginationParamsDto } from 'src/common/dto/pagination-params.dto';
import { PaginatedResponseDto } from 'src/common/dto/paginated-response.dto';
import { SessionNotRequired } from 'src/auth/session/session-not-required.decorator';

@ApiTags('position-of-interest')
@Controller('alumni')
@UseGuards(SessionAuthGuard, PermissionsGuard)
export class PositionOfInterestController {
  constructor(
    private readonly positionOfInterestService: PositionOfInterestService,
  ) {}

  @Post('me/positions-of-interest')
  @Allowed('alumni')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    description: 'position of interest was succesfully created',
  })
  @ApiBadRequestResponse({
    description: 'Alredy exists a position of interest with the given name',
  })
  @ApiInternalServerErrorResponse({
    description: 'An unexpected situation ocurred',
  })
  async createMine(
    @SessionUser() user: User,
    @Body() createPositionOfInterestDto: CreatePositionOfInterestDto,
  ): Promise<ResponseDto<PositionOfInterestDto>> {
    try {
      const positionOfInterest = await this.positionOfInterestService.create(
        user.id,
        createPositionOfInterestDto,
      );
      return {
        statusCode: HttpStatus.CREATED,
        data: positionOfInterest,
      };
    } catch (error) {
      if (error instanceof AlreadyExistsError)
        throw new BadRequestException(error.message, { cause: error });
      if (error instanceof ForeignKeyError)
        throw new BadRequestException(error.message, { cause: error });
      throw error;
    }
  }

  @Post(':alumniId/positions-of-interest')
  @Allowed('admin')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    description: 'position of interest was succesfully created',
  })
  @ApiBadRequestResponse({
    description: 'Alredy exists a position of interest with the given name',
  })
  @ApiInternalServerErrorResponse({
    description: 'An unexpected situation ocurred',
  })
  async create(
    @Param('alumniId') alumniId: string,
    @Body() createPositionOfInterestDto: CreatePositionOfInterestDto,
  ): Promise<ResponseDto<PositionOfInterestDto>> {
    try {
      const positionOfInterest = await this.positionOfInterestService.create(
        alumniId,
        createPositionOfInterestDto,
      );
      return {
        statusCode: HttpStatus.CREATED,
        data: positionOfInterest,
      };
    } catch (error) {
      if (error instanceof AlreadyExistsError)
        throw new BadRequestException(error.message, { cause: error });
      if (error instanceof ForeignKeyError)
        throw new BadRequestException(error.message, { cause: error });
      throw error;
    }
  }

  @Get('me/positions-of-interest')
  @Allowed('alumni')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'The list of positions of interest was succesfully obtained',
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
  ): Promise<PaginatedResponseDto<PositionOfInterestDto>> {
    if (paginationParamsDto.itemsPerPage < 1)
      throw new BadRequestException('Invalid number of items per page');
  
    const paginationResponse = await this.positionOfInterestService.findMany(
      user.id,
      paginationParamsDto.pageNumber,
      paginationParamsDto.itemsPerPage,
    );
    return {
      statusCode: HttpStatus.OK,
      data: paginationResponse,
    };
  }

  @Get(':alumniId/positions-of-interest')
  @SessionNotRequired()
  @Allowed('admin', 'visitor')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'The list of positions of interest was succesfully obtained',
  })
  @ApiBadRequestResponse({
    description: 'Invalid number of items per page requested',
  })
  @ApiInternalServerErrorResponse({
    description: 'An unexpected situation ocurred',
  })
  async findPage(
    @Param('alumniId') alumniId: string,
    @Query() paginationParamsDto: PaginationParamsDto,
  ): Promise<PaginatedResponseDto<PositionOfInterestDto>> {
    if (paginationParamsDto.itemsPerPage < 1)
      throw new BadRequestException('Invalid number of items per page');

    const paginationResponse = await this.positionOfInterestService.findMany(
      alumniId,
      paginationParamsDto.pageNumber,
      paginationParamsDto.itemsPerPage,
    );
    return {
      statusCode: HttpStatus.OK,
      data: paginationResponse,
    };
  }

  @Get('me/position-of-interest/:positionName')
  @Allowed('alumni')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Position of interest was succesfully found',
  })
  @ApiNotFoundResponse({
    description:
      'The position of interest for the requested alumni was not found',
  })
  @ApiInternalServerErrorResponse({
    description: 'An unexpected situation ocurred',
  })
  async findMine(
    @SessionUser() user: User,
    @Param('positionName') positionName: string,
  ): Promise<ResponseDto<PositionOfInterestDto>> {
    const positionOfInterest = await this.positionOfInterestService.findOne(
      user.id,
      positionName,
    );
    if (!positionOfInterest)
      throw new NotFoundException(
        'The position of interest for the requested alumni was not found',
      );
    return {
      statusCode: HttpStatus.OK,
      data: positionOfInterest,
    };
  }

  @Get(':alumniId/position-of-interest/:positionName')
  @SessionNotRequired()
  @Allowed('admin', 'visitor')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Position of interest was succesfully found',
  })
  @ApiNotFoundResponse({
    description:
      'The position of interest for the requested alumni was not found',
  })
  @ApiInternalServerErrorResponse({
    description: 'An unexpected situation ocurred',
  })
  async findOne(
    @Param('alumniId') alumniId: string,
    @Param('positionName') positionName: string,
  ): Promise<ResponseDto<PositionOfInterestDto>> {
    const positionOfInterest = await this.positionOfInterestService.findOne(
      alumniId,
      positionName,
    );
    if (!positionOfInterest)
      throw new NotFoundException(
        'The position of interest for the requested alumni was not found',
      );
    return {
      statusCode: HttpStatus.OK,
      data: positionOfInterest,
    };
  }

  @Patch('me/position-of-interest/:positionName')
  @Allowed('alumni')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Position of interest was succesfully updated',
  })
  @ApiNotFoundResponse({
    description:
      'The position of interest for the requested alumni was not found',
  })
  @ApiBadRequestResponse({
    description: 'Alredy exists a position of interest with the given name',
  })
  @ApiInternalServerErrorResponse({
    description: 'An unexpected situation ocurred',
  })
  async updateMine(
    @SessionUser() user: User,
    @Param('positionName') positionName: string,
    @Body() updatePositionOfInterestDto: UpdatePositionOfInterestDto,
  ): Promise<ResponseDto<PositionOfInterestDto>> {
    try {
      const positionOfInterest = await this.positionOfInterestService.update(
        user.id,
        positionName,
        updatePositionOfInterestDto,
      );
      return {
        statusCode: HttpStatus.OK,
        data: positionOfInterest,
      };
    } catch (error) {
      if (error instanceof NotFoundException)
        throw new NotFoundException(error.message, { cause: error });
      if (error instanceof AlreadyExistsError)
        throw new BadRequestException(error.message, { cause: error });
      throw error;
    }
  }

  @Patch(':alumniId/position-of-interest/:positionName')
  @Allowed('admin', 'visitor')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Position of interest was succesfully updated',
  })
  @ApiNotFoundResponse({
    description:
      'The position of interest for the requested alumni was not found',
  })
  @ApiBadRequestResponse({
    description: 'Alredy exists a position of interest with the given name',
  })
  @ApiInternalServerErrorResponse({
    description: 'An unexpected situation ocurred',
  })
  async update(
    @Param('alumniId') alumniId: string,
    @Param('positionName') positionName: string,
    @Body() updatePositionOfInterestDto: UpdatePositionOfInterestDto,
  ): Promise<ResponseDto<PositionOfInterestDto>> {
    try {
      const positionOfInterest = await this.positionOfInterestService.update(
        alumniId,
        positionName,
        updatePositionOfInterestDto,
      );
      return {
        statusCode: HttpStatus.OK,
        data: positionOfInterest,
      };
    } catch (error) {
      if (error instanceof NotFoundException)
        throw new NotFoundException(error.message, { cause: error });
      if (error instanceof AlreadyExistsError)
        throw new BadRequestException(error.message, { cause: error });
      throw error;
    }
  }

  @Delete('me/position-of-interest/:positionName')
  @Allowed('alumni')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Position of interest was succesfully deleted',
  })
  @ApiNotFoundResponse({
    description:
      'The position of interest for the requested alumni was not found',
  })
  @ApiInternalServerErrorResponse({
    description: 'An unexpected situation ocurred',
  })
  async removeMine(
    @SessionUser() user: User,
    @Param('positionName') positionName: string,
  ): Promise<ResponseDto<PositionOfInterestDto>> {
    try {
      const positionOfInterest = await this.positionOfInterestService.remove(
        user.id,
        positionName,
      );
      return {
        statusCode: HttpStatus.OK,
        data: positionOfInterest,
      };
    } catch (error) {
      if (error instanceof NotFoundException)
        throw new NotFoundException(error.message, { cause: error });
      throw error;
    }
  }

  @Delete(':alumniId/position-of-interest/:positionName')
  @Allowed('admin')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Position of interest was succesfully deleted',
  })
  @ApiNotFoundResponse({
    description:
      'The position of interest for the requested alumni was not found',
  })
  @ApiInternalServerErrorResponse({
    description: 'An unexpected situation ocurred',
  })
  async remove(
    @Param('alumniId') alumniId: string,
    @Param('positionName') positionName: string,
  ): Promise<ResponseDto<PositionOfInterestDto>> {
    try {
      const positionOfInterest = await this.positionOfInterestService.remove(
        alumniId,
        positionName,
      );
      return {
        statusCode: HttpStatus.OK,
        data: positionOfInterest,
      };
    } catch (error) {
      if (error instanceof NotFoundException)
        throw new NotFoundException(error.message, { cause: error });
      throw error;
    }
  }
}
