import { SessionSerializer } from './serializer';
import { GoogleStrategy } from './google.strategy';
import { AuthService } from './google.service';
import { AuthController } from './google.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/UserEntity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, SessionSerializer],
  exports: [AuthService],
})
export class AuthModule {}
