import { Request, Response } from 'express'

export default class ProductController {
    public showProducts(req: Request, res: Response) {
        try {
            return res.status(200).send({ message: 'show product' })
        } catch (error: any) {
            return res.status(500).send({ message: error.message })
        }
    }
}