import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
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
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ResponseDto } from 'src/common/dto/response.dto';
import { PaginatedResponseDto } from 'src/common/dto/paginated-response.dto';
import { CreateLanguageDto } from './dto/create-language.dto';
import {
  AlreadyExistsError,
  NotFoundError,
} from 'src/common/error/service.error';
import { UpdateLanguageDto } from './dto/update-language.dto';

@ApiTags('language')
@Controller('language')
export class LanguageController {
  constructor(private readonly languageService: LanguageService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ description: 'Language was succesfully created' })
  @ApiBadRequestResponse({
    description: 'Already exists a language with the given name',
  })
  @ApiInternalServerErrorResponse({
    description: 'An unexpected situation ocurred',
  })
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
  @ApiOkResponse({
    description: 'The list of languages was succesfully obtained',
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
  @ApiOkResponse({ description: 'Language was succesfully found' })
  @ApiNotFoundResponse({
    description: 'The language with the requested name was not found',
  })
  @ApiInternalServerErrorResponse({
    description: 'An unexpected situation ocurred',
  })
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
  @ApiOkResponse({ description: 'Language was succesfully updated' })
  @ApiNotFoundResponse({
    description: 'The language with the requested name was not found',
  })
  @ApiBadRequestResponse({
    description: 'Already exists a language with the given name',
  })
  @ApiInternalServerErrorResponse({
    description: 'An unexpected situation ocurred',
  })
  async update(
    @Param('name') name: string,
    @Body() updateLanguageDto: UpdateLanguageDto,
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
  @ApiOkResponse({ description: 'Language was succesfully deleted' })
  @ApiNotFoundResponse({
    description: 'The language with the requested name was not found',
  })
  @ApiInternalServerErrorResponse({
    description: 'An unexpected situation ocurred',
  })
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