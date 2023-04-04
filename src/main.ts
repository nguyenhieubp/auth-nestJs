import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';
import * as passport from 'passport';
import * as cookieSession from 'cookie-session';
// somewhere in your initialization file
// somewhere in your initialization file

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  // app.setGlobalPrefix('api');

  app.use(cookieParser());
  app.use(
    session({
      secret: process.env.SECRET_SESSION,
      saveUninitialized: false,
      resave: false,
      cookie: {
        httpOnly: true,
        maxAge: 300000,
      },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(3000);
}
bootstrap();
