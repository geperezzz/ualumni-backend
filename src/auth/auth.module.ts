import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AlumniModule } from 'src/alumni/alumni.module';
import { PassportModule } from '@nestjs/passport';
import { LocalAuthStrategy } from './local/local.strategy';
import { SessionSerializer } from './session/session.serializer';

@Module({
  imports: [
    AlumniModule,
    PassportModule.register({
      session: true,
    }),
  ],
  controllers: [AuthController],
  providers: [LocalAuthStrategy, SessionSerializer],
})
export class AuthModule {}
