import { Module } from '@nestjs/common';
import { AlumniToVerifyService } from './alumni-to-verify.service';
import { AlumniToVerifyController } from './alumni-to-verify.controller';
import { UalumniDbModule } from 'src/ualumni-db/ualumni-db.module';
import { UcabDbModule } from 'src/ucab-db/ucab-db.module';
import { AlumniService } from 'src/alumni/alumni.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
  imports: [
    UalumniDbModule,
    UcabDbModule,
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.getOrThrow('MAIL_HOST'),
          secure: false,
          auth: {
            user: configService.getOrThrow('MAIL_USER'),
            pass: configService.getOrThrow('MAIL_PASS'),
          },
        },
        template: {
          dir: join(__dirname, '/templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService]
    }),
  ],
  controllers: [AlumniToVerifyController],
  providers: [AlumniToVerifyService, AlumniService],
  exports: [AlumniToVerifyService]
})
export class AlumniToVerifyModule {}
