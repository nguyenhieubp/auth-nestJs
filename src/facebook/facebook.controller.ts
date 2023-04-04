import { Redirect } from '@nestjs/common/decorators';
import {
  Controller,
  Get,
  UseGuards,
  HttpStatus,
  Req,
  Param,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { FacebookService } from './facebook.service';
import { FacebookGuard } from './guards';
import { JwtService } from '@nestjs/jwt';

@Controller('facebook')
export class FacebookController {
  constructor(
    private readonly facebookService: FacebookService,
    private jwtService: JwtService,
  ) {}

  @Get('')
  @UseGuards(FacebookGuard)
  async facebookLogin(): Promise<any> {
    return HttpStatus.OK;
  }

  @Get('redirect')
  @UseGuards(FacebookGuard)
  async facebookLoginRedirect(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const { data } = this.facebookService.facebookLogin(req, res);
    const token = await this.jwtService.signAsync({ id: data.user.id });
    res.cookie('accessToken', token);
    res.redirect('/');
  }

  @Get('hello')
  async hello(@Req() req: Request): Promise<any> {
    return req.user;
  }
}
