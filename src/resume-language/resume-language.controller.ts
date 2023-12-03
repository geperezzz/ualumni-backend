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
  
  @ApiTags('resume-language')
  @Controller('user/:email/resume/resume-language')
  export class ResumeLanguageController {
    constructor(
      private readonly resumeLanguageService: ResumeLanguageService,
    ) {}
  
    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiCreatedResponse({
      description: 'The language was succesfully added',
    })
    @ApiBadRequestResponse({
      description: 'Already exists a language with the given name',
    })
    async create(
      @Param('email') resumeOwnerEmail: string,
      @Body() CreateResumeLanguageDto: CreateResumeLanguageDto,
    ) {
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
  
    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
      description:
        'The list of languages was succesfully obtained',
    })
    @ApiBadRequestResponse({
      description: 'Invalid number of items per page requested',
    })
    @ApiInternalServerErrorResponse({
      description: 'An unexpected situation ocurred',
    })
    async findMany(
      @Param('email') resumeOwnerEmail: string,
      @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
      @Query('per-page', new DefaultValuePipe(10), ParseIntPipe) perPage: number,
    ): Promise<any> {
      if (perPage < 1)
        throw new BadRequestException('Invalid number of items per page');
      try {
        const paginationResponse =
          await this.resumeLanguageService.findMany(
            resumeOwnerEmail,
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
  
    @Get(':languageName')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
      description: 'A Language was succesfully found',
    })
    @ApiNotFoundResponse({
      description:
        'The language for the requested alumni was not found',
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
  
    @Patch(':languageName')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
      description: 'Language was succesfully updated',
    })
    @ApiNotFoundResponse({
      description:
        'The language with the requested name was not found',
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
        const updateLanguageName =
          await this.resumeLanguageService.update(
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
  
    @Delete(':languageName')
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
        const deletedResumeLanguage =
          await this.resumeLanguageService.remove(languageName, resumeOwnerEmail);
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