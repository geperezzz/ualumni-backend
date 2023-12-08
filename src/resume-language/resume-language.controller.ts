import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  HttpException,
  DefaultValuePipe,
  ParseIntPipe,
  BadRequestException,
  NotFoundException,
  InternalServerErrorException,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ResumeLanguageService } from './resume-language.service';
import { CreateResumeLanguageDto } from './dto/create-resume-language.dto';
import { UpdateResumeLanguageDto } from './dto/update-resume-language.dto';
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
  ForeignKeyError,
  NotFoundError,
} from 'src/common/error/service.error';
import { ResponseDto } from 'src/common/dto/response.dto';
import { ResumeLanguageDto } from './dto/resume-language.dto';
import { PermissionsGuard } from 'src/permissions/permissions.guard';
import { SessionAuthGuard } from 'src/auth/session/session.guard';
import { Allowed } from 'src/permissions/allowed-roles.decorator';
import { SessionUser } from 'src/auth/session/session-user.decorator';
import { User } from '@prisma/client';
import { PaginationParamsDto } from 'src/common/dto/pagination-params.dto';
import { SessionNotRequired } from 'src/auth/session/session-not-required.decorator';

@ApiTags('resume-language')
@Controller('alumni')
@UseGuards(SessionAuthGuard, PermissionsGuard)
export class ResumeLanguageController {
  constructor(private readonly resumeLanguageService: ResumeLanguageService) {}

