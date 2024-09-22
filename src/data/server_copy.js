// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const productsFilePath = path.join(__dirname, 'database/Products.json');

// Load products from JSON file
const loadProducts = () => {
    const data = fs.readFileSync(productsFilePath);
    return JSON.parse(data);
};

// Save products to JSON file
const saveProducts = (products) => {
    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
};

// Get all products
app.get('/api/products', (req, res) => {
    const products = loadProducts();
    res.json(products);
});

// Add a new product
app.post('/api/products', (req, res) => {
    const newProduct = req.body;
    const products = loadProducts();
    newProduct.id = products.length ? products[products.length - 1].id + 1 : 1;
    products.push(newProduct);
    saveProducts(products);
    res.status(201).json(newProduct);
});

// Edit a product
app.put('/api/products/:id', (req, res) => {
    const { id } = req.params;
    const updatedProduct = req.body;
    const products = loadProducts();
    const index = products.findIndex(product => product.id === parseInt(id));
    if (index !== -1) {
        products[index] = { ...products[index], ...updatedProduct };
        saveProducts(products);
        res.json(products[index]);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

// Delete a product
app.delete('/api/products/:id', (req, res) => {
    const { id } = req.params;
    const products = loadProducts();
    const filteredProducts = products.filter(product => product.id !== parseInt(id));
    saveProducts(filteredProducts);
    res.status(204).send();
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
