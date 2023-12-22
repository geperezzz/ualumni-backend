import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { LocalAuthGuard } from './local/local.guard';
import { Request } from 'express';
import { RegisterDto } from './dto/register.dto';
import { AlumniService } from 'src/alumni/alumni.service';
import { plainToInstance } from 'class-transformer';
import { AlumniDto } from 'src/alumni/dto/alumni.dto';
import {
  AlreadyExistsError,
  NotFoundError,
  TokenError,
} from 'src/common/errors/service.error';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { Allowed } from 'src/permissions/allowed-roles.decorator';
import { PermissionsGuard } from 'src/permissions/permissions.guard';
import { SessionAuthGuard } from './session/session.guard';
import { AlumniToVerifyService } from 'src/alumni-to-verify/alumni-to-verify.service';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private alumniService: AlumniService,
    private alumniToVerifyService: AlumniToVerifyService,
  ) {}

  @Post('register')
  @UseGuards(PermissionsGuard)
  @Allowed('visitor')
  async register(@Query('token') token: string, @Query('email') email: string) {
    try {
      let alumniToVerify = await this.alumniToVerifyService.findOne(email);
      if (token != alumniToVerify?.token) {
        throw new TokenError('Invalid token');
      }

      let createdAlumni = await this.alumniService.create(alumniToVerify);
      let createdAlumniDto = plainToInstance(AlumniDto, createdAlumni, {
        excludeExtraneousValues: true,
      });
      await this.alumniToVerifyService.remove(email);

      return {
        statusCode: HttpStatus.CREATED,
      };
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new BadRequestException(error.message, { cause: error });
      }
      if (error instanceof AlreadyExistsError) {
        throw new BadRequestException(error.message, { cause: error });
      }
      if (error instanceof TokenError) {
        throw new BadRequestException(error.message, { cause: error });
      }
      throw error;
    }
  }

  /*@Post('register')
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
      if (error instanceof NotFoundError) {
        throw new BadRequestException(error.message, { cause: error });
      }
      if (error instanceof AlreadyExistsError) {
        throw new BadRequestException(error.message, { cause: error });
      }
      throw error;
    }
  }*/

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
    return new Promise((resolve) =>
      request.logout(() =>
        resolve({
          statusCode: HttpStatus.OK,
          message: 'Successfully logged out',
        }),
      ),
    );
  }
}
