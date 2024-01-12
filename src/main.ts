import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
import * as passport from 'passport';
import { UalumniDbService } from './ualumni-db/ualumni-db.service';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.enableCors({
    origin: configService.getOrThrow('FRONTEND_URL'),
    credentials: true,
  });

  const prismaClient = app.get(UalumniDbService);
  app.use(
    session({
      name: 'ualumni-session',
      secret: configService.getOrThrow('SESSION_COOKIE_SECRET'),
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: parseInt(configService.getOrThrow('SESSION_COOKIE_MAX_AGE_MS')),
        httpOnly: configService.getOrThrow('SESSION_COOKIE_HTTP_ONLY') === 'true',
        sameSite: configService.getOrThrow('SESSION_COOKIE_SAME_SITE'),
        secure: configService.getOrThrow('SESSION_COOKIE_SECURE') === 'true',
      },
      store: new PrismaSessionStore(prismaClient, {
        checkPeriod: parseInt(
          configService.getOrThrow('SESSION_COOKIE_STORE_CHECK_PERIOD_MS'),
        ),
      }),
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle('UAlumni API')
    .setDescription('API for UAlumni')
    .setVersion('0.1')
    .addTag('UAlumni')
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, swaggerDocument);

  await app.listen(
    configService.getOrThrow('BACKEND_PORT'),
    configService.getOrThrow('BACKEND_HOSTNAME'),
  );
}
bootstrap();
