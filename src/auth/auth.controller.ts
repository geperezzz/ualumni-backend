import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { LocalAuthGuard } from './local/local.guard';
import { Request } from 'express';
import { RegisterDto } from './dto/register.dto';
import { AlumniService } from 'src/alumni/alumni.service';
import { plainToInstance } from 'class-transformer';
import { AlumniDto } from 'src/alumni/dto/alumni.dto';
import { AlreadyExistsError } from 'src/common/errors/service.error';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { Allowed } from 'src/permissions/allowed-roles.decorator';
import { PermissionsGuard } from 'src/permissions/permissions.guard';
import { SessionAuthGuard } from './session/session.guard';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private alumniService: AlumniService) {}

  @Post('register')
  @UseGuards(PermissionsGuard)
  @Allowed('visitor')
  async register(@Body() registerDto: RegisterDto) {
    try {
      let createdAlumni = await this.alumniService.create(registerDto);
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

  @Post('login')
  @UseGuards(LocalAuthGuard, PermissionsGuard)
  @Allowed('all')
  login(@Body() _loginDto: LoginDto): Record<string, any> {
    return {
      statusCode: HttpStatus.OK,
      message: 'Successfully logged in',
    };
  }

  @Get('login-status')
  @UseGuards(SessionAuthGuard, PermissionsGuard)
  @Allowed('admin', 'alumni')
  amILoggedIn() {
    return {
      statusCode: HttpStatus.OK,
      message: 'You are logged in',
    };
  }

  @Post('logout')
  @UseGuards(SessionAuthGuard, PermissionsGuard)
  @Allowed('admin', 'alumni')
  logout(@Req() request: Request) {
    request.session.destroy(() => {});
    return {
      statusCode: HttpStatus.OK,
      message: 'Successfully logged out',
    };
  }
}
