import React from 'react';
import { Button } from 'react-bootstrap';

const Checkout = ({ cart, handleClearCart }) => {
  const handleCheckout = () => {
    alert('Thank you for your purchase!');
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      {cart.length > 0 ? (
        <div>
          {cart.map((item, index) => (
            <div key={index} className="checkout-item">
              <p>
                {item.name} - ${item.price} x {item.quantity}
              </p>
              <div className="cart-buttons">
                <Button variant="secondary">+</Button>
                <Button variant="secondary">-</Button>
                <Button variant="danger">Remove</Button>
              </div>
            </div>
          ))}
          <h3>Total: ${total.toFixed(2)}</h3>
          <Button variant="success" onClick={handleCheckout}>
            Complete Purchase
          </Button>
          <Button variant="warning" onClick={handleClearCart}>
            Clear Cart
          </Button>
        </div>
      ) : (
        <p>Your cart is empty</p>
      )}
    </div>
  );
};

export default Checkout;