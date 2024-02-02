import { DataSource } from 'typeorm'
import { User } from '@/entities/User'
import { DB_DATABASE_NAME, DB_HOST, DB_PASSWORD, DB_PORT, DB_TYPE, DB_USER_NAME } from '../env'

export const AppDataSource = new DataSource({
  type: DB_TYPE as 'postgres',
  host: DB_HOST,
  port: +DB_PORT as number,
  username: DB_USER_NAME,
  password: DB_PASSWORD,
  database: DB_DATABASE_NAME,
  synchronize: true,
  logging: true,
  entities: [User],
  subscribers: [],
  migrations: [],
})
