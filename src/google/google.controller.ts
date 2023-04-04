import { GoogleAuthGuard } from './guards';
import { Redirect, Req, Res } from '@nestjs/common/decorators';
import { Request, Response } from 'express';
import { AuthService } from './google.service';
import { Controller, Get, Post, UseGuards } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  login() {}

  @Get('google/callback')
  @Redirect('/')
  @UseGuards(GoogleAuthGuard)
  googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    const { data }: any = this.authService.googleLogin(req, res);
    res.cookie('accessToken', data.id);
  }

  @Get('status')
  user(@Req() request: Request) {
    // console.log('DATA : =================', request.user);
    if (request.user) {
      return { msg: 'Authenticated' };
    } else {
      return { msg: 'Not Authenticated' };
    }
  }
}
