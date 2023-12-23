import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { LocalAuthStrategy } from './local/local.strategy';
import { SessionSerializer } from './session/session.serializer';
import { UsersModule } from 'src/users/users.module';
import { LocalAuthGuard } from './local/local.guard';
import { SessionAuthGuard } from './session/session.guard';
import { AlumniModule } from 'src/alumni/alumni.module';
import { AlumniToVerifyService } from 'src/alumni-to-verify/alumni-to-verify.service';
import { AlumniToVerifyModule } from 'src/alumni-to-verify/alumni-to-verify.module';
import { AuthService } from './auth.service';
import { MailingModule } from 'src/mailing/mailing.module';

@Module({
  imports: [
    AlumniModule,
    UsersModule,
    PassportModule.register({
      session: true,
    }),
    AlumniToVerifyModule,
    MailingModule
  ],
  controllers: [AuthController],
  providers: [
    LocalAuthStrategy,
    LocalAuthGuard,
    SessionAuthGuard,
    SessionSerializer,
    AuthService,
  ],
})
export class AuthModule {}
