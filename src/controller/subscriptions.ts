import { Request, Response } from 'express';
import Stripe from 'stripe';
import { query } from '../database/db';

export default class SubscriptionController {
    public async createSubscription(req: Request, res: Response) {

        const stripe = new Stripe(`${process.env.STRIPE_API_KEY}`, { apiVersion: '2022-11-15' });

        try {

            const customer = await stripe.customers.create({
                name: 'Monojit Saha',
                email: 'monojeetsaha1993@gmail.com',
                source: req.body.token,
                address: {
                    line1: req.body.billing_address_line1.trim(),
                    line2: req.body.billing_address_line2.trim(),
                    city: req.body.billing_address_city.trim(),
                    state: req.body.billing_address_state.trim(),
                    postal_code: req.body.billing_address_zip.trim()
                }
            })

            const subscription = await stripe.subscriptions.create({
                customer: customer.id,
                items: [
                    { price: req.body.price_id },
                ],
            });

            let payload = {
                subscription_id: subscription.id,
                product_id: subscription.items.data[0].price.product,
                receipt_url: '',
                initial_charge_id: '',
                customer_id: customer.id,
                start_date: subscription.current_period_start,
                end_date: subscription.current_period_end,
            }

            console.log(JSON.stringify(payload))

            const queryRes: any = await query(`SELECT public.fn_manage_subscription($1)`, [JSON.stringify(payload)]);

            if (queryRes?.rows[0]['fn_manage_subscription'].msg_id === 1) {
                res.status(200).send({ message: 'subscription created successfully' })
            } else {
                await stripe.customers.del(customer.id);
                res.status(500).send({ message: 'subscription can\'t be created' })
            }




        } catch (error: any) {
            res.status(500).send({ message: error.message })
        }
    }
}