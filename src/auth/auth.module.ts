import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { LocalAuthStrategy } from './local/local.strategy';
import { SessionSerializer } from './session/session.serializer';
import { UsersModule } from 'src/users/users.module';
import { LocalAuthGuard } from './local/local.guard';
import { SessionAuthGuard } from './session/session.guard';
import { AlumniModule } from 'src/alumni/alumni.module';

@Module({
  imports: [
    AlumniModule,
    UsersModule,
    PassportModule.register({
      session: true,
    }),
  ],
  controllers: [AuthController],
  providers: [
    LocalAuthStrategy,
    LocalAuthGuard,
    SessionAuthGuard,
    SessionSerializer,
  ],
})
export class AuthModule {}
