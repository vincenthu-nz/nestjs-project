import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import {
  ExtractJwt,
  Strategy,
  StrategyOptionsWithoutRequest,
} from 'passport-jwt';
import { Request } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { UserEntity } from '../user/entities/user.entity';

type JwtPayload = {
  id: string;
  username: string;
  role: string;
  iat?: number;
  exp?: number;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          const auth = req.headers.authorization;
          if (auth?.startsWith('Bearer ')) return auth.slice(7);
          return req.cookies?.['access_token'];
        },
      ]),
      secretOrKey: configService.get<string>('SECRET'),
      ignoreExpiration: false,
    } as StrategyOptionsWithoutRequest);
  }

  async validate(payload: JwtPayload) {
    const user = await this.userRepository.findOne({
      where: { id: payload.id },
      select: ['id', 'username', 'role'],
    });

    if (!user) {
      throw new UnauthorizedException('token invalid or user not exists');
    }

    return user;
  }
}
