import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  username: string;

  @Column({ length: 100, nullable: true })
  nickname?: string;

  @Exclude()
  @Column()
  password: string;

  @Column({ nullable: true })
  avatar?: string;

  @Column({ nullable: true })
  email?: string;

  @Column('simple-enum', {
    enum: ['root', 'author', 'visitor'],
    default: 'visitor',
  })
  role: string;

  @Column({
    name: 'create_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createTime: Date;

  @Column({
    name: 'update_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateTime: Date;
}
