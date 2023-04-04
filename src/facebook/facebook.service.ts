import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { Repository } from 'typeorm';
import jwt from 'jsonwebtoken';
import { UserEntity } from 'src/UserEntity';

@Injectable()
export class FacebookService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly authGoogleRepository: Repository<UserEntity>,
  ) {}

  async validateUser(data: {
    email: string;
    firstName: string;
    lastName: string;
  }) {
    const user = await this.authGoogleRepository.findOneBy({
      email: data.email,
    });
    if (user) return user;
    const newUser = this.authGoogleRepository.create(data);
    return await this.authGoogleRepository.save(newUser);
  }

  facebookLogin(req, res) {
    try {
      if (!req.user) {
        return 'No user from facebook';
      }
      return {
        message: 'User information from facebook',
        data: req.user,
      };
    } catch (error) {
      return error;
    }
  }

  async findUser(id: string) {
    const user = await this.authGoogleRepository.findOneBy({ id });
    return user;
  }
}
