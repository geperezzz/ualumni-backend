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
  Header,
  StreamableFile,
} from '@nestjs/common';
import { ResumeService } from './resume.service';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { ToggleResumeVisibilityDto } from './dto/toggle-resume-visibility.dto';
import { ResponseDto } from 'src/common/dto/response.dto';
import { ResumeDto } from './dto/resume.dto';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { NotFoundError } from 'src/common/errors/service.error';
import { plainToInstance } from 'class-transformer';
import { SessionAuthGuard } from 'src/auth/session/session.guard';
import { PermissionsGuard } from 'src/permissions/permissions.guard';
import { SessionUser } from 'src/auth/session/session-user.decorator';
import { PrismaClient } from '@prisma/client';
import { Allowed } from 'src/permissions/allowed-roles.decorator';
import { SessionNotRequired } from 'src/auth/session/session-not-required.decorator';

@ApiTags('resume')
@Controller('alumni')
@UseGuards(SessionAuthGuard, PermissionsGuard)
export class ResumeController {
  constructor(private readonly resumeService: ResumeService) {}

  @Get('me/resume/pdf')
  @Allowed('alumni')
  @Header('Content-Type', 'application/pdf')
  @Header('Content-Disposition', 'inline; filename=resume.pdf')
  async exportAsPdfMine(@SessionUser() user: PrismaClient): Promise<StreamableFile> {
    try {
      const pdf = await this.resumeService.exportAsPdf(user.email);
      return new StreamableFile(pdf);
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

  @Get(':email/resume/pdf')
  @SessionNotRequired()
  @Allowed('admin', 'visitor')
  @Header('Content-Type', 'application/pdf')
  @Header('Content-Disposition', 'inline; filename=resume.pdf')
  async exportAsPdf(@Param('email') email: string): Promise<StreamableFile> {
    try {
      const pdf = await this.resumeService.exportAsPdf(email);
      return new StreamableFile(pdf);
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
    @SessionUser() user: PrismaClient,
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



@Patch(':email/resume/visibility')
@HttpCode(HttpStatus.OK)
@ApiOkResponse({ description: 'La visibilidad del currículum se actualizó correctamente' })
@ApiNotFoundResponse({
  description: 'No se encontró el currículum del usuario con el email solicitado',
})
@ApiInternalServerErrorResponse({
  description: 'Ocurrió una situación inesperada',
})
async toggleVisibility(
  @Param('email') email: string,
  @Body() toggleResumeVisibilityDto: ToggleResumeVisibilityDto,
): Promise<ResponseDto<ResumeDto>> {
  try {
    const updatedResume = await this.resumeService.toggleVisibility(
      email,
      toggleResumeVisibilityDto,
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
      'Ocurrió una situación inesperada',
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
