import React, { useState } from 'react';

const AdminPortal = ({ productList, handleAddProduct, handleEditProduct, handleDeleteProduct }) => {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productImage, setProductImage] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);

  const handleAdd = (e) => {
    e.preventDefault();
    const newProduct = {
      id: editingProduct ? editingProduct.id : productList.length + 1,
      name: productName,
      price: parseFloat(productPrice),
      image: productImage
    };

    if (editingProduct) {
      handleEditProduct(newProduct);
      setEditingProduct(null); // Clear editing state after editing
    } else {
      handleAddProduct(newProduct);
    }

    // Clear input fields
    setProductName('');
    setProductPrice('');
    setProductImage('');
  };

  const handleEdit = (product) => {
    setProductName(product.name);
    setProductPrice(product.price);
    setProductImage(product.image);
    setEditingProduct(product);
  };

  const handleDelete = (id) => {
    handleDeleteProduct(id);
  };

  return (
    <div>
      <h2>Admin Portal - Add/Edit Products</h2>
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
        <button type="submit">{editingProduct ? 'Update Product' : 'Add Product'}</button>
      </form>

      <div>
        <h3>Product List</h3>
        <ul>
          {productList.map((product) => (
            <li key={product.id}>
              {product.name} - ${product.price}{' '}
              <img src={product.image} alt={product.name} width="100" />
              <button onClick={() => handleEdit(product)}>Edit</button>
              <button onClick={() => handleDelete(product.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminPortal;
