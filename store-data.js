const mongoose = require('mongoose');
const axios = require('axios');

// connecting to MongoDB server
mongoose.connect('mongodb://localhost:27017/myapp', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(error => {
    console.log('Error connecting to MongoDB', error);
  });

// defining a schema for store data
const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number
});

// creating a model for the products collection
const Product = mongoose.model('Product', productSchema);

// saving product data to MongoDB
axios.get('https://api.escuelajs.co/api/v1/products')
  .then(response => {
    const products = response.data;
    for (let product of products) {
      const newProduct = new Product({
        name: product.name,
        description: product.description,
        price: product.price
      });
      newProduct.save()
        .then(() => {
          console.log('Product saved to MongoDB');
        })
        .catch(error => {
          console.log('Error saving product to MongoDB', error);
        });
    }
  })
  .catch(error => {
    console.log('Error fetching products from API', error);
  });
