import { Inject, Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { FacebookService } from './facebook.service';
import { UserEntity } from 'src/UserEntity';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly facebookService: FacebookService) {
    super();
  }

  serializeUser(auth: UserEntity, done: Function) {
    done(null, auth);
  }

  async deserializeUser(payload: any, done: Function) {
    const user = await this.facebookService.findUser(payload.id);
    return user ? done(null, user) : done(null, null);
  }
}
