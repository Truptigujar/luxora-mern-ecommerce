import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { api } from "../api";
import "../styles/Checkout.css";

const PAYMENT_METHODS = [
  { value: "cod", label: "Cash on Delivery", hint: "Pay in cash when your order arrives" },
  { value: "card", label: "Credit / Debit Card", hint: "Pay now with your card" },
  { value: "upi", label: "UPI", hint: "Pay now via UPI app" },
];

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [shipping, setShipping] = useState({
    name: user?.name || "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [confirmedOrder, setConfirmedOrder] = useState(null); // holds the placed order for the popup

  const shippingCost = totalPrice > 1999 ? 0 : 99;
  const total = totalPrice + shippingCost;

  const handleChange = (e) => setShipping({ ...shipping, [e.target.name]: e.target.value });

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setError("");

    if (!user) {
      navigate("/login");
      return;
    }
    if (items.length === 0) {
      navigate("/cart");
      return;
    }

    setLoading(true);
    try {
      const order = await api.createOrder({
        items: items.map((i) => ({
          productId: i._id,
          name: i.name,
          image: i.image,
          price: i.price,
          quantity: i.quantity,
        })),
        shipping,
        paymentMethod,
        total,
      });
      clearCart();
      setConfirmedOrder(order); // show the popup
    } catch (err) {
      setError(err.message || "Something went wrong placing your order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0 && !confirmedOrder) {
    return (
      <div className="page-wrap cart-empty">
        <p className="eyebrow">Checkout</p>
        <h1>Your cart is empty</h1>
        <p>Add something to your bag before checking out.</p>
        <Link to="/" className="btn-primary">
          Continue Shopping →
        </Link>
      </div>
    );
  }

  return (
    <div className="page-wrap checkout-page">
      <div className="container">
        <p className="eyebrow">Checkout</p>
        <h1 className="checkout-title">Shipping &amp; Payment</h1>

        <form className="checkout-layout" onSubmit={handlePlaceOrder}>
          <div className="checkout-form-card">
            <h2>Shipping Address</h2>

            <div className="checkout-field">
              <label>Full Name</label>
              <input type="text" name="name" value={shipping.name} onChange={handleChange} required />
            </div>

            <div className="checkout-field">
              <label>Address</label>
              <input
                type="text"
                name="address"
                value={shipping.address}
                onChange={handleChange}
                placeholder="House no., street, area"
                required
              />
            </div>

            <div className="checkout-form-row">
              <div className="checkout-field">
                <label>City</label>
                <input type="text" name="city" value={shipping.city} onChange={handleChange} required />
              </div>
              <div className="checkout-field">
                <label>State</label>
                <input type="text" name="state" value={shipping.state} onChange={handleChange} />
              </div>
            </div>

            <div className="checkout-form-row">
              <div className="checkout-field">
                <label>PIN Code</label>
                <input
                  type="text"
                  name="pincode"
                  value={shipping.pincode}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="checkout-field">
                <label>Mobile Number</label>
                <input type="tel" name="phone" value={shipping.phone} onChange={handleChange} required />
              </div>
            </div>

            <h2 style={{ marginTop: 8 }}>Payment Method</h2>
            <div className="payment-options">
              {PAYMENT_METHODS.map((m) => (
                <label
                  key={m.value}
                  className={`payment-option ${paymentMethod === m.value ? "payment-option--selected" : ""}`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={m.value}
                    checked={paymentMethod === m.value}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span className="payment-option__label">{m.label}</span>
                  <span className="payment-option__hint">{m.hint}</span>
                </label>
              ))}
            </div>

            {paymentMethod !== "cod" && (
              <div className="checkout-payment-note">
                This is a demo store — no real payment is processed, but your order will still be
                placed and confirmed.
              </div>
            )}

            {!user && (
              <div className="checkout-error">
                Please <Link to="/login">sign in</Link> to place your order.
              </div>
            )}
            {error && <div className="checkout-error">{error}</div>}
          </div>

          <div className="checkout-summary">
            <h2>Order Summary</h2>
            <div className="checkout-summary-items">
              {items.map((item) => (
                <div className="checkout-summary-item" key={item._id}>
                  <img src={item.image} alt={item.name} />
                  <div>
                    <p className="checkout-summary-item__name">{item.name}</p>
                    <p className="checkout-summary-item__qty">Qty: {item.quantity}</p>
                  </div>
                  <p className="checkout-summary-item__price">₹{item.price * item.quantity}</p>
                </div>
              ))}
            </div>

            <div className="checkout-summary__row">
              <span>Subtotal</span>
              <span>₹{totalPrice}</span>
            </div>
            <div className="checkout-summary__row">
              <span>Shipping</span>
              <span>{shippingCost === 0 ? "Free" : `₹${shippingCost}`}</span>
            </div>
            <div className="checkout-summary__row checkout-summary__total">
              <span>Total</span>
              <span>₹{total}</span>
            </div>

            <button type="submit" className="btn-primary checkout-place-order" disabled={loading}>
              {loading ? "Placing Order..." : "Place Order"}
            </button>
          </div>
        </form>
      </div>

      {confirmedOrder && (
        <div className="order-popup-overlay">
          <div className="order-popup">
            <div className="confirm-icon">✓</div>
            <p className="eyebrow">Thank You</p>
            <h2>Your Order Is Confirmed!</h2>
            <p>We've received your order and it's being prepared for shipping.</p>
            <div className="confirm-order-id">Order #{confirmedOrder._id}</div>
            <p>
              {confirmedOrder.items.length} item{confirmedOrder.items.length > 1 ? "s" : ""} · Total ₹
              {confirmedOrder.total}
            </p>
            <p>
              Shipping to {confirmedOrder.shipping.name}, {confirmedOrder.shipping.city}
            </p>
            <div className="confirm-actions" style={{ marginTop: 24 }}>
              <button className="btn-primary" onClick={() => navigate("/")}>
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
