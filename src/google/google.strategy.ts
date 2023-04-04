import { AuthService } from './google.service';
import { PassportStrategy } from '@nestjs/passport';

import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK,
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any) {
    try {
      const { name, emails } = profile;
      const user = await this.authService.validateUser({
        firstName: name.givenName,
        lastName: name.familyName,
        email: emails[0].value,
      });
      // console.log('Validate');
      // console.log(user);
      return user || null;
    } catch (error) {
      return error;
    }
  }
}
