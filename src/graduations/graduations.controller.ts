import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpStatus,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { GraduationsService } from './graduations.service';
import { CreateGraduationDto } from './dto/create-graduation.dto';
import { UpdateGraduationDto } from './dto/update-graduation.dto';
import { PagedResponseDto } from 'src/common/dto/paged-response.dto';
import { GraduationDto } from './dto/graduation.dto';
import { PaginationParamsDto } from 'src/common/dto/pagination-params.dto';
import { ResponseDto } from 'src/common/dto/response.dto';
import {
  AlreadyExistsError,
  NotFoundError,
} from 'src/common/errors/service.error';

@Controller('alumni/:alumniEmail/graduations')
export class GraduationsController {
  constructor(private readonly graduationsService: GraduationsService) {}

  @Post()
  async create(
    @Param('alumniEmail') alumniEmail: string,
    @Body() createGraduationDto: CreateGraduationDto,
  ): Promise<ResponseDto<GraduationDto>> {
    try {
      let createdGraduation = await this.graduationsService.create(
        alumniEmail,
        createGraduationDto,
      );
      return {
        statusCode: HttpStatus.CREATED,
        data: createdGraduation,
      };
    } catch (error) {
      if (error instanceof AlreadyExistsError) {
        throw new BadRequestException(error.message, { cause: error });
      }
      if (error instanceof NotFoundError) {
        throw new NotFoundException(error.message, { cause: error });
      }
      throw error;
    }
  }

  @Get()
  async findPage(
    @Param('alumniEmail') alumniEmail: string,
    @Query() paginationParamsDto: PaginationParamsDto,
  ): Promise<PagedResponseDto<GraduationDto>> {
    let graduationsPage = await this.graduationsService.findPage(
      alumniEmail,
      paginationParamsDto,
    );
    return {
      statusCode: HttpStatus.OK,
      data: graduationsPage,
    };
  }

  @Get(':careerName')
  async findOne(
    @Param('alumniEmail') alumniEmail: string,
    @Param('careerName') careerName: string,
  ): Promise<ResponseDto<GraduationDto>> {
    let graduation = await this.graduationsService.findOne(
      alumniEmail,
      careerName,
    );

    if (!graduation) {
      throw new NotFoundException(
        `Alumni with \`email\` equal to \`${alumniEmail}\` has not graduated from a career with \`name\` equal to \`${careerName}\``,
      );
    }

    return {
      statusCode: HttpStatus.OK,
      data: graduation,
    };
  }

  @Patch(':careerName')
  async update(
    @Param('alumniEmail') alumniEmail: string,
    @Param('careerName') careerName: string,
    @Body() updateGraduationDto: UpdateGraduationDto,
  ): Promise<ResponseDto<GraduationDto>> {
    let updatedGraduation = await this.graduationsService.update(
      alumniEmail,
      careerName,
      updateGraduationDto,
    );
    return {
      statusCode: HttpStatus.OK,
      data: updatedGraduation,
    };
  }

  @Delete(':careerName')
  async remove(
    @Param('alumniEmail') alumniEmail: string,
    @Param('careerName') careerName: string,
  ): Promise<ResponseDto<GraduationDto>> {
    let removedGraduation = await this.graduationsService.remove(
      alumniEmail,
      careerName,
    );
    return {
      statusCode: HttpStatus.OK,
      data: removedGraduation,
    };
  }
}
