import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';

const jwtModule = JwtModule.registerAsync({
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    return {
      secret: configService.get('SECRET', 'defaultSecretKey'),
      signOptions: { expiresIn: '4h' },
    };
  },
});

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), jwtModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
