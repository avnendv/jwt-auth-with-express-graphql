import 'dotenv/config'

export const PORT = process.env.PORT || 6000
export const PORT_CLIENT = process.env.PORT_CLIENT || 6001
export const DB_TYPE = process.env.DB_TYPE || 'postgres'
export const DB_HOST = process.env.DB_HOST || 'localhost'
export const DB_PORT = process.env.DB_PORT || 5432
export const DB_USER_NAME = process.env.DB_USER_NAME || 'postgres'
export const DB_PASSWORD = process.env.DB_PASSWORD || '123123'
export const DB_DATABASE_NAME = process.env.DB_DATABASE_NAME || 'jwt-auth'
