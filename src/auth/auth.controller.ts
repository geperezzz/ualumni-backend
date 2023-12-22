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
import { plainToInstance } from 'class-transformer';
import { AlumniDto } from 'src/alumni/dto/alumni.dto';
import {
  AlreadyExistsError,
  NotFoundError,
} from 'src/common/errors/service.error';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { Allowed } from 'src/permissions/allowed-roles.decorator';
import { PermissionsGuard } from 'src/permissions/permissions.guard';
import { SessionAuthGuard } from './session/session.guard';
import { VerifyRegistrationParamsDto } from './dto/verify-registration-params.dto';
import { AuthService } from './auth.service';
import { ResponseDto } from 'src/common/dto/response.dto';
import { InvalidCredentialsError } from './errors/auth.error';
import { MessageResponseDto } from 'src/common/dto/message-response.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
  ) {}

  @Post('register')
  @UseGuards(PermissionsGuard)
  @Allowed('visitor')
  async register(@Body() registerDto: RegisterDto): Promise<MessageResponseDto> {
    try {
      await this.authService.register(registerDto);

      return {
        statusCode: HttpStatus.CREATED,
        message: 'Successfully registered. Verification pending',
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
  }

  @Post('verify-registration')
  @UseGuards(PermissionsGuard)
  @Allowed('visitor')
  async verifyRegistration(@Query() verifyRegistrationParamsDto: VerifyRegistrationParamsDto): Promise<ResponseDto<AlumniDto>> {
    try {
      const createdAlumni = await this.authService.verifyRegistration(verifyRegistrationParamsDto);
      const createdAlumniDto = plainToInstance(AlumniDto, createdAlumni, {
        excludeExtraneousValues: true,
      });
      
      return {
        statusCode: HttpStatus.OK,
        data: createdAlumniDto,
      };
    } catch (error) {
      if (error instanceof InvalidCredentialsError) {
        throw new BadRequestException(error.message, { cause: error });
      }
      throw error;
    }
  }

  @Post('login')
  @UseGuards(LocalAuthGuard, PermissionsGuard)
  @Allowed('all')
  login(@Body() _loginDto: LoginDto): MessageResponseDto {
    return {
      statusCode: HttpStatus.OK,
      message: 'Successfully logged in',
    };
  }

  @Get('login-status')
  @UseGuards(SessionAuthGuard, PermissionsGuard)
  @Allowed('admin', 'alumni')
  amILoggedIn(): MessageResponseDto {
    return {
      statusCode: HttpStatus.OK,
      message: 'You are logged in',
    };
  }

  @Post('logout')
  @UseGuards(SessionAuthGuard, PermissionsGuard)
  @Allowed('admin', 'alumni')
  async logout(@Req() request: Request): Promise<MessageResponseDto> {
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
