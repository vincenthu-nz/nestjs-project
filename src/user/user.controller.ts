import { Controller, Post, Body, Req, UseGuards, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RequestWithUser } from '../auth/auth.controller';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOperation({ summary: 'Register' })
  @ApiResponse({ status: 201, type: [UserEntity] })
  @Post('register')
  register(@Body() createUser: CreateUserDto) {
    return this.userService.register(createUser);
  }

  @ApiOperation({ summary: 'Get user info' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get()
  fetchUserInfo(@Req() req: RequestWithUser) {
    return req.user;
  }
}