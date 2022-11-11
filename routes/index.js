var express = require('express');
var router = express.Router();
require('dotenv').config();
const stripe = require("stripe")(process.env.STRIPE_KEY);

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send(`hello world ${process.env.test}`)
});
const calculateOrderAmount = (items) => {
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
