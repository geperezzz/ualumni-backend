import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  BadRequestException,
  InternalServerErrorException,
  HttpCode,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
  NotFoundException,
  Put,
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
import { UpdateRelatedCareersDto } from './dto/update-related-careers.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('skill-category')
@Controller('skill-category')
export class SkillCategoryController {
  constructor(private readonly skillCategoryService: SkillCategoryService) {}

  @Post()
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
  @ApiOkResponse({
    description: 'The list of skill categories was succesfully obtained',
  })
  @ApiBadRequestResponse({
    description: 'Invalid number of items per page requested',
  })
  @ApiInternalServerErrorResponse({
    description: 'An unexpected situation ocurred',
  })
  async findMany(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('perPage', new DefaultValuePipe(10), ParseIntPipe) perPage: number,
  ): Promise<PaginatedResponseDto<SkillCategoryDto>> {
    if (perPage < 1)
      throw new BadRequestException('Invalid number of items per page');
    try {
      const skillCategories = await this.skillCategoryService.findMany(
        page,
        perPage,
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
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('perPage', new DefaultValuePipe(10), ParseIntPipe) perPage: number,
  ): Promise<PaginatedResponseDto<SkillCategoryDto>> {
    if (perPage < 1)
      throw new BadRequestException('Invalid number of items per page');
    try {
      const skillCategories =
        await this.skillCategoryService.findManyByCareerName(
          careerName,
          page,
          perPage,
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

  @Patch(':name/careers')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Related careers was succesfully updated' })
  @ApiNotFoundResponse({
    description: 'The career/s with the requested name/s was not found',
  })
  @ApiBadRequestResponse({
    description: 'There is no career/s with the given name/s',
  })
  @ApiInternalServerErrorResponse({
    description: 'An unexpected situation ocurred',
  })
  async updateRelatedCareers(
    @Param('name') name: string,
    @Body() updateRelatedCareersDto: UpdateRelatedCareersDto,
  ): Promise<ResponseDto<SkillCategoryDto>> {
    try {
      const updatedSkillCategory =
        await this.skillCategoryService.updateRelatedCareers(
          name,
          updateRelatedCareersDto,
        );
      return {
        statusCode: HttpStatus.OK,
        data: updatedSkillCategory,
      };
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new NotFoundException(error.message, { cause: error });
      }
      if (error instanceof ForeignKeyError) {
        throw new BadRequestException(error.message, { cause: error });
      }
      throw new InternalServerErrorException(
        'An unexpected situation ocurred',
        { cause: error },
      );
    }
  }

  @Delete(':name')
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
