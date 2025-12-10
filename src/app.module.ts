import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'], // 本地开发用
      ignoreEnvFile: process.env.NODE_ENV === 'production', // 生产环境（App Runner）只用环境变量
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: () => ({
        type: 'mysql',
        host: process.env.DB_HOST, // nest-mysql-nz.mysql.database.azure.com
        port: Number(process.env.DB_PORT) || 3306,
        username: process.env.DB_USER, // nest_user@nest-mysql-nz
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE, // blog
        autoLoadEntities: true,
        synchronize: true, // 之后上生产可以改成 false
        ssl: {
          rejectUnauthorized: false, // Azure MySQL 需要 SSL，否则会拒绝
        },
      }),
    }),

    PostsModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
