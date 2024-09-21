import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Container, Navbar, Nav } from 'react-bootstrap';
import './App.css';
import SocialMedia from './components/SocialMedia';
import Footer from './components/Footer';
import OrderOnline from './components/OrderOnline';
import AdminPortal from './components/AdminPortal';
import Checkout from './components/Checkout';
import { getProducts, addProduct, editProduct, deleteProduct } from './data/Products';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [cart, setCart] = useState([]); // Cart state
  const [productList, setProductList] = useState([]); // Shared product list state

  const handleClearCart = () => {
    setCart([]);
  };

  useEffect(() => {
    setProductList(getProducts());
  }, []);

  // Function to add a new product from AdminPortal
  const handleAddProduct = (newProduct) => {
    addProduct(newProduct);
    setProductList(getProducts());
  };

  const handleEditProduct = (updatedProduct) => {
    editProduct(updatedProduct);
    setProductList(getProducts());
  };

  const handleDeleteProduct = (id) => {
    deleteProduct(id);
    setProductList(getProducts());
  };

  return (
    <Router>
      <div className="App">
        <Navbar className="custom-navbar" expand="lg">
          <Container fluid className="flex-column">
            <Navbar.Brand href="/">Manna The Holy Wheat</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="nav">
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/order">Order Online</Nav.Link>
                <Nav.Link as={Link} to="/admin">Admin Portal</Nav.Link>
                <Nav.Link as={Link} to="/checkout">Checkout</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <main>
          <Routes>
            <Route exact path="/" element={<SocialMedia />} />

            {/* Pass productList and cart to OrderOnline */}
            <Route
              path="/order"
              element={<OrderOnline productList={productList} cart={cart} setCart={setCart} />}
            />

            {/* Pass productList and handleAddProduct to AdminPortal */}
            <Route
              path="/admin"
              element={<AdminPortal 
                productList={productList} 
                handleAddProduct={handleAddProduct} 
                handleEditProduct={handleEditProduct}
                handleDeleteProduct={handleDeleteProduct} 
              />}
            />

            {/* Pass cart and setCart to Checkout */}
            <Route
              path="/checkout"
              element={<Checkout cart={cart} handleClearCart={handleClearCart} setCart={setCart} />}
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
