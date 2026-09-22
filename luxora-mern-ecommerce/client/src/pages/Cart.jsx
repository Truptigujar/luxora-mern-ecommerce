import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../styles/Cart.css";

export default function Cart() {
  const { items, updateQuantity, removeFromCart, totalPrice } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="page-wrap cart-empty">
        <p className="eyebrow">Your Bag</p>
        <h1>Your cart is feeling light</h1>
        <p>Explore our collections and add something you love.</p>
        <Link to="/" className="btn-primary">
          Continue Shopping →
        </Link>
      </div>
    );
  }

  return (
    <div className="page-wrap cart-page">
      <div className="container">
        <p className="eyebrow">Your Bag</p>
        <h1 className="cart-title">Shopping Cart</h1>

        <div className="cart-layout">
          <div className="cart-items">
            {items.map((item) => (
              <div className="cart-item" key={item._id}>
                <img src={item.image} alt={item.name} />
                <div className="cart-item__info">
                  <p className="cart-item__gender">{item.gender}</p>
                  <h3>{item.name}</h3>
                  <p className="cart-item__price">₹{item.price}</p>
                </div>
                <div className="cart-item__qty">
                  <button onClick={() => updateQuantity(item._id, item.quantity - 1)}>−</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>+</button>
                </div>
                <p className="cart-item__subtotal">₹{item.price * item.quantity}</p>
                <button className="cart-item__remove" onClick={() => removeFromCart(item._id)} aria-label="Remove item">
                  ✕
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Order Summary</h2>
            <div className="cart-summary__row">
              <span>Subtotal</span>
              <span>₹{totalPrice}</span>
            </div>
            <div className="cart-summary__row">
              <span>Shipping</span>
              <span>{totalPrice > 1999 ? "Free" : "₹99"}</span>
            </div>
            <div className="cart-summary__row cart-summary__total">
              <span>Total</span>
              <span>₹{totalPrice > 1999 ? totalPrice : totalPrice + 99}</span>
            </div>
            <button className="btn-primary cart-checkout" onClick={() => navigate("/checkout")}>
              Proceed To Checkout
            </button>
            <Link to="/" className="cart-continue">
              ← Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
