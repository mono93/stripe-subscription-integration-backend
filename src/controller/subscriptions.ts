import { Request, Response } from 'express';
import Stripe from 'stripe';

export default class SubscriptionController {
    public async createSubscription(req: Request, res: Response) {

        const stripe = new Stripe(`${process.env.STRIPE_API_KEY}`, { apiVersion: '2022-11-15' });

        try {

            const customer = await stripe.customers.create({
                name: req.body.name,
                source: req.body.source,
                address: {
                    line1: req.body.line1,
                    line2: req.body.line2,
                    city: req.body.city,
                    state: req.body.state,
                    postal_code: req.body.postal_code
                }
            })

            await stripe.subscriptions.create({
                customer: customer.id,
                items: [
                    {
                        plan: req.body.planId
                    }
                ]
            });


        } catch (error: any) {
            return res.status(500).send({ message: error.message })
        }
    }
}