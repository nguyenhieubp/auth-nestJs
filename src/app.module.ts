import { AuthModule } from './google/google.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { MulterModule } from '@nestjs/platform-express';
import { FacebookModule } from './facebook/facebook.module';
import { UserEntity } from './UserEntity';
import { ConfigModule } from '@nestjs/config';
// import * as dotenv from 'dotenv';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    MulterModule.register({ dest: 'uploads' }),
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    FacebookModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: process.env.USER_NAME,
      password: process.env.PASSWORD_DATABASE,
      database: process.env.DATABASE,
      entities: [UserEntity],
      // synchronize: true,
    }),
    PassportModule.register({ session: true }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
