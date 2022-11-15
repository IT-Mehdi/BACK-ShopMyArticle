// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
const Stripe = require('stripe');
const express = require('express');
const router = express.Router();
require('dotenv').config();
const stripe = Stripe(process.env.STRIPE_KEY);

const YOUR_DOMAIN = 'http://localhost:4242';

console.log("helooo")

router.post('/create-checkout-session', async (req, res) => {
  console.log("prout")
  const session = await stripe.checkout.sessions.create({
    customer_email: 'customer@example.com',
    submit_type: 'donate',
    billing_address_collection: 'auto',
    shipping_address_collection: {
      allowed_countries: ['US', 'CA','FR','BE'],
    },
    line_items: [
      {
        price_data: {
          currency: 'eur',
          product_data: {
            name: 'zebi cart',
          },
          unit_amount: 2000,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}?success=true`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`,
  });

  res.redirect(303, session.url);
});

module.exports = router;