const express = require('express');
const products = require('./data/products.js');

const app = express();

app.get('/', (req, res) => {
  res.send('API is Running...')
})

// API Route for Products
app.get('/api/products', (req, res) => {
  res.json(products)
})

// API Route to get single product by Id
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p._id === req.params.id)
  res.json(product)
})


app.listen(5000, console.log('Server running on PORT 5000'))
