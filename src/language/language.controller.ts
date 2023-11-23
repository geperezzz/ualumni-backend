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
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
  Put,
} from '@nestjs/common';
import { LanguageService } from './language.service';
import { LanguageDto } from './dto/language.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ResponseDto } from 'src/common/dto/response.dto';
import { PaginatedResponseDto } from 'src/common/dto/paginated-response.dto';
import { CreateLanguageDto } from './dto/create-language.dto';
import {
  AlreadyExistsError,
  NotFoundError,
} from 'src/common/error/service.error';

@ApiTags('language')
@Controller('language')
export class LanguageController {
  constructor(private readonly languageService: LanguageService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ description: 'Language created' })
  async create(
    @Body() createLanguageDto: CreateLanguageDto,
  ): Promise<ResponseDto<LanguageDto>> {
    try {
      const data = await this.languageService.create(createLanguageDto);
      return {
        statusCode: HttpStatus.CREATED,
        data,
      };
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
  @ApiOkResponse({ description: 'Languages list' })
  async findMany(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('per-page', new DefaultValuePipe(10), ParseIntPipe) perPage: number,
  ): Promise<PaginatedResponseDto<LanguageDto>> {
    if (perPage < 1)
      throw new BadRequestException('Invalid number of items per page');
    try {
      const paginationResponse = await this.languageService.findMany(
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
  @ApiOkResponse({ description: 'Language found' })
  async findOne(
    @Param('name') name: string,
  ): Promise<ResponseDto<LanguageDto>> {
    const language = await this.languageService.findOne(name);
    if (!language)
      throw new NotFoundException(
        `There is no language with the given \`name\` (${name})`,
      );
    return {
      statusCode: HttpStatus.OK,
      data: language,
    };
  }

  @Put(':name')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Language updated' })
  async update(
    @Param('name') name: string,
    @Body() updateLanguageDto: LanguageDto,
  ): Promise<ResponseDto<LanguageDto>> {
    try {
      const updatedLanguage = await this.languageService.update(
        name,
        updateLanguageDto,
      );
      return {
        statusCode: HttpStatus.OK,
        data: updatedLanguage,
      };
    } catch (error) {
      if (error instanceof NotFoundError)
        throw new NotFoundException(error.message, { cause: error });
      if (error instanceof AlreadyExistsError)
        throw new BadRequestException(error.message, { cause: error });
      throw new InternalServerErrorException(
        'An unexpected situation ocurred',
        { cause: error },
      );
    }
  }

  @Delete(':name')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Language deleted' })
  async remove(@Param('name') name: string): Promise<ResponseDto<LanguageDto>> {
    try {
      const deletedLanguage = await this.languageService.remove(name);
      return {
        statusCode: HttpStatus.OK,
        data: deletedLanguage,
      };
    } catch (error) {
      if (error instanceof NotFoundError)
        throw new NotFoundException(error.message, { cause: error });
      throw new InternalServerErrorException(
        'An unexpected situation ocurred',
        { cause: error },
      );
    }
  }
}
