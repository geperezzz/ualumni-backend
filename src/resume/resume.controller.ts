import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  BadRequestException,
  NotFoundException,
  InternalServerErrorException,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ResumeService } from './resume.service';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { ResponseDto } from 'src/common/dto/response.dto';
import { ResumeDto } from './dto/resume.dto';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { NotFoundError } from 'src/common/error/service.error';
import { plainToInstance } from 'class-transformer';
import { SessionAuthGuard } from 'src/auth/session/session.guard';
import { PermissionsGuard } from 'src/permissions/permissions.guard';
import { SessionUser } from 'src/auth/session/session-user.decorator';
import { User } from '@prisma/client';
import { Allowed } from 'src/permissions/allowed-roles.decorator';

@ApiTags('resume')
@Controller('alumni')
@UseGuards(SessionAuthGuard, PermissionsGuard)
export class ResumeController {
  constructor(private readonly resumeService: ResumeService) {}

  @Patch('me/resume')
  @Allowed('alumni')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Resume was succesfully updated' })
  @ApiNotFoundResponse({
    description: 'The resume user with the requested email was not found',
  })
  @ApiInternalServerErrorResponse({
    description: 'An unexpected situation ocurred',
  })
  async updateMine(
    @SessionUser() user: User,
    @Body() updateResumeDto: UpdateResumeDto,
  ): Promise<ResponseDto<ResumeDto>> {
    try {
      const updatedResume = await this.resumeService.update(
        user.email,
        updateResumeDto,
      );
      return {
        statusCode: 200,
        data: plainToInstance(ResumeDto, updatedResume, {
          excludeExtraneousValues: true,
        }),
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

  @Patch(':email/resume')
  @Allowed('admin')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Resume was succesfully updated' })
  @ApiNotFoundResponse({
    description: 'The resume user with the requested email was not found',
  })
  @ApiInternalServerErrorResponse({
    description: 'An unexpected situation ocurred',
  })
  async update(
    @Param('email') email: string,
    @Body() updateResumeDto: UpdateResumeDto,
  ): Promise<ResponseDto<ResumeDto>> {
    try {
      const updatedResume = await this.resumeService.update(
        email,
        updateResumeDto,
      );
      return {
        statusCode: 200,
        data: plainToInstance(ResumeDto, updatedResume, {
          excludeExtraneousValues: true,
        }),
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
