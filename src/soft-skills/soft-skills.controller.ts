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
} from '@nestjs/common';
import { SoftSkillsService } from './soft-skills.service';
import { CreateSoftSkillDto } from './dto/create-soft-skill.dto';
import { UpdateSoftSkillDto } from './dto/update-soft-skill.dto';
import { SoftSkillDto } from './dto/soft-skill.dto';
import { ResponseDto } from 'src/common/dto/response.dto';
import {
  AlreadyExistsError,
  NotFoundError,
} from 'src/common/error/service.error';

@Controller('soft-skills')
export class SoftSkillsController {
  constructor(private readonly softSkillsService: SoftSkillsService) {}

  @Post()
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
  async findAll(): Promise<ResponseDto<SoftSkillDto[]>> {
    let softSkills = await this.softSkillsService.findAll();
    return {
      statusCode: HttpStatus.OK,
      data: softSkills,
    };
  }

  @Get(':name')
  async findOne(
    @Param('name') name: string,
  ): Promise<ResponseDto<SoftSkillDto>> {
    let softSkill = await this.softSkillsService.findOne(name);

    if (!softSkill) {
      throw new NotFoundException(
        `There is no soft skill with the given \`name\` (${name})`,
      );
    }

    return {
      statusCode: HttpStatus.OK,
      data: softSkill,
    };
  }

  @Put(':name')
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
