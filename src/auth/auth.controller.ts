import { AuthGuard } from '@nestjs/passport';
import {
  ClassSerializerInterceptor,
  Controller,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UserEntity } from '../user/entities/user.entity';
import { LoginAuthDto } from './dto/login-auth.dto';

export interface RequestWithUser extends Request {
  user: UserEntity;
}

@ApiTags('验证')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({ type: LoginAuthDto })
  @UseGuards(AuthGuard('local'))
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('login')
  login(@Req() req: RequestWithUser) {
    return this.authService.login(req.user);
  }
}
