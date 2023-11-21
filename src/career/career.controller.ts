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
} from '@nestjs/common';
import { CareerService } from './career.service';
import { CreateCareerDto } from './dto/create-career.dto';
import { UpdateCareerDto } from './dto/update-career.dto';

@Controller('career')
export class CareerController {
  constructor(private readonly careerService: CareerService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
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
  async findOne(@Param('id') id: string): Promise<any> {
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
  async update(
    @Param('id') id: string,
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
  async remove(@Param('id') id: string) {
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
