import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginAuthDto {
  @ApiProperty({ description: 'username' })
  @IsString()
  username: string;

  @ApiProperty({ description: 'password' })
  @IsString()
  password: string;
}
