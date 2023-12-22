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
  ParseUUIDPipe,
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
} from 'src/common/errors/service.error';
import { ResponseDto } from 'src/common/dto/response.dto';
import { ResumeTechnicalSkillDto } from './dto/resume-technical-skill.dto';
import { PaginatedResponseDto } from 'src/common/dto/paginated-response.dto';
import { SessionAuthGuard } from 'src/auth/session/session.guard';
import { PermissionsGuard } from 'src/permissions/permissions.guard';
import { SessionUser } from 'src/auth/session/session-user.decorator';
import { User } from 'prisma/ualumni/client';
import { Allowed } from 'src/permissions/allowed-roles.decorator';
import { PaginationParamsDto } from 'src/common/dto/pagination-params.dto';
import { SessionNotRequired } from 'src/auth/session/session-not-required.decorator';

@ApiTags('resume-technical-skill')
@Controller('alumni')
@UseGuards(SessionAuthGuard, PermissionsGuard)
export class ResumeTechnicalSkillController {
  constructor(
    private readonly resumeTechnicalSkillService: ResumeTechnicalSkillService,
  ) {}

  @Post('me/resume/skill-category/technical-skill')
  @Allowed('alumni')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    description: 'The technical skill was succesfully added',
  })
  @ApiBadRequestResponse({
    description: 'Already exists a technical skill with the given name',
  })
  async addMine(
    @SessionUser() user: User,
    @Body() CreateResumeTechnicalSkillDto: CreateResumeTechnicalSkillDto,
  ): Promise<ResponseDto<ResumeTechnicalSkillDto>> {
    try {
      const data = await this.resumeTechnicalSkillService.create(
        user.id,
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

  @Post(':alumniId/resume/skill-category/technical-skill')
  @Allowed('admin')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    description: 'The technical skill was succesfully added',
  })
  @ApiBadRequestResponse({
    description: 'Already exists a technical skill with the given name',
  })
  async add(
    @Param('alumniId', ParseUUIDPipe) alumniId: string,
    @Body() CreateResumeTechnicalSkillDto: CreateResumeTechnicalSkillDto,
  ): Promise<ResponseDto<ResumeTechnicalSkillDto>> {
    try {
      const data = await this.resumeTechnicalSkillService.create(
        alumniId,
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

  @Get('me/resume/skill-category/technical-skill')
  @Allowed('alumni')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'The list of technical skills was succesfully obtained',
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
  ): Promise<PaginatedResponseDto<ResumeTechnicalSkillDto>> {
    if (paginationParamsDto.itemsPerPage < 1)
      throw new BadRequestException('Invalid number of items per page');
    try {
      const paginationResponse =
        await this.resumeTechnicalSkillService.findMany(
          user.id,
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

  @Get(':alumniId/resume/skill-category/technical-skill')
  @SessionNotRequired()
  @Allowed('admin', 'visitor')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'The list of technical skills was succesfully obtained',
  })
  @ApiBadRequestResponse({
    description: 'Invalid number of items per page requested',
  })
  @ApiInternalServerErrorResponse({
    description: 'An unexpected situation ocurred',
  })
  async findPage(
    @Param('alumniId', ParseUUIDPipe) alumniId: string,
    @Query() paginationParamsDto: PaginationParamsDto,
  ): Promise<PaginatedResponseDto<ResumeTechnicalSkillDto>> {
    if (paginationParamsDto.itemsPerPage < 1)
      throw new BadRequestException('Invalid number of items per page');
    try {
      const paginationResponse =
        await this.resumeTechnicalSkillService.findMany(
          alumniId,
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

  @Get('me/resume/skill-category/:skillCategory/technical-skill/:skillName')
  @Allowed('alumni')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'A technical skill was succesfully found',
  })
  @ApiNotFoundResponse({
    description: 'The technical skill for the requested alumni was not found',
  })
  @ApiInternalServerErrorResponse({
    description: 'An unexpected situation ocurred',
  })
  async findMine(
    @SessionUser() user: User,
    @Param('skillCategory') skillCategory: string,
    @Param('skillName') skillName: string,
  ): Promise<ResponseDto<ResumeTechnicalSkillDto>> {
    const resumeTechnicalSkill = await this.resumeTechnicalSkillService.findOne(
      user.id,
      skillCategory,
      skillName,
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

  @Get(':alumniId/resume/skill-category/:skillCategory/technical-skill/:skillName')
  @SessionNotRequired()
  @Allowed('admin', 'visitor')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'A technical skill was succesfully found',
  })
  @ApiNotFoundResponse({
    description: 'The technical skill for the requested alumni was not found',
  })
  @ApiInternalServerErrorResponse({
    description: 'An unexpected situation ocurred',
  })
  async findOne(
    @Param('alumniId', ParseUUIDPipe) alumniId: string,
    @Param('skillCategory') skillCategory: string,
    @Param('skillName') skillName: string,
  ): Promise<ResponseDto<ResumeTechnicalSkillDto>> {
    const resumeTechnicalSkill = await this.resumeTechnicalSkillService.findOne(
      alumniId,
      skillCategory,
      skillName,
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

  @Patch('me/resume/skill-category/:skillCategory/technical-skill/:skillName')
  @Allowed('alumni')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: ' A technical skill was succesfully updated',
  })
  @ApiNotFoundResponse({
    description: 'The technical skill with the requested name was not found',
  })
  @ApiBadRequestResponse({
    description: 'Already exist a technical skill with the given skillName',
  })
  @ApiInternalServerErrorResponse({
    description: 'An unexpected situation ocurred',
  })
  async updateMine(
    @SessionUser() user: User,
    @Param('skillCategory') skillCategory: string,
    @Param('skillName') skillName: string,
    @Body() updateResumeTechnicalSkillDto: UpdateResumeTechnicalSkillDto,
  ): Promise<ResponseDto<ResumeTechnicalSkillDto>> {
    try {
      const updateLanguageName = await this.resumeTechnicalSkillService.update(
        user.id,
        skillCategory,
        skillName,
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

  @Patch(
    ':alumniId/resume/skill-category/:skillCategory/technical-skill/:skillName',
  )
  @Allowed('admin')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: ' A technical skill was succesfully updated',
  })
  @ApiNotFoundResponse({
    description: 'The technical skill with the requested name was not found',
  })
  @ApiBadRequestResponse({
    description: 'Already exist a technical skill with the given skillName',
  })
  @ApiInternalServerErrorResponse({
    description: 'An unexpected situation ocurred',
  })
  async update(
    @Param('alumniId', ParseUUIDPipe) alumniId: string,
    @Param('skillCategory') skillCategory: string,
    @Param('skillName') skillName: string,
    @Body() updateResumeTechnicalSkillDto: UpdateResumeTechnicalSkillDto,
  ): Promise<ResponseDto<ResumeTechnicalSkillDto>> {
    try {
      const updateLanguageName = await this.resumeTechnicalSkillService.update(
        alumniId,
        skillCategory,
        skillName,
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

  @Delete('me/resume/skill-category/:skillCategory/technical-skill/:skillName')
  @Allowed('alumni')
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
  async removeMine(
    @SessionUser() user: User,
    @Param('skillCategory') skillCategory: string,
    @Param('skillName') skillName: string,
  ): Promise<ResponseDto<ResumeTechnicalSkillDto>> {
    try {
      const deletedResumeTechnicalSkill =
        await this.resumeTechnicalSkillService.remove(
          user.id,
          skillCategory,
          skillName,
        );
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

  @Delete(
    ':alumniId/resume/skill-category/:skillCategory/technical-skill/:skillName',
  )
  @Allowed('admin')
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
    @Param('alumniId', ParseUUIDPipe) alumniId: string,
    @Param('skillCategory') skillCategory: string,
    @Param('skillName') skillName: string,
  ): Promise<ResponseDto<ResumeTechnicalSkillDto>> {
    try {
      const deletedResumeTechnicalSkill =
        await this.resumeTechnicalSkillService.remove(
          alumniId,
          skillCategory,
          skillName,
        );
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
