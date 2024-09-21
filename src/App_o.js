import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Container, Navbar, Nav } from 'react-bootstrap';
import './App.css';
import SocialMedia from './components/SocialMedia';
import Footer from './components/Footer';
import OrderOnline from './components/OrderOnline';
import AdminPortal from './components/AdminPortal';
import Checkout from './components/Checkout';
import { products as initialProducts } from './data/Products'; // Import initial products data
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [cart, setCart] = useState([]); // Cart state
  const [productList, setProductList] = useState(initialProducts); // Shared product list state

  const handleClearCart = () => {
    setCart([]);
  };

  // Function to add a new product from AdminPortal
  const handleAddProduct = (newProduct) => {
    setProductList([...productList, newProduct]);
  };

  return (
    <Router>
      <div className="App">
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <Navbar.Brand href="/">Manna Holy Wheat</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
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
              element={<AdminPortal productList={productList} handleAddProduct={handleAddProduct} />} 
            />
            
            <Route 
              path="/checkout" 
              element={<Checkout cart={cart} handleClearCart={handleClearCart} />} 
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
