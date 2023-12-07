import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
  DefaultValuePipe,
  Query,
  ParseIntPipe,
  BadRequestException,
  NotFoundException,
  Put,
  InternalServerErrorException,
  UseGuards,
} from '@nestjs/common';
import { CareerService } from './career.service';
import { CreateCareerDto } from './dto/create-career.dto';
import { UpdateCareerDto } from './dto/update-career.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ResponseDto } from 'src/common/dto/response.dto';
import { CareerDto } from './dto/career.dto';
import { PaginatedResponseDto } from 'src/common/dto/paginated-response.dto';
import {
  AlreadyExistsError,
  NotFoundError,
} from 'src/common/error/service.error';
import { PaginationParamsDto } from 'src/common/dto/pagination-params.dto';
import { SessionAuthGuard } from 'src/auth/session/session.guard';
import { PermissionsGuard } from 'src/permissions/permissions.guard';
import { Allowed } from 'src/permissions/allowed-roles.decorator';

@ApiTags('career')
@Controller('career')
@UseGuards(SessionAuthGuard, PermissionsGuard)
export class CareerController {
  constructor(private readonly careerService: CareerService) {}

  @Post()
  @Allowed('admin')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ description: 'The career was succesfully created' })
  @ApiBadRequestResponse({
    description: 'Already exists a career with the given name',
  })
  @ApiInternalServerErrorResponse({
    description: 'An unexpected situation ocurred',
  })
  async create(
    @Body() createCareerDto: CreateCareerDto,
  ): Promise<ResponseDto<CareerDto>> {
    try {
      const data = await this.careerService.create(createCareerDto);
      return { statusCode: HttpStatus.CREATED, data };
    } catch (error) {
      if (error instanceof AlreadyExistsError)
        throw new BadRequestException(error.message, { cause: error });
      throw new InternalServerErrorException(
        'An unexpected situation ocurred',
        { cause: error },
      );
    }
  }

  @Get()
  @Allowed('all')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'The list of careers was succesfully obtained',
  })
  @ApiBadRequestResponse({
    description: 'Invalid number of items per page requested',
  })
  @ApiInternalServerErrorResponse({
    description: 'An unexpected situation ocurred',
  })
  async findPage(
    @Query() paginationParamsDto: PaginationParamsDto,
  ): Promise<PaginatedResponseDto<CareerDto>> {
    if (paginationParamsDto.itemsPerPage < 1)
      throw new BadRequestException('Invalid number of items per page');
    try {
      const paginationResponse = await this.careerService.findMany(
        paginationParamsDto.pageNumber,
        paginationParamsDto.itemsPerPage,
      );
      return {
        statusCode: HttpStatus.OK,
        data: paginationResponse,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'An unexpected situation ocurred',
        { cause: error },
      );
    }
  }

  @Get(':name')
  @Allowed('all')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Career was succesfully found' })
  @ApiNotFoundResponse({
    description: 'The career with the requested name was not found',
  })
  @ApiInternalServerErrorResponse({
    description: 'An unexpected situation ocurred',
  })
  async findOne(@Param('name') name: string): Promise<ResponseDto<CareerDto>> {
    const career = await this.careerService.findOne(name);
    if (!career)
      throw new NotFoundException(
        `There is no career with the given \`name\` (${name})`,
      );
    return {
      statusCode: HttpStatus.OK,
      data: career,
    };
  }

  @Put(':name')
  @Allowed('admin')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Career was succesfully updated' })
  @ApiNotFoundResponse({
    description: 'The career with the requested name was not found',
  })
  @ApiBadRequestResponse({
    description: 'Already exist a career with the given name',
  })
  @ApiInternalServerErrorResponse({
    description: 'An unexpected situation ocurred',
  })
  async update(
    @Param('name') name: string,
    @Body() updateCareerDto: UpdateCareerDto,
  ): Promise<ResponseDto<CareerDto>> {
    try {
      const updatedCareer = await this.careerService.update(
        name,
        updateCareerDto,
      );
      return { statusCode: HttpStatus.OK, data: updatedCareer };
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new NotFoundException(error.message, { cause: error });
      }
      if (error instanceof AlreadyExistsError) {
        throw new BadRequestException(error.message, { cause: error });
      }
      throw new InternalServerErrorException(
        'An unexpected situation ocurred',
        { cause: error },
      );
    }
  }

  @Delete(':name')
  @Allowed('admin')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Career was succesfully delete' })
  @ApiNotFoundResponse({
    description: 'The career with the requested name was not found',
  })
  @ApiInternalServerErrorResponse({
    description: 'An unexpected situation ocurred',
  })
  async remove(@Param('name') name: string): Promise<ResponseDto<CareerDto>> {
    try {
      const deletedCareer = await this.careerService.remove(name);
      return {
        statusCode: HttpStatus.OK,
        data: deletedCareer,
      };
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new NotFoundException(error.message, { cause: error });
      }
      throw new InternalServerErrorException(
        'An unexpected situation ocurred',
        { cause: error },
      );
    }
  }
}
