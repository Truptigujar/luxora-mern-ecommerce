import { useState } from "react";
import { useCart } from "../context/CartContext";
import "../styles/ProductQuickView.css";

function Stars({ rating }) {
  const full = Math.round(rating);
  return (
    <span className="quick-view__stars" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill={i < full ? "var(--gold)" : "none"}
          stroke="var(--gold)"
          strokeWidth="1.4"
        >
          <path d="M12 2.5l2.9 6.3 6.9.7-5.2 4.7 1.5 6.8L12 17.8l-6.1 3.2 1.5-6.8-5.2-4.7 6.9-.7L12 2.5z" />
        </svg>
      ))}
    </span>
  );
}

export default function ProductQuickView({ product, onClose }) {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || "");
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  return (
    <div className="quick-view__overlay" onClick={onClose}>
      <div className="quick-view__panel" onClick={(e) => e.stopPropagation()}>
        <button className="quick-view__close" onClick={onClose} aria-label="Close">
          ×
        </button>

        <div className="quick-view__image">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="quick-view__details">
          <p className="quick-view__gender">{product.gender} · {product.category}</p>
          <h2 className="quick-view__name">{product.name}</h2>

          <div className="quick-view__rating">
            <Stars rating={product.rating || 4.5} />
            <span className="quick-view__rating-text">
              {(product.rating || 4.5).toFixed(1)} · {product.reviewCount || 0} ratings
            </span>
          </div>

          <div className="quick-view__price">
            <span className="quick-view__price-now">₹{product.price}</span>
            {product.oldPrice && <span className="quick-view__price-old">₹{product.oldPrice}</span>}
          </div>

          {product.material && (
            <div className="quick-view__section">
              <h4>Material & Quality</h4>
              <p>{product.material}</p>
            </div>
          )}

          {product.sizes && product.sizes.length > 0 && (
            <div className="quick-view__section">
              <h4>Select Size</h4>
              <div className="quick-view__sizes">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    className={`quick-view__size-btn ${selectedSize === size ? "is-selected" : ""}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          <button
            className={`btn-primary quick-view__add-btn ${added ? "is-added" : ""}`}
            onClick={handleAdd}
          >
            {added ? "Added to Cart ✓" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}
