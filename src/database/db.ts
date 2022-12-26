import { Pool } from "pg";
import * as dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: 5432
})

export const query = (queryText: string, values: any = []) => {
    return new Promise(async (resolve, reject) => {
        let res: any;
        try {
            if (values.length > 0) {
                res = await pool.query(queryText, values);
            } else {
                res = await pool.query(queryText);
            }
            resolve(res)
        } catch (err) {
            reject(err)
        }
    })
}