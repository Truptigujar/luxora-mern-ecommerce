import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { api } from "../api";
import { fallbackProducts } from "../data/products";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard";
import "../styles/ProductDetails.css";

function Stars({ rating, size = 16 }) {
  const full = Math.round(rating);
  return (
    <span className="pd-stars" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          width={size}
          height={size}
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

// Small set of presentational sample reviews — purely a UI touch so the
// details page doesn't feel empty; not tied to any real backend data.
const REVIEW_TEMPLATES = [
  { name: "Aarav M.", days: 4, title: "Great quality for the price", body: "Exactly as described. The finish feels premium and it arrived well packed. Would buy again." },
  { name: "Priya S.", days: 11, title: "Loved it", body: "Fits true to size and the material feels durable. Matches the photos shown on the site." },
  { name: "Rohan K.", days: 19, title: "Good value", body: "Decent quality for the price point. Delivery was on time and the packaging was neat." },
];

function buildHighlights(product) {
  const highlights = [];
  if (product.material) highlights.push(product.material);
  highlights.push(`Category: ${product.category?.charAt(0).toUpperCase()}${product.category?.slice(1)}`);
  highlights.push(`Ideal for: ${product.gender === "men" ? "Men" : "Women"}`);
  if (product.sizes?.length) highlights.push(`Available in ${product.sizes.length} variant${product.sizes.length > 1 ? "s" : ""}`);
  highlights.push("Quality checked before dispatch");
  return highlights;
}

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState("");
  const [pincodeMsg, setPincodeMsg] = useState("");
  const [added, setAdded] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setNotFound(false);
    window.scrollTo(0, 0);

    api
      .getProduct(id)
      .then((data) => {
        if (!active) return;
        setProduct(data);
        setSelectedSize(data.sizes?.[0] || "");
      })
      .catch(() => {
        const fallback = fallbackProducts.find((p) => p._id === id);
        if (!active) return;
        if (fallback) {
          setProduct(fallback);
          setSelectedSize(fallback.sizes?.[0] || "");
        } else {
          setNotFound(true);
        }
      })
      .finally(() => active && setLoading(false));

    return () => {
      active = false;
    };
  }, [id]);

  useEffect(() => {
    if (!product) return;
    let active = true;
    api
      .getProducts({ category: product.category })
      .then((data) => active && setRelated(data.filter((p) => p._id !== product._id).slice(0, 4)))
      .catch(() =>
        active &&
        setRelated(
          fallbackProducts.filter((p) => p.category === product.category && p._id !== product._id).slice(0, 4)
        )
      );
    return () => {
      active = false;
    };
  }, [product]);

  const discountPercent = useMemo(() => {
    if (!product?.oldPrice || product.oldPrice <= product.price) return 0;
    return Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);
  }, [product]);

  const highlights = useMemo(() => (product ? buildHighlights(product) : []), [product]);

  const ratingBreakdown = useMemo(() => {
    const rating = product?.rating || 4.5;
    // Presentational only — derives a plausible star distribution from the average rating.
    const buckets = [5, 4, 3, 2, 1].map((star) => {
      const distance = Math.abs(star - rating);
      const weight = Math.max(6, 100 - distance * 38);
      return { star, weight };
    });
    const total = buckets.reduce((s, b) => s + b.weight, 0);
    return buckets.map((b) => ({ star: b.star, pct: Math.round((b.weight / total) * 100) }));
  }, [product]);

  const handleAddToCart = () => {
    addToCart({ ...product, selectedSize }, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleBuyNow = () => {
    addToCart({ ...product, selectedSize }, quantity);
    navigate("/cart");
  };

  const checkPincode = (e) => {
    e.preventDefault();
    if (!/^\d{6}$/.test(pincode)) {
      setPincodeMsg("Please enter a valid 6-digit pincode.");
      return;
    }
    setPincodeMsg("Delivery available — usually arrives in 3–5 business days.");
  };

  if (loading) {
    return (
      <div className="page-wrap pd-loading">
        <p>Loading product…</p>
      </div>
    );
  }

  if (notFound || !product) {
    return (
      <div className="page-wrap pd-loading">
        <p>We couldn't find that product.</p>
        <Link to="/" className="btn-primary" style={{ marginTop: 20 }}>
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="page-wrap pd">
      <div className="container">
        <nav className="pd-breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to={`/${product.category}`}>
            {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
          </Link>
          <span>/</span>
          <span className="pd-breadcrumb__current">{product.name}</span>
        </nav>

        <div className="pd-main">
          {/* IMAGE */}
          <div className="pd-gallery">
            <div className="pd-gallery__main">
              {product.tag && <span className="pd-gallery__tag">{product.tag}</span>}
              <button
                className={`pd-wishlist ${wishlisted ? "is-active" : ""}`}
                onClick={() => setWishlisted((w) => !w)}
                aria-label="Add to wishlist"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill={wishlisted ? "var(--rose)" : "none"} stroke="var(--rose)" strokeWidth="1.8">
                  <path d="M12 21s-7.5-4.7-10-9.3C.5 8.1 2.3 4.5 6 4c2.1-.3 4 .8 6 3 2-2.2 3.9-3.3 6-3 3.7.5 5.5 4.1 4 7.7-2.5 4.6-10 9.3-10 9.3z" />
                </svg>
              </button>
              <img src={product.image} alt={product.name} />
            </div>
            <div className="pd-gallery__thumbs">
              {[0, 1, 2].map((i) => (
                <button key={i} className={`pd-gallery__thumb ${i === 0 ? "is-active" : ""}`}>
                  <img src={product.image} alt={`${product.name} view ${i + 1}`} />
                </button>
              ))}
            </div>
            <div className="pd-trust">
              <div className="pd-trust__item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--plum)" strokeWidth="1.6"><path d="M12 2l8 4v6c0 5-3.4 8.7-8 10-4.6-1.3-8-5-8-10V6l8-4z" /><path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                <span>100% Original</span>
              </div>
              <div className="pd-trust__item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--plum)" strokeWidth="1.6"><path d="M3 7h11v9H3zM14 10h4l3 3v3h-7z" /><circle cx="7" cy="18" r="1.6" /><circle cx="17.5" cy="18" r="1.6" /></svg>
                <span>Free Delivery</span>
              </div>
              <div className="pd-trust__item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--plum)" strokeWidth="1.6"><path d="M3 12a9 9 0 1 0 3-6.7" /><path d="M3 4v5h5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                <span>7 Day Returns</span>
              </div>
            </div>
          </div>

          {/* DETAILS */}
          <div className="pd-info">
            <p className="pd-info__gender">{product.gender} · {product.category}</p>
            <h1 className="pd-info__name">{product.name}</h1>

            <div className="pd-info__rating-row">
              <span className="pd-rating-badge">
                {(product.rating || 4.5).toFixed(1)}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="#fff"><path d="M12 2.5l2.9 6.3 6.9.7-5.2 4.7 1.5 6.8L12 17.8l-6.1 3.2 1.5-6.8-5.2-4.7 6.9-.7L12 2.5z" /></svg>
              </span>
              <Stars rating={product.rating || 4.5} />
              <a href="#pd-reviews" className="pd-info__review-link">
                {product.reviewCount || 0} ratings & reviews
              </a>
            </div>

            <div className="pd-price">
              <span className="pd-price__now">₹{product.price?.toLocaleString("en-IN")}</span>
              {product.oldPrice && <span className="pd-price__old">₹{product.oldPrice.toLocaleString("en-IN")}</span>}
              {discountPercent > 0 && <span className="pd-price__discount">{discountPercent}% off</span>}
            </div>
            <p className="pd-price__tax">inclusive of all taxes</p>

            <div className="pd-offers">
              <h4>Available Offers</h4>
              <ul>
                <li><strong>Bank Offer</strong> — 10% instant discount on select cards, up to ₹500</li>
                <li><strong>No Cost EMI</strong> available on orders above ₹3,000</li>
                <li><strong>Combo Offer</strong> — Buy 2 or more and get free shipping</li>
              </ul>
            </div>

            {product.material && (
              <div className="pd-section">
                <h4>Quality & Material</h4>
                <p>{product.material}</p>
              </div>
            )}

            <div className="pd-section">
              <h4>Highlights</h4>
              <ul className="pd-highlights">
                {highlights.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            </div>

            {product.sizes && product.sizes.length > 0 && (
              <div className="pd-section">
                <h4>Select {product.category === "watches" || product.category === "perfumes" ? "Variant" : "Size"}</h4>
                <div className="pd-sizes">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      className={`pd-size-btn ${selectedSize === size ? "is-selected" : ""}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="pd-section">
              <h4>Quantity</h4>
              <div className="pd-qty">
                <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} aria-label="Decrease quantity">−</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity((q) => Math.min(10, q + 1))} aria-label="Increase quantity">+</button>
              </div>
            </div>

            <div className="pd-section">
              <h4>Delivery</h4>
              <form className="pd-pincode" onSubmit={checkPincode}>
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  placeholder="Enter pincode"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, ""))}
                />
                <button type="submit" className="btn-outline">Check</button>
              </form>
              {pincodeMsg && <p className="pd-pincode__msg">{pincodeMsg}</p>}
            </div>

            <div className="pd-actions">
              <button className="btn-outline pd-actions__cart" onClick={handleAddToCart}>
                {added ? "Added ✓" : "Add to Cart"}
              </button>
              <button className="btn-primary pd-actions__buy" onClick={handleBuyNow}>
                Buy Now
              </button>
            </div>

            <p className="pd-policy">
              Easy 7-day return & exchange · Cash on delivery available · Sold and shipped by LUXORA
            </p>
          </div>
        </div>

        {/* SPECIFICATIONS */}
        <div className="pd-specs">
          <h3 className="pd-specs__title">Product Specifications</h3>
          <table>
            <tbody>
              <tr><td>Category</td><td>{product.category.charAt(0).toUpperCase() + product.category.slice(1)}</td></tr>
              <tr><td>Gender</td><td>{product.gender === "men" ? "Men" : "Women"}</td></tr>
              {product.material && <tr><td>Material & Quality</td><td>{product.material}</td></tr>}
              {product.sizes?.length > 0 && <tr><td>Available Sizes/Variants</td><td>{product.sizes.join(", ")}</td></tr>}
              <tr><td>Rating</td><td>{(product.rating || 4.5).toFixed(1)} out of 5 ({product.reviewCount || 0} ratings)</td></tr>
            </tbody>
          </table>
        </div>

        {/* REVIEWS */}
        <div className="pd-reviews" id="pd-reviews">
          <h3 className="pd-reviews__title">Ratings & Reviews</h3>
          <div className="pd-reviews__summary">
            <div className="pd-reviews__avg">
              <span className="pd-reviews__avg-num">{(product.rating || 4.5).toFixed(1)}</span>
              <Stars rating={product.rating || 4.5} size={18} />
              <span className="pd-reviews__avg-count">{product.reviewCount || 0} ratings</span>
            </div>
            <div className="pd-reviews__bars">
              {ratingBreakdown.map(({ star, pct }) => (
                <div className="pd-reviews__bar-row" key={star}>
                  <span>{star} ★</span>
                  <div className="pd-reviews__bar-track">
                    <div className="pd-reviews__bar-fill" style={{ width: `${pct}%` }} />
                  </div>
                  <span className="pd-reviews__bar-pct">{pct}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pd-reviews__list">
            {REVIEW_TEMPLATES.map((r, i) => (
              <div className="pd-review-card" key={i}>
                <div className="pd-review-card__head">
                  <span className="pd-review-card__rating">
                    {Math.min(5, Math.max(3, Math.round((product.rating || 4.5) - i * 0.2)))} ★
                  </span>
                  <strong>{r.title}</strong>
                </div>
                <p>{r.body}</p>
                <p className="pd-review-card__meta">{r.name} · {r.days} days ago</p>
              </div>
            ))}
          </div>
        </div>

        {/* RELATED */}
        {related.length > 0 && (
          <div className="pd-related">
            <h3 className="pd-related__title">You may also like</h3>
            <div className="pd-related__grid">
              {related.map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
