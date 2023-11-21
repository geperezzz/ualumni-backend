import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
  HttpException,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import { LanguageService } from './language.service';
import { LanguageDto } from './dto/languageDto.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('language')
@Controller('language')
export class LanguageController {
  constructor(private readonly languageService: LanguageService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ description: 'Language created' })
  async create(@Body() languageDto: LanguageDto): Promise<any> {
    try {
      const data = await this.languageService.create(languageDto);
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
  @ApiOkResponse({ description: 'Languages list' })
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

      const paginationResponse = await this.languageService.findAll(
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

  @Delete(':name')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Language deleted' })
  async remove(@Param('name') name: string) {
    try {
      await this.languageService.remove(name);
      return {
        statusCode: HttpStatus.OK,
        data: null,
      };
    } catch (error) {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
  }
}
