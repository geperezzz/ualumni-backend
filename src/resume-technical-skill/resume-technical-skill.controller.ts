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
  import { ResumeTechnicalSkillService } from './resume-technical-skill.service';
  import { CreateResumeTechnicalSkillDto } from './dto/create-resume-technical-skill.dto';
  import { UpdateResumeTechnicalSkillDto } from './dto/update-resume-technical-skill.dto';
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
  import { ResumeTechnicalSkillDto } from './dto/resume-technical-skill.dto';
  
  @ApiTags('resume-technical-skill')
  @Controller('user/:email/resume/resume-technical-skill')
  export class ResumeTechnicalSkillController {
    constructor(
      private readonly resumeTechnicalSkillService: ResumeTechnicalSkillService,
    ) {}
  
    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiCreatedResponse({
      description: 'The technical skill was succesfully added',
    })
    @ApiBadRequestResponse({
      description: 'Already exists a technical skill with the given name',
    })
    async create(
      @Param('email') resumeOwnerEmail: string,
      @Body() CreateResumeTechnicalSkillDto: CreateResumeTechnicalSkillDto,
    ) {
      try {
        const data = await this.resumeTechnicalSkillService.create(
          resumeOwnerEmail,
          CreateResumeTechnicalSkillDto,
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
        'The list of technical skills was succesfully obtained',
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
          await this.resumeTechnicalSkillService.findMany(
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
  
    @Get(':skillName')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
      description: 'A technical skill was succesfully found',
    })
    @ApiNotFoundResponse({
      description:
        'The technical skill for the requested alumni was not found',
    })
    @ApiInternalServerErrorResponse({
      description: 'An unexpected situation ocurred',
    })
    async findOne(
      @Param('email') resumeOwnerEmail: string,
      @Param('skillName') skillName: string,
    ) {
      const resumeTechnicalSkill = await this.resumeTechnicalSkillService.findOne(
        skillName,
        resumeOwnerEmail,
      );
  
      if (!resumeTechnicalSkill)
        throw new NotFoundException(
          `There is no technical skill with the given \`skillName\` (${skillName})`,
        );
      return {
        statusCode: HttpStatus.OK,
        data: resumeTechnicalSkill,
      };
    }
  
    @Patch(':skillName')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
      description: ' A technical skill was succesfully updated',
    })
    @ApiNotFoundResponse({
      description:
        'The technical skill with the requested name was not found',
    })
    @ApiBadRequestResponse({
      description: 'Already exist a technical skill with the given skillName',
    })
    @ApiInternalServerErrorResponse({
      description: 'An unexpected situation ocurred',
    })
    async update(
      @Param('email') resumeOwnerEmail: string,
      @Param('skillName') skillName: string,
      @Body() updateResumeTechnicalSkillDto: UpdateResumeTechnicalSkillDto,
    ) {
      try {
        const updateLanguageName =
          await this.resumeTechnicalSkillService.update(
            skillName,
            resumeOwnerEmail,
            updateResumeTechnicalSkillDto,
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
  
    @Delete(':skillName')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
      description: 'A technical skill was succesfully deleted',
    })
    @ApiNotFoundResponse({
      description:
        'The technical skill with the requested skillName was not found',
    })
    @ApiInternalServerErrorResponse({
      description: 'An unexpected situation ocurred',
    })
    async remove(
      @Param('email') resumeOwnerEmail: string,
      @Param('skillName') skillName: string,
    ): Promise<ResponseDto<ResumeTechnicalSkillDto>> {
      try {
        const deletedResumeTechnicalSkill =
          await this.resumeTechnicalSkillService.remove(skillName, resumeOwnerEmail);
        return {
          statusCode: HttpStatus.OK,
          data: deletedResumeTechnicalSkill,
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