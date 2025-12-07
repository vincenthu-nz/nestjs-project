// data-source.ts
import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'nest_user',
  password: 'VH520Avril',
  database: 'blog',
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/migrations/*.ts'],
});
