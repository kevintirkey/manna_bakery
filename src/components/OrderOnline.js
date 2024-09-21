// import React, { useState } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';

const OrderOnline = ({ productList, cart, setCart }) => {
  const handleAddToCart = (product) => {
    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
      // Increase quantity if product already exists
      setCart(cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      // Add new product to cart
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  return (
    <Container>
      <Row>
        <Col md={8}>
          <h2 className="my-4">Order Online</h2>
          <Row>
            {productList.length > 0 ? (
              productList.map((product) => (
                <Col md={4} key={product.id} className="mb-4">
                  <Card className="shadow-sm">
                    <Card.Img variant="top" src={product.image} />
                    <Card.Body>
                      <Card.Title>{product.name}</Card.Title>
                      <Card.Text>Price: ${product.price}</Card.Text>
                      <Button variant="secondary" onClick={() => handleAddToCart(product)}>
                        Add to Cart
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <p>No products available</p>
            )}
          </Row>
        </Col>

        {/* Cart on the right side */}
        <Col md={4}>
          <div className="cart-box">
            <h3>Your Cart</h3>
            {cart.length > 0 ? (
              cart.map((item, index) => (
                <div key={index}>
                  <p>{item.name} - ${item.price} x {item.quantity}</p>
                </div>
              ))
            ) : (
              <p>Cart is empty</p>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default OrderOnline;
