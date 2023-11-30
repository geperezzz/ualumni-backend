import {
  BadRequestException,
  Body,
  Controller,
  HttpStatus,
  Post,
  Req,
  Session,
  UseGuards,
} from '@nestjs/common';
import { LocalAuthGuard } from './local/local.guard';
import { SessionAuthGuard } from './session/session.guard';
import { Request } from 'express';
import { RegisterDto } from './dto/register.dto';
import { AlumniService } from 'src/alumni/alumni.service';
import { plainToInstance } from 'class-transformer';
import { AlumniDto } from 'src/alumni/dto/alumni.dto';
import { AlreadyExistsError } from 'src/common/errors/service.error';

@Controller('auth')
export class AuthController {
  constructor(private alumniService: AlumniService) {}

  @Post('register')
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

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(): Record<string, any> {
    return {
      statusCode: HttpStatus.OK,
      message: 'Successfully logged in',
    };
  }

  @UseGuards(SessionAuthGuard)
  @Post('logout')
  logout(@Req() request: Request) {
    request.session.destroy(() => {});
    return {
      statusCode: HttpStatus.OK,
      message: 'Successfully logged out',
    };
  }
}
