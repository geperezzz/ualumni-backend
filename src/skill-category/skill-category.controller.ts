import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpStatus,
  BadRequestException,
  InternalServerErrorException,
  HttpCode,
  Query,
  NotFoundException,
  Put,
  UseGuards,
} from '@nestjs/common';
import { SkillCategoryService } from './skill-category.service';
import { CreateSkillCategoryDto } from './dto/create-skill-category.dto';
import { UpdateSkillCategoryDto } from './dto/update-skill-category.dto';
import { ResponseDto } from 'src/common/dto/response.dto';
import { SkillCategoryDto } from './dto/skill-category.dto';
import {
  AlreadyExistsError,
  ForeignKeyError,
  NotFoundError,
} from 'src/common/errors/service.error';
import { PaginatedResponseDto } from 'src/common/dto/paginated-response.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SessionAuthGuard } from 'src/auth/session/session.guard';
import { PermissionsGuard } from 'src/permissions/permissions.guard';
import { Allowed } from 'src/permissions/allowed-roles.decorator';
import { SessionNotRequired } from 'src/auth/session/session-not-required.decorator';
import { PaginationParamsDto } from 'src/common/dto/pagination-params.dto';

@ApiTags('skill-category')
@Controller('skill-category')
@UseGuards(SessionAuthGuard, PermissionsGuard)
export class SkillCategoryController {
  constructor(private readonly skillCategoryService: SkillCategoryService) {}

  @Post()
  @Allowed('admin')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    description: 'The skill category was succesfully created',
  })
  @ApiBadRequestResponse({
    description: 'Already exists a skill category with the given name',
  })
  @ApiBadRequestResponse({
    description: 'There is no career with the given name/s',
  })
  @ApiInternalServerErrorResponse({
    description: 'An unexpected situation ocurred',
  })
  async create(
    @Body() createSkillCategoryDto: CreateSkillCategoryDto,
  ): Promise<ResponseDto<SkillCategoryDto>> {
    try {
      const skillCategory = await this.skillCategoryService.create(
        createSkillCategoryDto,
      );
      return {
        statusCode: HttpStatus.CREATED,
        data: skillCategory,
      };
    } catch (error) {
      if (
        error instanceof AlreadyExistsError ||
        error instanceof ForeignKeyError
      ) {
        throw new BadRequestException(error.message, { cause: error });
      }
      throw new InternalServerErrorException(
        'An unexpected situation ocurred',
        { cause: error },
      );
    }
  }

  @Get()
  @SessionNotRequired()
  @Allowed('all')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'The list of skill categories was succesfully obtained',
  })
  @ApiBadRequestResponse({
    description: 'Invalid number of items per page requested',
  })
  @ApiInternalServerErrorResponse({
    description: 'An unexpected situation ocurred',
  })
  async findPage(
    @Query() paginationParamsDto: PaginationParamsDto,
  ): Promise<PaginatedResponseDto<SkillCategoryDto>> {
    if (paginationParamsDto.itemsPerPage < 1)
      throw new BadRequestException('Invalid number of items per page');
    try {
      const skillCategories = await this.skillCategoryService.findMany(
        paginationParamsDto.pageNumber,
        paginationParamsDto.itemsPerPage,
      );
      return {
        statusCode: HttpStatus.OK,
        data: skillCategories,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'An unexpected situation ocurred',
        { cause: error },
      );
    }
  }

  @Get('careers')
  @SessionNotRequired()
  @Allowed('all')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'The list of skill categories was succesfully obtained',
  })
  @ApiBadRequestResponse({
    description: 'Invalid number of items per page requested',
  })
  @ApiInternalServerErrorResponse({
    description: 'An unexpected situation ocurred',
  })
  async findPageWithSkills(
    @Query() paginationParamsDto: PaginationParamsDto,
  ): Promise<PaginatedResponseDto<SkillCategoryDto>> {
    if (paginationParamsDto.itemsPerPage < 1)
      throw new BadRequestException('Invalid number of items per page');
    try {
      const skillCategories =
        await this.skillCategoryService.findManyWithCareers(
          paginationParamsDto.pageNumber,
          paginationParamsDto.itemsPerPage,
        );
      return {
        statusCode: HttpStatus.OK,
        data: skillCategories,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'An unexpected situation ocurred',
        { cause: error },
      );
    }
  }

  @Get('career/:careerName')
  @SessionNotRequired()
  @Allowed('all')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'The list of skill categories was succesfully obtained',
  })
  @ApiBadRequestResponse({
    description: 'Invalid number of items per page requested',
  })
  @ApiInternalServerErrorResponse({
    description: 'An unexpected situation ocurred',
  })
  async findManyByCareerName(
    @Param('careerName') careerName: string,
    @Query() paginationParamsDto: PaginationParamsDto,
  ): Promise<PaginatedResponseDto<SkillCategoryDto>> {
    if (paginationParamsDto.itemsPerPage < 1)
      throw new BadRequestException('Invalid number of items per page');
    try {
      const skillCategories =
        await this.skillCategoryService.findManyByCareerName(
          careerName,
          paginationParamsDto.pageNumber,
          paginationParamsDto.itemsPerPage,
        );
      return {
        statusCode: HttpStatus.OK,
        data: skillCategories,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'An unexpected situation ocurred',
        { cause: error },
      );
    }
  }

  @Get(':name')
  @SessionNotRequired()
  @Allowed('all')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Skill category was succesfully found' })
  @ApiNotFoundResponse({
    description: 'The skill category with the requested name was not found',
  })
  @ApiInternalServerErrorResponse({
    description: 'An unexpected situation ocurred',
  })
  async findOne(
    @Param('name') name: string,
  ): Promise<ResponseDto<SkillCategoryDto>> {
    const skillCategory = await this.skillCategoryService.findOne(name);
    if (!skillCategory)
      throw new NotFoundException(
        `There is no skill category with the given \`name\` (${name})`,
      );
    return {
      statusCode: HttpStatus.OK,
      data: skillCategory,
    };
  }

  @Put(':name')
  @Allowed('admin')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Skill category was succesfully updated' })
  @ApiNotFoundResponse({
    description: 'The Skill category with the requested name was not found',
  })
  @ApiBadRequestResponse({
    description: 'Already exist a skill category with the given name',
  })
  @ApiInternalServerErrorResponse({
    description: 'An unexpected situation ocurred',
  })
  async update(
    @Param('name') name: string,
    @Body() updateSkillCategoryDto: UpdateSkillCategoryDto,
  ): Promise<ResponseDto<SkillCategoryDto>> {
    try {
      const updatedSkillCategory = await this.skillCategoryService.update(
        name,
        updateSkillCategoryDto,
      );
      return {
        statusCode: HttpStatus.OK,
        data: updatedSkillCategory,
      };
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

  @Delete(':name')
  @Allowed('admin')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Skill category was succesfully delete' })
  @ApiNotFoundResponse({
    description: 'The skill category with the requested name was not found',
  })
  @ApiInternalServerErrorResponse({
    description: 'An unexpected situation ocurred',
  })
  async remove(
    @Param('name') name: string,
  ): Promise<ResponseDto<SkillCategoryDto>> {
    try {
      const deletedSkillCategory = await this.skillCategoryService.remove(name);
      return {
        statusCode: HttpStatus.OK,
        data: deletedSkillCategory,
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
