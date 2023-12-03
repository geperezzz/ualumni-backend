import { Controller, Query, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, BadRequestException, InternalServerErrorException, NotFoundException, ParseIntPipe, DefaultValuePipe } from '@nestjs/common';
import { TechnicalSkillService } from './technical-skill.service';
import { CreateTechnicalSkillDto } from './dto/create-technical-skill.dto';
import { UpdateTechnicalSkillDto } from './dto/update-technical-skill.dto';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ResponseDto } from 'src/common/dto/response.dto';
import { TechnicalSkillDto } from './dto/technical-skill.dto';
import { AlreadyExistsError, ForeignKeyError, NotFoundError } from 'src/common/error/service.error';
import { PaginatedResponseDto } from 'src/common/dto/paginated-response.dto';

@ApiTags('technical-skill')
@Controller('skillCategory/:skillCategory/technical-skill')
export class TechnicalSkillController {
  constructor(private readonly technicalSkillService: TechnicalSkillService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    description: 'technical skill was succesfully created',
  })
  @ApiBadRequestResponse({
    description: 'Already exists a technical skill with the given name',
  })
  @ApiInternalServerErrorResponse({
    description: 'An unexpected situation ocurred',
  })
  async create(
    @Param('skillCategory') categoryName: string,
    @Body() createTechnicalSkillDto: CreateTechnicalSkillDto,
  ): Promise<ResponseDto<TechnicalSkillDto>> {
    try {
      const data = await this.technicalSkillService.create(
        categoryName,
        createTechnicalSkillDto,
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
    description: 'The list of technical skills was succesfully obtained',
  })
  @ApiBadRequestResponse({
    description: 'Invalid number of items per page requested',
  })
  @ApiInternalServerErrorResponse({
    description: 'An unexpected situation ocurred',
  })
  async findMany(
    @Param('skillCategory') categoryName: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('per-page', new DefaultValuePipe(10), ParseIntPipe) perPage: number,
  ): Promise<PaginatedResponseDto<TechnicalSkillDto>> {
    if (perPage < 1)
      throw new BadRequestException('Invalid number of items per page');
    try {
      const paginationResponse = await this.technicalSkillService.findMany(
        categoryName,
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

  @Get('/:name')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Technical skill was succesfully found',
  })
  @ApiNotFoundResponse({
    description:
      'The technical skill for the requested alumni was not found',
  })
  @ApiInternalServerErrorResponse({
    description: 'An unexpected situation ocurred',
  })
  async findOne(
    @Param('skillCategory') categoryName: string,
    @Param('name') name: string,
  ) {
    const technicalSkill = await this.technicalSkillService.findOne(
      name,
      categoryName,
    );

    if (!technicalSkill)
      throw new NotFoundException(
        `There is no technical skill with the given \`name\` (${name}) in the given \`categoryName\` (${categoryName})`,
      );
    return {
      statusCode: HttpStatus.OK,
      data: technicalSkill,
    };
  }

  @Patch('/:name')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Technical skill was succesfully updated',
  })
  @ApiNotFoundResponse({
    description:
      'The technical skill with the requested name was not found',
  })
  @ApiBadRequestResponse({
    description: 'Already exists a technical skill with the given title',
  })
  @ApiInternalServerErrorResponse({
    description: 'An unexpected situation ocurred',
  })
  async update(
    @Param('skillCategory') categoryName: string,
    @Param('name') name: string,
    @Body() updateTechnicalSkillDto: UpdateTechnicalSkillDto,
  ) {
    try {
      const updatedTechnicalSkill =
        await this.technicalSkillService.update(
          name,
          categoryName,
          updateTechnicalSkillDto,
        );
      return { statusCode: HttpStatus.OK, data: updatedTechnicalSkill };
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
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Technical skill was succesfully deleted',
  })
  @ApiNotFoundResponse({
    description:
      'The technical skill with the requested name was not found',
  })
  @ApiInternalServerErrorResponse({
    description: 'An unexpected situation ocurred',
  })
  async remove(
    @Param('skillCategory') categoryName: string,
    @Param('name') name: string,
  ): Promise<ResponseDto<TechnicalSkillDto>> {
    try {
      const deletedTechnicalSkill =
        await this.technicalSkillService.remove(
          name,
          categoryName,
        );
      return {
        statusCode: HttpStatus.OK,
        data: deletedTechnicalSkill,
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