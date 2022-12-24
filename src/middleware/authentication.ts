import { NextFunction, Request, Response } from 'express';
import * as dotenv from 'dotenv';
dotenv.config();

export const auth = (req: Request, res: Response, next: NextFunction) => {

    const token = req.header('x-project-at');

    if (!token) {
        return res.status(401).send({ message: 'not authorized' });
    } else {

        if (token === process.env.SYSTEM_TOKEN) {
            next()
        } else {
            return res.status(401).send({ message: 'not authorized' })
        }
    }
}
