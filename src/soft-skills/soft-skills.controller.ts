import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpStatus,
  NotFoundException,
  BadRequestException,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { SoftSkillsService } from './soft-skills.service';
import { CreateSoftSkillDto } from './dto/create-soft-skill.dto';
import { UpdateSoftSkillDto } from './dto/update-soft-skill.dto';
import { SoftSkillDto } from './dto/soft-skill.dto';
import { ResponseDto } from 'src/common/dto/response.dto';
import {
  AlreadyExistsError,
  NotFoundError,
} from 'src/common/errors/service.error';
import { PaginationParamsDto } from 'src/common/dto/pagination-params.dto';
import { PagedResponseDto } from 'src/common/dto/paged-response.dto';
import { Allowed } from 'src/permissions/allowed-roles.decorator';
import { SessionAuthGuard } from 'src/auth/session/session.guard';
import { PermissionsGuard } from 'src/permissions/permissions.guard';
import { SessionNotRequired } from 'src/auth/session/session-not-required.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('soft-skills')
@Controller('soft-skills')
@UseGuards(SessionAuthGuard, PermissionsGuard)
export class SoftSkillsController {
  constructor(private readonly softSkillsService: SoftSkillsService) {}

  @Post()
  @Allowed('admin')
  async create(
    @Body()
    createSoftSkillDto: CreateSoftSkillDto,
  ): Promise<ResponseDto<SoftSkillDto>> {
    try {
      let createdSoftSkill =
        await this.softSkillsService.create(createSoftSkillDto);
      return {
        statusCode: HttpStatus.CREATED,
        data: createdSoftSkill,
      };
    } catch (error) {
      if (error instanceof AlreadyExistsError) {
        throw new BadRequestException(error.message, { cause: error });
      }
      throw error;
    }
  }

  @Get()
  @SessionNotRequired()
  @Allowed('all')
  async findPage(
    @Query() paginationParamsDto: PaginationParamsDto,
  ): Promise<PagedResponseDto<SoftSkillDto>> {
    let softSkillsPage =
      await this.softSkillsService.findPage(paginationParamsDto);
    return {
      statusCode: HttpStatus.OK,
      data: softSkillsPage,
    };
  }

  @Get(':name')
  @SessionNotRequired()
  @Allowed('all')
  async findOne(
    @Param('name') name: string,
  ): Promise<ResponseDto<SoftSkillDto>> {
    let softSkill = await this.softSkillsService.findOne(name);

    if (!softSkill) {
      throw new NotFoundException(
        `There is no soft skill with the given \`name\` (${name})`,
        {},
      );
    }

    return {
      statusCode: HttpStatus.OK,
      data: softSkill,
    };
  }

  @Put(':name')
  @Allowed('admin')
  async update(
    @Param('name') name: string,
    @Body()
    updateSoftSkillDto: UpdateSoftSkillDto,
  ): Promise<ResponseDto<SoftSkillDto>> {
    try {
      let updatedSoftSkill = await this.softSkillsService.update(
        name,
        updateSoftSkillDto,
      );
      return {
        statusCode: HttpStatus.OK,
        data: updatedSoftSkill,
      };
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new NotFoundException(error.message, { cause: error });
      }
      if (error instanceof AlreadyExistsError) {
        throw new BadRequestException(error.message, { cause: error });
      }
      throw error;
    }
  }

  @Delete(':name')
  @Allowed('admin')
  async remove(
    @Param('name') name: string,
  ): Promise<ResponseDto<SoftSkillDto>> {
    try {
      let removedSoftSkill = await this.softSkillsService.remove(name);
      return {
        statusCode: HttpStatus.OK,
        data: removedSoftSkill,
      };
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new NotFoundException(error.message, { cause: error });
      }
      throw error;
    }
  }
}
