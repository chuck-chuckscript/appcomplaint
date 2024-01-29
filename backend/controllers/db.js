
import mysql from 'mysql2/promise';
import dotenv from 'dotenv'
dotenv.config();


const db = mysql.createPool({
    host: process.env.SERVER_HOST,
    port: process.env.DATABASE_PORT,
    database: process.env.DATABASE_NAME,
    user: process.env.SERVER_LOGIN,
    password: process.env.SERVER_PASS
})



export default db;
