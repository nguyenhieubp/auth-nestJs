import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { Repository } from 'typeorm';
import { UserEntity } from './UserEntity';
import { JwtService } from '@nestjs/jwt';

//Cách 1
import { ConfigService } from '@nestjs/config';

//Cách 2
// import * as dotenv from 'dotenv';
// dotenv.config();

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(UserEntity)
    readonly authRepository: Repository<UserEntity>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  async getHello(req: Request) {
    try {
      const { accessToken } = req.cookies;
      const payload: { id: string } = await this.jwtService.verifyAsync(
        accessToken,
        {
          secret: this.configService.get<string>('SECRET_JWT_APP'),
        },
      );
      const user = await this.authRepository.findOneById(payload.id);

      return {
        massage: 'hello world',
        user,
      };
    } catch (error) {
      return error;
    }
  }
}
