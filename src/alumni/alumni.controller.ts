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
  Query,
} from '@nestjs/common';
import { AlumniService } from './alumni.service';
import { CreateAlumniDto } from './dto/create-alumni.dto';
import { UpdateAlumniDto } from './dto/update-alumni.dto';
import { ResponseDto } from 'src/common/dto/response.dto';
import { AlumniDto } from './dto/alumni.dto';
import { plainToInstance } from 'class-transformer';
import {
  AlreadyExistsError,
  NotFoundError,
} from 'src/common/errors/service.error';
import { RandomPaginationParamsDto } from 'src/common/dto/random-pagination-params.dto';
import { RandomlyPagedResponseDto } from 'src/common/dto/randomly-paged-response.dto';
import { FilteredRandomPaginationParams } from './dto/filtered-random-pagination-params.dto';

@Controller('alumni')
export class AlumniController {
  constructor(private readonly alumniService: AlumniService) {}

  @Post()
  async create(
    @Body() createAlumniDto: CreateAlumniDto,
  ): Promise<ResponseDto<AlumniDto>> {
    try {
      let createdAlumni = await this.alumniService.create(createAlumniDto);
      let createdAlumniDto = plainToInstance(AlumniDto, createdAlumni, {
        excludeExtraneousValues: true,
      });

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
  async findPageRandomly(
    @Query() randomPaginationParamsDto: RandomPaginationParamsDto,
  ): Promise<RandomlyPagedResponseDto<AlumniDto>> {
    let alumniRandomPage = await this.alumniService.findPageRandomly(
      randomPaginationParamsDto,
    );
    let alumniDtoRandomPage = {
      ...alumniRandomPage,
      items: alumniRandomPage.items.map((alumni) =>
        plainToInstance(AlumniDto, alumni, {
          excludeExtraneousValues: true,
        }),
      ),
    };

    return {
      statusCode: HttpStatus.OK,
      data: alumniDtoRandomPage,
    };
  }

  @Get('filter')
  async findPageRandomlyFiltered(
    @Query() filteredRandomPaginationParams: FilteredRandomPaginationParams,
  ): Promise<RandomlyPagedResponseDto<AlumniDto>> {
    let alumniRandomPage = await this.alumniService.findPageRandomlyFiltered(
      filteredRandomPaginationParams,
    );
    let alumniDtoRandomPage = {
      ...alumniRandomPage,
      items: alumniRandomPage.items,
    };

    return {
      statusCode: HttpStatus.OK,
      data: alumniDtoRandomPage,
    };
  }

  @Get(':email')
  async findOne(
    @Param('email') email: string,
  ): Promise<ResponseDto<AlumniDto>> {
    let alumni = await this.alumniService.findOne(email);

    if (!alumni) {
      throw new NotFoundException(
        `There is no soft skill with the given \`email\` (${email})`,
        {},
      );
    }
    let alumniDto = plainToInstance(AlumniDto, alumni, {
      excludeExtraneousValues: true,
    });

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
      let updatedAlumni = await this.alumniService.update(
        email,
        updateAlumniDto,
      );
      let updatedAlumniDto = plainToInstance(AlumniDto, updatedAlumni, {
        excludeExtraneousValues: true,
      });

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
      let removedAlumniDto = plainToInstance(AlumniDto, removedAlumni, {
        excludeExtraneousValues: true,
      });

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
