import { Request, Response } from 'express';
import Stripe from 'stripe';

export default class SubscriptionController {
    public async createSubscription(req: Request, res: Response) {

        const stripe = new Stripe(`${process.env.STRIPE_API_KEY}`, { apiVersion: '2022-11-15' });

        try {

            const customer = await stripe.customers.create({
                name: 'Monojit Saha',
                email: 'monojeetsaha1993@gmail.com',
                source: req.body.token.id,
                address: {
                    line1: req.body.billing_address_line1.trim(),
                    line2: req.body.billing_address_line2.trim(),
                    city: req.body.billing_address_city.trim(),
                    state: req.body.billing_address_state.trim(),
                    postal_code: req.body.billing_address_zip.trim()
                }
            })

            await stripe.subscriptions.create({
                customer: customer.id,
                items: [
                    { price: req.body.price_id },
                ],
            });

            res.status(200).send({
                message: true
            })


        } catch (error: any) {
            return res.status(500).send({ message: error.message })
        }
    }
}