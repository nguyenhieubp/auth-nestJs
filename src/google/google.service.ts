import { InjectRepository } from '@nestjs/typeorm';

import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/UserEntity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly authGoogleRepository: Repository<UserEntity>,
  ) {}

  //CREATE USER TO DB
  async validateUser(data: {
    email: string;
    firstName: string;
    lastName: string;
  }) {
    //find user from db
    const user = await this.authGoogleRepository.findOneBy({
      email: data.email,
    });

    //if have user return user
    if (user) return user;

    //if don't have create new user to db
    const newUser = this.authGoogleRepository.create(data);
    return await this.authGoogleRepository.save(newUser);
  }

  async findUser(id: string) {
    const user = await this.authGoogleRepository.findOneBy({ id });
    return user;
  }

  googleLogin(req, res) {
    if (!req.user) {
      return 'No user from google';
    }
    return {
      message: 'User information from google',
      data: req.user,
    };
  }
}
