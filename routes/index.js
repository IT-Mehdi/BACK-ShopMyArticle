// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
const Stripe = require('stripe');
const express = require('express');
const router = express.Router();
require('dotenv').config();
const stripe = Stripe(process.env.STRIPE_KEY);

const YOUR_DOMAIN = 'http://localhost:3000';

router.post("/create-payment-intent", async (req, res) => {
  const email = req.body.email;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 9999,// 99,99€
    description:"Programme sportif designé et créer par la coach Zoé Amalys",
    currency: "eur",
    receipt_email:email,
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
    billing_address_collection: 'auto',
    shipping_address_collection: {
      allowed_countries: ['US', 'CA','FR','BE'],
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
    success_url: `${YOUR_DOMAIN}?success=true`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`,
  });

  res.json({url: session.url});
});

module.exports = router;