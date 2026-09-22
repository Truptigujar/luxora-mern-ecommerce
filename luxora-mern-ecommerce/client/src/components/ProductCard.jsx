import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../styles/ProductCard.css";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [added, setAdded] = useState(false);

  const handleAdd = (e) => {
    e.stopPropagation();
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  const goToDetails = () => navigate(`/product/${product._id}`);

  return (
    <div className="product-card">
      <div
        className="product-card__image-wrap"
        onClick={goToDetails}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && goToDetails()}
        aria-label={`View ${product.name} details`}
      >
        {product.tag && <span className="product-card__tag">{product.tag}</span>}
        <img src={product.image} alt={product.name} loading="lazy" />
        <button
          className={`product-card__cart-btn ${added ? "is-added" : ""}`}
          onClick={handleAdd}
          aria-label="Add to cart"
        >
          {added ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M3 4H5L5.4 6M5.4 6H20L18 13H7M5.4 6L7 13M7 13L5.6 16.2C5.3 16.9 5.8 17.7 6.6 17.7H18"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="9" cy="21" r="1.4" fill="currentColor" />
              <circle cx="17" cy="21" r="1.4" fill="currentColor" />
            </svg>
          )}
        </button>
      </div>

      <div className="product-card__body" onClick={goToDetails} role="button" tabIndex={-1}>
        <p className="product-card__gender">{product.gender}</p>
        <h3 className="product-card__name">{product.name}</h3>
        {product.rating && (
          <p className="product-card__rating">
            ★ {product.rating.toFixed ? product.rating.toFixed(1) : product.rating}
            <span> ({product.reviewCount || 0})</span>
          </p>
        )}
        <div className="product-card__price">
          <span className="product-card__price-now">₹{product.price}</span>
          {product.oldPrice && <span className="product-card__price-old">₹{product.oldPrice}</span>}
        </div>
      </div>
    </div>
  );
}
