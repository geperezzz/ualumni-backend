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
  UseGuards,
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
import { RandomlyPagedResponseDto } from 'src/common/dto/randomly-paged-response.dto';
import { PermissionsGuard } from 'src/permissions/permissions.guard';
import { SessionAuthGuard } from 'src/auth/session/session.guard';
import { Allowed } from 'src/permissions/allowed-roles.decorator';
import { SessionNotRequired } from 'src/auth/session/session-not-required.decorator';
import { SessionUser } from 'src/auth/session/session-user.decorator';
import { User } from 'prisma/ualumni/client';
import { FilterRandomPaginationParamsDto } from './dto/filter-random-pagination-params.dto';
import { ApiTags } from '@nestjs/swagger';
import { Alumni } from './alumni.type';

@ApiTags('Alumni')
@Controller('alumni')
@UseGuards(SessionAuthGuard, PermissionsGuard)
export class AlumniController {
  constructor(private readonly alumniService: AlumniService) {}

  @Post()
  @Allowed('admin')
  async create(
    @Body() createAlumniDto: CreateAlumniDto,
  ): Promise<ResponseDto<Alumni>> {
    try {
      let createdAlumni = await this.alumniService.create(createAlumniDto);

      return {
        statusCode: HttpStatus.CREATED,
        data: createdAlumni,
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
  @Allowed('admin', 'visitor')
  async findPageRandomly(
    @Query() filterRandomPaginationParamsDto: FilterRandomPaginationParamsDto,
    @SessionUser() user: User
  ): Promise<RandomlyPagedResponseDto<Alumni | AlumniDto>> {
    let alumniRandomPage = await this.alumniService.findPageRandomly(
      filterRandomPaginationParamsDto,
    );

    if (user) {
      return {
        statusCode: HttpStatus.OK,
        data: alumniRandomPage,
      };
    }

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

  @Get('resume')
  @SessionNotRequired()
  @Allowed('admin', 'visitor')
  async findPageWithResumeRandomly(
    @Query() filterRandomPaginationParamsDto: FilterRandomPaginationParamsDto,
    @SessionUser() user: User
  ): Promise<RandomlyPagedResponseDto<Alumni | AlumniDto>> {
    let alumniWithResumeRandomPage = await this.alumniService.findPageWithResumeRandomly(
      filterRandomPaginationParamsDto,
    );
    
    if (user) {
      return {
        statusCode: HttpStatus.OK,
        data: alumniWithResumeRandomPage,
      };  
    }

    let alumniWithResumeDtoRandomPage = {
      ...alumniWithResumeRandomPage,
      items: alumniWithResumeRandomPage.items.map((alumni) =>
        plainToInstance(AlumniDto, alumni, {
          excludeExtraneousValues: true,
        }),
      ),
    };

    return {
      statusCode: HttpStatus.OK,
      data: alumniWithResumeDtoRandomPage,
    };
  }

  @Get('me')
  @Allowed('alumni')
  async findMe(@SessionUser() user: User): Promise<ResponseDto<AlumniDto>> {
    let alumni = await this.alumniService.findOne(user.email);

    if (!alumni) {
      throw new NotFoundException(
        `There is no alumni with the given \`email\` (${user.email})`,
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

  @Get(':email')
  @SessionNotRequired()
  @Allowed('admin', 'visitor')
  async findOne(
    @Param('email') email: string,
    @SessionUser() user: User
  ): Promise<ResponseDto<Alumni | AlumniDto>> {
    let alumni = await this.alumniService.findOne(email);

    if (!alumni) {
      throw new NotFoundException(
        `There is no alumni with the given \`email\` (${email})`,
        {},
      );
    }

    if (user) {
      return {
        statusCode: HttpStatus.OK,
        data: alumni,
      };
    }

    let alumniDto = plainToInstance(AlumniDto, alumni, {
      excludeExtraneousValues: true,
    });

    return {
      statusCode: HttpStatus.OK,
      data: alumniDto,
    };
  }

  @Patch('me')
  @Allowed('alumni')
  async updateMe(
    @SessionUser() user: User,
    @Body() updateAlumniDto: UpdateAlumniDto,
  ): Promise<ResponseDto<AlumniDto>> {
    try {
      let updatedAlumni = await this.alumniService.update(
        user.email,
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

  @Patch(':email')
  @Allowed('admin')
  async update(
    @Param('email') email: string,
    @Body() updateAlumniDto: UpdateAlumniDto,
  ): Promise<ResponseDto<Alumni>> {
    try {
      let updatedAlumni = await this.alumniService.update(
        email,
        updateAlumniDto,
      );

      return {
        statusCode: HttpStatus.CREATED,
        data: updatedAlumni,
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

  @Delete('me')
  @Allowed('alumni')
  async removeMe(@SessionUser() user: User): Promise<ResponseDto<AlumniDto>> {
    try {
      let removedAlumni = await this.alumniService.remove(user.email);
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

  @Delete(':email')
  @Allowed('admin')
  async remove(@Param('email') email: string): Promise<ResponseDto<Alumni>> {
    try {
      let removedAlumni = await this.alumniService.remove(email);

      return {
        statusCode: HttpStatus.CREATED,
        data: removedAlumni,
      };
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new NotFoundException(error.message, { cause: error });
      }
      throw error;
    }
  }
}
