import { createConnection } from "mysql2/promise";
import 'dotenv/config'

export const connectionDb = await createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE
})