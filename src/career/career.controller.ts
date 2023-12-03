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

@ApiTags('career')
@Controller('career')
export class CareerController {
  constructor(private readonly careerService: CareerService) {}

  @Post()
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
  async findMany(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('per-page', new DefaultValuePipe(10), ParseIntPipe) perPage: number,
  ): Promise<PaginatedResponseDto<CareerDto>> {
    if (perPage < 1)
      throw new BadRequestException('Invalid number of items per page');
    try {
      const paginationResponse = await this.careerService.findMany(
        page,
        perPage,
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
