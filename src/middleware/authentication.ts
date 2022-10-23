import { NextFunction, Request, Response } from 'express';
import { SYSTEM_TOKEN } from '../config/config';

export const auth = (req: Request, res: Response, next: NextFunction) => {

    const token = req.header('x-project-at');

    if (!token) {
        return res.status(401).send({ message: 'UnAuthenticated' });
    } else {

        if (token === SYSTEM_TOKEN) {
            next()
        } else {
            return res.status(401).send({ message: 'UnAuthenticated' })
        }
    }
}
