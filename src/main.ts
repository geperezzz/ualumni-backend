import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
import * as passport from 'passport';
import { PrismaService } from './prisma/prisma.service';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.enableCors({ origin: configService.getOrThrow('FRONTEND_URL') });

  const prismaClient = app.get(PrismaService);
  app.use(
    session({
      name: 'ualumni-session',
      secret: configService.getOrThrow('SESSION_COOKIE_SECRET'),
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: parseInt(configService.getOrThrow('SESSION_COOKIE_MAX_AGE_MS')),
        httpOnly: configService.getOrThrow('SESSION_COOKIE_HTTP_ONLY'),
        sameSite: configService.getOrThrow('SESSION_COOKIE_SAME_SITE'),
      },
      store: new PrismaSessionStore(prismaClient, {
        checkPeriod: parseInt(configService.getOrThrow(
          'SESSION_COOKIE_STORE_CHECK_PERIOD_MS',
        )),
      }),
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(configService.getOrThrow('BACKEND_PORT'), configService.getOrThrow('BACKEND_HOSTNAME'));
}
bootstrap();
