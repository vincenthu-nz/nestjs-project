import { UserEntity } from '../user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  createToken(user: Partial<UserEntity>) {
    return this.jwtService.sign(user);
  }

  login(user: Partial<UserEntity>) {
    const token = this.createToken({
      id: user.id,
      username: user.username,
      role: user.role,
    });

    return { token, user };
  }
}
