import Stripe from "stripe";
const stripe = new Stripe(`${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`);
import { getSession } from "@auth0/nextjs-auth0";

export default async function handler(req, res) {

  const session = getSession(req, res);
  const user = session?.user;
  // console.log(user);

  // if the user has an account, their email account will be automatically filled in and they also will have an profile page to view the orders
  if (user) {

    const stripeId = user['http://localhost:3000/stripe_customer_id']

    if (req.method === 'POST') {
      try {

        // create checkout session
        const session = await stripe.checkout.sessions.create({
          submit_type: 'pay',
          mode: 'payment',
          customer: stripeId,
          payment_method_types: ['card'],
          shipping_address_collection: {
            allowed_countries: ['US', 'CA', 'GB', 'DE', 'JP', 'BR']
          },
          allow_promotion_codes: true,
          shipping_options: [
            { shipping_rate: 'shr_1MQuiyLnc5SlqYDwH56lc3bT' },
            { shipping_rate: 'shr_1MQv1NLnc5SlqYDwJWI0neyc' }
          ],
          line_items: req.body.map(item => {
            return {
              price_data: {
                currency: 'usd',
                product_data: {
                  name: item.title,
                  images: [item.image.data.attributes.formats.thumbnail.url]
                },
                unit_amount: item.price * 100,
              },
              adjustable_quantity: {
                enabled: true,
                minimum: 1,
              },
              quantity: item.quantity
            }
          }),

          // bring users to the success or failed page
          success_url: `${req.headers.origin}/success?&session_id={CHECKOUT_SESSION_ID}`, // 'session_id={CHECKOUT_SESSION_ID}' which contains the user's order information is passed to the success page & .jsx file
          cancel_url: `${req.headers.origin}/canceled`,

        });
        res.status(200).json(session);

      } catch (error) {
        res.status(error.statusCode || 500).json(error.message);
      }
    }

  } else { // else users who don't have an account can still purchase products but will have to enter their email address and they will not have access to a profile page which shows their orders
    if (req.method === 'POST') {
      try {

        // create checkout session
        const session = await stripe.checkout.sessions.create({
          submit_type: 'pay',
          mode: 'payment',
          payment_method_types: ['card'],
          shipping_address_collection: {
            allowed_countries: ['US', 'CA', 'GB', 'DE', 'JP', 'BR']
          },
          allow_promotion_codes: true,
          shipping_options: [
            { shipping_rate: 'shr_1MQuiyLnc5SlqYDwH56lc3bT' },
            { shipping_rate: 'shr_1MQv1NLnc5SlqYDwJWI0neyc' }
          ],
          line_items: req.body.map(item => {
            return {
              price_data: {
                currency: 'usd',
                product_data: {
                  name: item.title,
                  images: [item.image.data.attributes.formats.thumbnail.url]
                },
                unit_amount: item.price * 100,
              },
              adjustable_quantity: {
                enabled: true,
                minimum: 1,
              },
              quantity: item.quantity
            }
          }),

          // bring users to the success or failed page
          success_url: `${req.headers.origin}/success?&session_id={CHECKOUT_SESSION_ID}`, // 'session_id={CHECKOUT_SESSION_ID}' which contains the user's order information is passed to the success page & .jsx file
          cancel_url: `${req.headers.origin}/canceled`,

        });
        res.status(200).json(session);

      } catch (error) {
        res.status(error.statusCode || 500).json(error.message);
      }
    }
  }





}