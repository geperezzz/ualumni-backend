import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
  HttpException,
  DefaultValuePipe,
  Query,
  ParseIntPipe,
  ParseUUIDPipe,
} from '@nestjs/common';
import { CareerService } from './career.service';
import { CreateCareerDto } from './dto/create-career.dto';
import { UpdateCareerDto } from './dto/update-career.dto';
import {
  ApiCreatedResponse,
  ApiExtraModels,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CareerResponseDto } from 'src/common/api/api-response';

@ApiTags('career')
@Controller('career')
export class CareerController {
  constructor(private readonly careerService: CareerService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ description: 'Career created' })
  @ApiExtraModels(CareerResponseDto)
  async create(@Body() createCareerDto: CreateCareerDto) {
    try {
      const data = await this.careerService.create(createCareerDto);
      return { statusCode: HttpStatus.CREATED, data };
    } catch (error) {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Careers list' })
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('per-page', new DefaultValuePipe(10), ParseIntPipe) perPage: number,
  ): Promise<any> {
    try {
      if (perPage < 1)
        throw new HttpException(
          'Invalid number of items per page',
          HttpStatus.BAD_REQUEST,
        );

      const paginationResponse = await this.careerService.findAll(
        page,
        perPage,
      );
      return {
        statusCode: HttpStatus.OK,
        data: paginationResponse,
      };
    } catch (error) {
      const message = error.response ? error.response : 'Bad Request';
      throw new HttpException(message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Career found' })
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<any> {
    try {
      const career = await this.careerService.findOne(id);
      return {
        statusCode: HttpStatus.OK,
        data: career,
      };
    } catch (error) {
      throw new HttpException('Bad request', HttpStatus.NOT_FOUND);
    }
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Career updated' })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCareerDto: UpdateCareerDto,
  ) {
    try {
      return await this.careerService.update(id, updateCareerDto);
    } catch (error) {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Career deleted' })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    try {
      await this.careerService.remove(id);
      return {
        statusCode: HttpStatus.OK,
        data: null,
      };
    } catch (error) {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
  }
}
