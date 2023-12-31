import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { LocalAuthStrategy } from './local/local.strategy';
import { SessionSerializer } from './session/session.serializer';
import { UsersModule } from 'src/users/users.module';
import { LocalAuthGuard } from './local/local.guard';
import { SessionAuthGuard } from './session/session.guard';
import { AlumniModule } from 'src/alumni/alumni.module';
import { AlumniToVerifyModule } from 'src/alumni-to-verify/alumni-to-verify.module';
import { AuthService } from './auth.service';

@Module({
  imports: [
    AlumniModule,
    UsersModule,
    PassportModule.register({
      session: true,
    }),
    AlumniToVerifyModule,
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
