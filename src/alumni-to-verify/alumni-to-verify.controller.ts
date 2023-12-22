import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, BadRequestException } from '@nestjs/common';
import { AlumniToVerifyService } from './alumni-to-verify.service';
import { CreateAlumniToVerifyDto } from './dto/create-alumni-to-verify.dto';
import { UpdateAlumniToVerifyDto } from './dto/update-alumni-to-verify.dto';
import { SessionNotRequired } from 'src/auth/session/session-not-required.decorator';
import { Allowed } from 'src/permissions/allowed-roles.decorator';
import { ApiTags } from '@nestjs/swagger';
import { ResponseDto } from 'src/common/dto/response.dto';
import { AlumniToVerify } from 'prisma/ualumni/client';
import { AlreadyExistsError } from 'src/common/errors/service.error';

@ApiTags('Alumni to Verify')
@Controller('alumni-to-verify')
export class AlumniToVerifyController {
  constructor(private readonly alumniToVerifyService: AlumniToVerifyService) {}

  @Post()
  @SessionNotRequired()
  @Allowed('admin', 'visitor')
  async create(
    @Body() createAlumniDto: CreateAlumniToVerifyDto,
  ): Promise<ResponseDto<AlumniToVerify>> {
    try {
      let createdAlumni = await this.alumniToVerifyService.create(createAlumniDto);

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
}
