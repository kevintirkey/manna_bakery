import React, { useState } from 'react';

const AdminPortal = ({ productList, handleAddProduct }) => {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productImage, setProductImage] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    const newProduct = {
      id: productList.length + 1,
      name: productName,
      price: parseFloat(productPrice),
      image: productImage
    };

    handleAddProduct(newProduct); // Call the function passed from App.js to add the new product

    // Clear input fields
    setProductName('');
    setProductPrice('');
    setProductImage('');
  };

  return (
    <div>
      <h2>Admin Portal - Add Products</h2>
      <form onSubmit={handleAdd}>
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          placeholder="Product Name"
          required
        />
        <input
          type="number"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
          placeholder="Product Price"
          required
        />
        <input
          type="text"
          value={productImage}
          onChange={(e) => setProductImage(e.target.value)}
          placeholder="Product Image URL"
          required
        />
        <button type="submit">Add Product</button>
      </form>

      <div>
        <h3>Product List</h3>
        <ul>
          {productList.map((product) => (
            <li key={product.id}>
              {product.name} - ${product.price}{' '}
              <img src={product.image} alt={product.name} width="50" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminPortal;
