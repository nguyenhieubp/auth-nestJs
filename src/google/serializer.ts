import { Inject, Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { UserEntity } from '../UserEntity';
import { AuthService } from './google.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly authService: AuthService) {
    super();
  }

  serializeUser(auth: UserEntity, done: Function) {
    // console.log('Serializer User =============== ');
    done(null, auth);
  }

  async deserializeUser(payload: any, done: Function) {
    const user = await this.authService.findUser(payload.id);
    // console.log('Deserialize User  ================= ');
    // console.log(user);
    return user ? done(null, user) : done(null, null);
  }
}
