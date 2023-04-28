// const express = require('express');
// const axios = require('axios');

// const app = express();
// const port = 3000;

// app.get('/api/products', (req, res) => {
//   axios.get('https://api.escuelajs.co/api/v1/products')
//     .then(response => {
//       res.send(response.data);
//     })
//     .catch(error => {
//       res.status(500).send(error);
//     });
// });

// app.listen(port, () => {
//   console.log(`Server started at http://localhost:${port}`);
// });

const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/myapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(error => {
  console.log('Error connecting to MongoDB', error);
});

// Define a schema for products
const productSchema = new mongoose.Schema({
  id: Number,
  name: String,
  price: Number
});

// Create a model for products
const Product = mongoose.model('Product', productSchema);

// Route to save product data to MongoDB
app.get('/save-products', async (req, res) => {
  try {
    const response = await axios.get('https://fakestoreapi.com/products');
    const products = response.data;
    for (const product of products) {
      const newProduct = new Product({
        id: product.id,
        name: product.title,
        price: product.price
      });
      await newProduct.save();
    }
    res.send('Products saved to MongoDB');
  } catch (error) {
    console.error('Error saving products to MongoDB', error);
    res.status(500).send('Error saving products to MongoDB');
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

