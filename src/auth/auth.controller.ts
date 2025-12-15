import { AuthGuard } from '@nestjs/passport';
import {
  ClassSerializerInterceptor,
  Controller,
  Post,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UserEntity } from '../user/entities/user.entity';
import { LoginAuthDto } from './dto/login-auth.dto';
import { Response } from 'express';

export interface RequestWithUser extends Request {
  user: UserEntity;
}

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({ type: LoginAuthDto })
  @UseGuards(AuthGuard('local'))
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('login')
  login(
    @Req() req: RequestWithUser,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { token, user } = this.authService.login(req.user);

    // Set the token in an HttpOnly Cookie
    res.cookie('access_token', token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return user;
  }

  @Post('logout')
  @UseGuards(AuthGuard('jwt'))
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access_token'); // clean HttpOnly Cookie
    return {
      code: 0,
      message: 'OK',
      data: null,
    };
  }
}
