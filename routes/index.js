var express = require('express');
var router = express.Router();
require('dotenv').config();
const stripe = require("stripe")('sk_test_MgvkTWK1jRG3olSRx9B7Mmxo');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send(`hello world ${process.env.test}`)
});
const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};

router.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "eur",
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

module.exports = router;
