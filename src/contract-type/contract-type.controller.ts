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
  Query,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import { ContractTypeService } from './contract-type.service';
import { ContractTypeDto } from './dto/contract-type.dto';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { ResponseDto } from 'src/common/dto/response.dto';
import { PaginatedResponseDto } from 'src/common/dto/paginated-response.dto';

@Controller('contract-type')
export class ContractTypeController {
  constructor(private readonly contractTypeService: ContractTypeService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ description: 'Contract type created' })
  async create(@Body() contractTypeDto: ContractTypeDto): Promise<ResponseDto<ContractTypeDto>> {
    try {
      const data = await this.contractTypeService.create(contractTypeDto);
      return {
        statusCode: HttpStatus.CREATED,
        data,
      };
    } catch (error) {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('per-page', new DefaultValuePipe(10), ParseIntPipe) perPage: number,
  ): Promise<PaginatedResponseDto<ContractTypeDto>> {
    try {
      if (perPage < 1)
        throw new HttpException(
          'Invalid number of items per page',
          HttpStatus.BAD_REQUEST,
        );

      const paginationResponse = await this.contractTypeService.findAll(
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

  @Get(':name')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('name') name: string): Promise<ResponseDto<ContractTypeDto>> {
    try {
      const data = await this.contractTypeService.findOne(name);
      return {
        statusCode: HttpStatus.OK,
        data
      }
    } catch (error) {
      const message = error.response ? error.response : 'Bad Request';
      throw new HttpException(message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':name')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('name') name: string): Promise<ResponseDto<null>> {
    try {
      await this.contractTypeService.remove(name);
      return {
        statusCode: HttpStatus.OK,
        data: null,
      };
    } catch (error) {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
  }
}
