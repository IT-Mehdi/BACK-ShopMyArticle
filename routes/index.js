const express = require('express');
const router = express.Router();
require('dotenv').config();
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_KEY, { apiVersion: process.env.STRIPE_VERSION });

const YOUR_DOMAIN = 'http://localhost:3000';

router.post("/create-payment-intent", async (req, res) => {
  const email = req.body.email;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 9999,// 99,99€
    description: "Programme sportif designé et créer par la coach Zoé Amalys",
    currency: "eur",
    receipt_email: email,
    payment_method_types: [
      'bancontact',
      'card',
      'sepa_debit',
      'sofort',
    ],
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

router.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    customer_email: req.body.email,
    billing_address_collection: 'auto',
    shipping_address_collection: {
      allowed_countries: ['US', 'CA', 'FR', 'BE'],
    },
    line_items: [
      {
        price_data: {
          currency: 'eur',
          product_data: {
            name: 'Programme WorkoutByAmalys',
          },
          unit_amount: 9999,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}/success`,
    cancel_url: `${YOUR_DOMAIN}/cancel`,
  });

  res.json({ url: session.url });
});


router.post('/webhook', express.raw({ type: 'application/json' }), (request, response) => {
  const sig = request.headers['stripe-signature'];

  let event;
  const endpointSecret = process.env.STRIPE_WEEBHOOK_KEY;
  
  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }


  response.status(200)
});

module.exports = router;