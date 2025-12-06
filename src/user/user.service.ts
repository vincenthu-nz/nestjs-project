import { UserEntity } from './entities/user.entity';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async register(createUser: CreateUserDto): Promise<UserEntity> {
    const { username } = createUser;

    const existUser = await this.userRepository.findOne({
      where: { username },
    });

    if (existUser) {
      throw new HttpException('用户名已存在', HttpStatus.BAD_REQUEST);
    }

    const newUser = this.userRepository.create(createUser);
    newUser.password = bcrypt.hashSync(createUser.password, 10);

    return await this.userRepository.save(newUser);
  }
}
