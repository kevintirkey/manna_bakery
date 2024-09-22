import React, { useEffect, useState } from 'react';

const AdminPortal = () => {
  const [productList, setProductList] = useState([]);
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productImage, setProductImage] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('http://localhost:5000/api/products');
      const data = await response.json();
      setProductList(data);
    };
    fetchProducts();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    const newProduct = {
      name: productName,
      price: parseFloat(productPrice),
      image: productImage,
    };

    if (editingProduct) {
      await fetch(`http://localhost:5000/api/products/${editingProduct.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct),
      });
      setEditingProduct(null);
    } else {
      await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct),
      });
    }

    setProductName('');
    setProductPrice('');
    setProductImage('');
    // Refresh the product list
    const response = await fetch('http://localhost:5000/api/products');
    const data = await response.json();
    setProductList(data);
  };

  const handleEdit = (product) => {
    setProductName(product.name);
    setProductPrice(product.price);
    setProductImage(product.image);
    setEditingProduct(product);
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/products/${id}`, {
      method: 'DELETE',
    });
    const response = await fetch('http://localhost:5000/api/products');
    const data = await response.json();
    setProductList(data);
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
