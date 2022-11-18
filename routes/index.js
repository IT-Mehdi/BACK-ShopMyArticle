var express = require('express');
var router = express.Router();
require('dotenv').config();
const stripe = require("stripe")(process.env.STRIPE_KEY);

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send(`hello world ${process.env.test}`)
});

router.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 9999,// 99,99€
    description:"Programme sportif designé et créer par la coach Zoé Amalys",
    currency: "eur",
    receipt_email:"mehdi.bouchbouk@student.vinci.be",
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
