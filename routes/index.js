// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
const Stripe = require('stripe');
const express = require('express');
const router = express.Router();
require('dotenv').config();
const stripe = Stripe(process.env.STRIPE_KEY);

const YOUR_DOMAIN = 'http://localhost:3000';


router.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    customer_email: req.body.email,
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
          unit_amount: 9900,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}/success`,
    cancel_url: `${YOUR_DOMAIN}/cancel`,
  });

  res.json({url: session.url});
});

module.exports = router;