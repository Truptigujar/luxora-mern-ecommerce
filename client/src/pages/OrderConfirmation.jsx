import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../api";
import "../styles/Checkout.css";

export default function OrderConfirmation() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .getOrder(id)
      .then(setOrder)
      .catch((err) => setError(err.message || "Order not found"));
  }, [id]);

  if (error) {
    return (
      <div className="page-wrap confirm-page">
        <div className="confirm-card">
          <h1>Order not found</h1>
          <p>{error}</p>
          <div className="confirm-actions">
            <Link to="/" className="btn-primary">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrap confirm-page">
      <div className="confirm-card">
        <div className="confirm-icon">✓</div>
        <p className="eyebrow">Thank You</p>
        <h1>Your Order Is Confirmed</h1>
        <p>We've received your order and it's being prepared for shipping.</p>

        {order && (
          <>
            <div className="confirm-order-id">Order #{order._id}</div>
            <p>
              {order.items.length} item{order.items.length > 1 ? "s" : ""} · Total ₹{order.total}
            </p>
            <p>
              Shipping to {order.shipping.name}, {order.shipping.city}
            </p>
          </>
        )}

        <div className="confirm-actions" style={{ marginTop: 28 }}>
          <Link to="/" className="btn-primary">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
