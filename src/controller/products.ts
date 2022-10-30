import { Request, Response } from 'express';
import { query } from '../database/db';
import { IProductResponse } from '../model'

export default class ProductController {
    public async showProducts(req: Request, res: Response) {
        try {

            const productResponse: any = await query('SELECT public.fn_product_list()');
            const product: IProductResponse = productResponse.rows[0]['fn_product_list']

            if (product.msg_id === 1) {
                return res.status(200).send({
                    message: product.msg,
                    productDetails: product.product_details,
                    subscriptionDetails: product.subscription_details
                })
            } else {
                return res.status(200).send({ message: 'details fetched sucessfully', productDetails: [], subscriptionDetails: [] })
            }

        } catch (error: any) {
            return res.status(500).send({ message: error.message })
        }
    }
}