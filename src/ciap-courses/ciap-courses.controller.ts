import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  DefaultValuePipe,
  HttpCode,
  HttpStatus,
  BadRequestException,
  InternalServerErrorException,
  ParseUUIDPipe,
  Put,
  NotFoundException,
} from '@nestjs/common';
import { CiapCoursesService } from './ciap-courses.service';
import { CreateCiapCourseDto } from './dto/create-ciap-course.dto';
import { UpdateCiapCourseDto } from './dto/update-ciap-course.dto';
import { ResponseDto } from 'src/common/dto/response.dto';
import { CiapCourseDto } from './dto/ciap-course.dto';
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
  NotFoundError,
} from 'src/common/error/service.error';
import { PaginatedResponseDto } from 'src/common/dto/paginated-response.dto';

@ApiTags('ciap-courses')
@Controller('ciap-courses')
export class CiapCoursesController {
  constructor(private readonly ciapCoursesService: CiapCoursesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    description: 'The CIAP course was succesfully created',
  })
  @ApiBadRequestResponse({
    description: 'Already exists a CIAP course with the given id',
  })
  @ApiInternalServerErrorResponse({
    description: 'An unexpected situation ocurred',
  })
  async create(
    @Body() createCiapCourseDto: CreateCiapCourseDto,
  ): Promise<ResponseDto<CiapCourseDto>> {
    try {
      const data = await this.ciapCoursesService.create(createCiapCourseDto);
      return { statusCode: 201, data };
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
  ): Promise<PaginatedResponseDto<CiapCourseDto>> {
    if (perPage < 1)
      throw new BadRequestException('Invalid number of items per page');
    try {
      const paginationResponse = await this.ciapCoursesService.findMany(
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

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'CIAP course was succesfully found' })
  @ApiNotFoundResponse({
    description: 'The CIAP course with the requested id was not found',
  })
  @ApiInternalServerErrorResponse({
    description: 'An unexpected situation ocurred',
  })
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseDto<CiapCourseDto>> {
    const ciapCourse = await this.ciapCoursesService.findOne(id);
    if (!ciapCourse)
      throw new BadRequestException(
        'The CIAP course with the requested id was not found',
      );
    return { statusCode: HttpStatus.OK, data: ciapCourse };
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'CIAP course was succesfully updated' })
  @ApiNotFoundResponse({
    description: 'The CIAP course with the requested id was not found',
  })
  @ApiBadRequestResponse({
    description: 'Already exist a CIAP course with the given id',
  })
  @ApiInternalServerErrorResponse({
    description: 'An unexpected situation ocurred',
  })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCiapCourseDto: UpdateCiapCourseDto,
  ) {
    try {
      const updatedCiapCourse = await this.ciapCoursesService.update(
        id,
        updateCiapCourseDto,
      );
      return { statusCode: HttpStatus.OK, data: updatedCiapCourse };
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

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'CIAP course was succesfully delete' })
  @ApiNotFoundResponse({
    description: 'The CIAP course with the requested id was not found',
  })
  @ApiInternalServerErrorResponse({
    description: 'An unexpected situation ocurred',
  })
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseDto<CiapCourseDto>> {
    try {
      const deletedCiapCourse = await this.ciapCoursesService.remove(id);
      return {
        statusCode: HttpStatus.OK,
        data: deletedCiapCourse,
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