  @Post('me/resume/language')
  @Allowed('alumni')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    description: 'The language was succesfully added',
  })
  @ApiBadRequestResponse({
    description: 'Already exists a language with the given name',
  })
  async addMine(
    @SessionUser() user: User,
    @Body() CreateResumeLanguageDto: CreateResumeLanguageDto,
  ): Promise<ResponseDto<ResumeLanguageDto>> {
    try {
      const data = await this.resumeLanguageService.create(
        user.email,
        CreateResumeLanguageDto,
      );
      return {
        statusCode: HttpStatus.CREATED,
        data,
      };
    } catch (error) {
      if (error instanceof AlreadyExistsError)
        throw new BadRequestException(error.message, { cause: error });
      if (error instanceof ForeignKeyError)
        throw new BadRequestException(error.message, { cause: error });
      throw new InternalServerErrorException(
        'An unexpected situation ocurred',
        { cause: error },
      );
    }
  }

  @Post(':email/resume/language')
  @Allowed('admin')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    description: 'The language was succesfully added',
  })
  @ApiBadRequestResponse({
    description: 'Already exists a language with the given name',
  })
  async add(
    @Param('email') resumeOwnerEmail: string,
    @Body() CreateResumeLanguageDto: CreateResumeLanguageDto,
  ): Promise<ResponseDto<ResumeLanguageDto>> {
    try {
      const data = await this.resumeLanguageService.create(
        resumeOwnerEmail,
        CreateResumeLanguageDto,
      );
      return {
        statusCode: HttpStatus.CREATED,
        data,
      };
    } catch (error) {
      if (error instanceof AlreadyExistsError)
        throw new BadRequestException(error.message, { cause: error });
      if (error instanceof ForeignKeyError)
        throw new BadRequestException(error.message, { cause: error });
      throw new InternalServerErrorException(
        'An unexpected situation ocurred',
        { cause: error },
      );
    }
  }

  @Get('me/resume/language')
  @Allowed('alumni')
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
  async findPageMine(
    @SessionUser() user: User,
    @Query() paginationParamsDto: PaginationParamsDto,
  ): Promise<any> {
    if (paginationParamsDto.itemsPerPage < 1)
      throw new BadRequestException('Invalid number of items per page');
    try {
      const paginationResponse = await this.resumeLanguageService.findMany(
        user.email,
        paginationParamsDto.pageNumber,
        paginationParamsDto.itemsPerPage,
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

  @Get(':email/resume/language')
  @SessionNotRequired()
  @Allowed('admin', 'visitor')
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
  async findPage(
    @Param('email') resumeOwnerEmail: string,
    @Query() paginationParamsDto: PaginationParamsDto,
  ): Promise<any> {
    if (paginationParamsDto.itemsPerPage < 1)
      throw new BadRequestException('Invalid number of items per page');
    try {
      const paginationResponse = await this.resumeLanguageService.findMany(
        resumeOwnerEmail,
        paginationParamsDto.pageNumber,
        paginationParamsDto.itemsPerPage,
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

  @Get('me/resume/language/:languageName')
  @Allowed('alumni')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'A Language was succesfully found',
  })
  @ApiNotFoundResponse({
    description: 'The language for the requested alumni was not found',
  })
  @ApiInternalServerErrorResponse({
    description: 'An unexpected situation ocurred',
  })
  async findMine(
    @SessionUser() user: User,
    @Param('languageName') languageName: string,
  ) {
    const resumeLanguage = await this.resumeLanguageService.findOne(
      languageName,
      user.email,
    );

    if (!resumeLanguage)
      throw new NotFoundException(
        `There is no language with the given \`languageName\` (${languageName})`,
      );
    return {
      statusCode: HttpStatus.OK,
      data: resumeLanguage,
    };
  }

  @Get(':email/resume/language/:languageName')
  @SessionNotRequired()
  @Allowed('admin', 'visitor')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'A Language was succesfully found',
  })
  @ApiNotFoundResponse({
    description: 'The language for the requested alumni was not found',
  })
  @ApiInternalServerErrorResponse({
    description: 'An unexpected situation ocurred',
  })
  async findOne(
    @Param('email') resumeOwnerEmail: string,
    @Param('languageName') languageName: string,
  ) {
    const resumeLanguage = await this.resumeLanguageService.findOne(
      languageName,
      resumeOwnerEmail,
    );

    if (!resumeLanguage)
      throw new NotFoundException(
        `There is no language with the given \`languageName\` (${languageName})`,
      );
    return {
      statusCode: HttpStatus.OK,
      data: resumeLanguage,
    };
  }

  @Patch('me/resume/language/:languageName')
  @Allowed('alumni')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Language was succesfully updated',
  })
  @ApiNotFoundResponse({
    description: 'The language with the requested name was not found',
  })
  @ApiBadRequestResponse({
    description: 'Already exist a language with the given languageName',
  })
  @ApiInternalServerErrorResponse({
    description: 'An unexpected situation ocurred',
  })
  async updateMine(
    @SessionUser() user: User,
    @Param('languageName') languageName: string,
    @Body() updateLanguageNameDto: UpdateResumeLanguageDto,
  ) {
    try {
      const updateLanguageName = await this.resumeLanguageService.update(
        languageName,
        user.email,
        updateLanguageNameDto,
      );
      return { statusCode: HttpStatus.OK, data: updateLanguageName };
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

  @Patch(':email/resume/language/:languageName')
  @Allowed('admin')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Language was succesfully updated',
  })
  @ApiNotFoundResponse({
    description: 'The language with the requested name was not found',
  })
  @ApiBadRequestResponse({
    description: 'Already exist a language with the given languageName',
  })
  @ApiInternalServerErrorResponse({
    description: 'An unexpected situation ocurred',
  })
  async update(
    @Param('email') resumeOwnerEmail: string,
    @Param('languageName') languageName: string,
    @Body() updateLanguageNameDto: UpdateResumeLanguageDto,
  ) {
    try {
      const updateLanguageName = await this.resumeLanguageService.update(
        languageName,
        resumeOwnerEmail,
        updateLanguageNameDto,
      );
      return { statusCode: HttpStatus.OK, data: updateLanguageName };
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

  @Delete('me/resume/language/:languageName')
  @Allowed('alumni')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Higher education study was succesfully deleted',
  })
  @ApiNotFoundResponse({
    description:
      'The higher education study with the requested languageName was not found',
  })
  @ApiInternalServerErrorResponse({
    description: 'An unexpected situation ocurred',
  })
  async removeMine(
    @SessionUser() user: User,
    @Param('languageName') languageName: string,
  ): Promise<ResponseDto<ResumeLanguageDto>> {
    try {
      const deletedResumeLanguage = await this.resumeLanguageService.remove(
        languageName,
        user.email,
      );
      return {
        statusCode: HttpStatus.OK,
        data: deletedResumeLanguage,
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

  @Delete(':email/resume/language/:languageName')
  @Allowed('admin')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Higher education study was succesfully deleted',
  })
  @ApiNotFoundResponse({
    description:
      'The higher education study with the requested languageName was not found',
  })
  @ApiInternalServerErrorResponse({
    description: 'An unexpected situation ocurred',
  })
  async remove(
    @Param('email') resumeOwnerEmail: string,
    @Param('languageName') languageName: string,
  ): Promise<ResponseDto<ResumeLanguageDto>> {
    try {
      const deletedResumeLanguage = await this.resumeLanguageService.remove(
        languageName,
        resumeOwnerEmail,
      );
      return {
        statusCode: HttpStatus.OK,
        data: deletedResumeLanguage,
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
