import { IsString, Matches } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Matches(/^[A-Za-z_]{3,20}$/, {
    message: '用户名只能由字母和下划线组成，长度为 3-20 个字符',
  })
  username: string;

  @IsString()
  @Matches(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/,
    {
      message: '密码至少 8 位，必须包含字母、数字和特殊字符',
    },
  )
  password: string;
}
