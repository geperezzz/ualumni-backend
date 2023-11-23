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
  NotFoundException,
} from '@nestjs/common';
import { AlumniService } from './alumni.service';
import { CreateAlumniDto } from './dto/create-alumni.dto';
import { UpdateAlumniDto } from './dto/update-alumni.dto';
import { ResponseDto } from 'src/common/dto/response.dto';
import { AlumniDto } from './dto/alumni.dto';
import { plainToClass } from 'class-transformer';
import { AlreadyExistsError, NotFoundError } from 'src/common/error/service.error';

@Controller('alumni')
export class AlumniController {
  constructor(private readonly alumniService: AlumniService) {}

  @Post()
  async create(
    @Body() createAlumniDto: CreateAlumniDto,
  ): Promise<ResponseDto<AlumniDto>> {
    try {
      let createdAlumni = await this.alumniService.create(createAlumniDto);
      let createdAlumniDto = plainToClass(AlumniDto, createdAlumni, { excludeExtraneousValues: true });

      return {
        statusCode: HttpStatus.CREATED,
        data: createdAlumniDto,
      };
    } catch (error) {
      if (error instanceof AlreadyExistsError) {
        throw new BadRequestException(error.message, { cause: error });
      }
      throw error;
    }
  }

  @Get()
  async findAll(): Promise<ResponseDto<AlumniDto[]>> {
    let alumni = await this.alumniService.findAll();
    let alumniDtos = alumni.map((alumni) => {
      let alumniDto = plainToClass(AlumniDto, alumni, { excludeExtraneousValues: true });
      return alumniDto;
    });

    return {
      statusCode: HttpStatus.OK,
      data: alumniDtos,
    };
  }

  @Get(':email')
  async findOne(
    @Param('email') email: string,
  ): Promise<ResponseDto<AlumniDto>> {
    let alumni = await this.alumniService.findOne(email);

    if (!alumni) {
      throw new NotFoundError(
        `There is no soft skill with the given \`email\` (${email})`,
      );
    }
    let alumniDto = plainToClass(AlumniDto, alumni, { excludeExtraneousValues: true });

    return {
      statusCode: HttpStatus.OK,
      data: alumniDto,
    };
  }

  @Patch(':email')
  async update(
    @Param('email') email: string,
    @Body() updateAlumniDto: UpdateAlumniDto,
  ): Promise<ResponseDto<AlumniDto>> {
    try {
      let updatedAlumni = await this.alumniService.update(email, updateAlumniDto);
      let updatedAlumniDto = plainToClass(AlumniDto, updatedAlumni, { excludeExtraneousValues: true });

      return {
        statusCode: HttpStatus.CREATED,
        data: updatedAlumniDto,
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

  @Delete(':email')
  async remove(@Param('email') email: string): Promise<ResponseDto<AlumniDto>> {
    try {
      let removedAlumni = await this.alumniService.remove(email);
      let removedAlumniDto = plainToClass(AlumniDto, removedAlumni, { excludeExtraneousValues: true });

      return {
        statusCode: HttpStatus.CREATED,
        data: removedAlumniDto,
      };
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new NotFoundException(error.message, { cause: error });
      }
      throw error;
    }
  }
}
