import React from 'react';
import { Button } from 'react-bootstrap';

const Checkout = ({ cart, handleClearCart, setCart }) => {
  const handleCheckout = () => {
    alert('Thank you for your purchase!');
    handleClearCart(); // Optionally, clear the cart after checkout
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleIncreaseQuantity = (index) => {
    const updatedCart = cart.map((item, idx) =>
      idx === index ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
  };

  const handleDecreaseQuantity = (index) => {
    const updatedCart = cart.map((item, idx) =>
      idx === index && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    );
    setCart(updatedCart);
  };

  const handleRemoveItem = (index) => {
    const updatedCart = cart.filter((_, idx) => idx !== index);
    setCart(updatedCart);
  };

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
                <Button variant="secondary" onClick={() => handleIncreaseQuantity(index)}>+</Button>
                <Button variant="secondary" onClick={() => handleDecreaseQuantity(index)}>-</Button>
                <Button variant="danger" onClick={() => handleRemoveItem(index)}>Remove</Button>
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
