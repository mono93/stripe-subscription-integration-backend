import { Pool } from "pg";

const pool = new Pool({
    host: '',
    database: '',
    user: '',
    password: '',
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