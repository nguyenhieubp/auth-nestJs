import { Module } from '@nestjs/common';
import { FacebookService } from './facebook.service';
import { FacebookController } from './facebook.controller';
import { FacebookStrategy } from './facebook.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionSerializer } from './serializer';
import { JwtModule } from '@nestjs/jwt';
import { UserEntity } from 'src/UserEntity';

//Cách 1
// import { ConfigService } from '@nestjs/config';

//Cách 2
// import * as dotenv from 'dotenv';
// dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      global: true,
      secret: process.env.SECRET_JWT_APP,
      signOptions: { expiresIn: '3d' },
    }),
  ],
  providers: [FacebookService, FacebookStrategy, SessionSerializer],
  controllers: [FacebookController],
})
export class FacebookModule {}
