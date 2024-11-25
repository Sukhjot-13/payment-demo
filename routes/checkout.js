// Import the Express library and initialize a router
const express = require('express');
const router = express.Router();

// Import the Stripe library and initialize it with the secret key from environment variables
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Define a POST route to handle the creation of Stripe Checkout sessions
router.post('/', async (req, res) => {
  // Extract the items array from the request body
  const { items } = req.body;

  // Map the items array to create line items for the Stripe Checkout session
  const lineItems = items.map(item => ({
    price_data: {
      currency: 'usd', // Specify the currency for the transaction
      product_data: {
        name: item.name, // Use the product name for display in Stripe Checkout
      },
      unit_amount: item.price, // Specify the unit price in cents
    },
    quantity: item.quantity, // Specify the quantity of the item
  }));

  try {
    // Create a Stripe Checkout session with the provided line items
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'], // Accept card payments
      mode: 'payment', // Specify the mode of payment (e.g., one-time payment)
      line_items: lineItems, // Include the line items in the session
      success_url: `${req.headers.origin}/success`, // URL to redirect to on successful payment
      cancel_url: `${req.headers.origin}/cancel`, // URL to redirect to if payment is canceled
    });

    // Respond with the URL of the created Checkout session
    res.json({ url: session.url });
  } catch (error) {
    // Log the error to the console for debugging purposes
    console.error(error);

    // Respond with a 500 status code and an error message
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Export the router so it can be used in other parts of the application
module.exports = router;
