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
  UseGuards,
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
import { SessionUser } from 'src/auth/session/session-user.decorator';
import { User } from 'prisma/ualumni/client';
import { SessionAuthGuard } from 'src/auth/session/session.guard';
import { PermissionsGuard } from 'src/permissions/permissions.guard';
import { Allowed } from 'src/permissions/allowed-roles.decorator';
import { SessionNotRequired } from 'src/auth/session/session-not-required.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('graduations')
@Controller('alumni')
@UseGuards(SessionAuthGuard, PermissionsGuard)
export class GraduationsController {
  constructor(private readonly graduationsService: GraduationsService) {}

  @Post('me/graduations')
  @Allowed('alumni')
  async createMine(
    @SessionUser() user: User,
    @Body() createGraduationDto: CreateGraduationDto,
  ): Promise<ResponseDto<GraduationDto>> {
    try {
      let createdGraduation = await this.graduationsService.create(
        user.email,
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

  @Post(':alumniEmail/graduations')
  @Allowed('admin')
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

  @Get('me/graduations')
  @Allowed('alumni')
  async findMyPage(
    @SessionUser() user: User,
    @Query() paginationParamsDto: PaginationParamsDto,
  ): Promise<PagedResponseDto<GraduationDto>> {
    let graduationsPage = await this.graduationsService.findPage(
      user.email,
      paginationParamsDto,
    );
    return {
      statusCode: HttpStatus.OK,
      data: graduationsPage,
    };
  }

  @Get(':alumniEmail/graduations')
  @SessionNotRequired()
  @Allowed('admin', 'visitor')
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

  @Get('me/graduations/:careerName')
  @Allowed('alumni')
  async findMine(
    @SessionUser() user: User,
    @Param('careerName') careerName: string,
  ): Promise<ResponseDto<GraduationDto>> {
    let graduation = await this.graduationsService.findOne(
      user.email,
      careerName,
    );

    if (!graduation) {
      throw new NotFoundException(
        `Alumni with \`email\` equal to \`${user.email}\` has not graduated from a career with \`name\` equal to \`${careerName}\``,
      );
    }

    return {
      statusCode: HttpStatus.OK,
      data: graduation,
    };
  }

  @Get(':alumniEmail/graduations/:careerName')
  @SessionNotRequired()
  @Allowed('admin', 'visitor')
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

  @Patch('me/graduations/:careerName')
  @Allowed('alumni')
  async updateMine(
    @SessionUser() user: User,
    @Param('careerName') careerName: string,
    @Body() updateGraduationDto: UpdateGraduationDto,
  ): Promise<ResponseDto<GraduationDto>> {
    let updatedGraduation = await this.graduationsService.update(
      user.email,
      careerName,
      updateGraduationDto,
    );
    return {
      statusCode: HttpStatus.OK,
      data: updatedGraduation,
    };
  }

  @Patch(':alumniEmail/graduations/:careerName')
  @Allowed('admin')
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

  @Delete('me/graduations/:careerName')
  @Allowed('alumni')
  async removeMine(
    @SessionUser() user: User,
    @Param('careerName') careerName: string,
  ): Promise<ResponseDto<GraduationDto>> {
    let removedGraduation = await this.graduationsService.remove(
      user.email,
      careerName,
    );
    return {
      statusCode: HttpStatus.OK,
      data: removedGraduation,
    };
  }

  @Delete(':alumniEmail/graduations/:careerName')
  @Allowed('admin')
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
