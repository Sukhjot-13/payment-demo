const express = require('express');
const router = express.Router();

// Sample products array containing product details (id, name, price, quantity).
const products = [
  { id: 1, name: 'Product A', price: 1000, quantity: 1 }, 
  { id: 2, name: 'Product B', price: 1500, quantity: 1 }, 
  { id: 3, name: 'Product C', price: 2000, quantity: 1 }, 
];

/* 
  GET request to the home page.
*/
router.get('/', (req, res) => {
  res.render('index', { products }); // Render the `index` template with the products data.
});

/* 
  GET request to the success page.
*/
router.get('/success', (req, res) => {
  res.render('success'); 
});

// Export the router so it can be used in other parts of the application.
module.exports = router;
