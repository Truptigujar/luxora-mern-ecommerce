import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";
import { fallbackProducts } from "../data/products";
import ProductCard from "../components/ProductCard";
import { useAuth } from "../context/AuthContext";
import "../styles/Home.css";

const categories = [
  { key: "shoes", label: "Shoes", image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=700" },
  { key: "dresses", label: "Dresses", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=700" },
  { key: "watches", label: "Watches", image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=700" },
  { key: "perfumes", label: "Perfumes", image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=700" },
];

export default function Home() {
  const [products, setProducts] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    api
      .getProducts()
      .then((data) => setProducts(data))
      .catch(() => setProducts(fallbackProducts));
  }, []);

  const popularInWomen = products.filter((p) => p.gender === "women").slice(0, 4);
  const popularInMen = products.filter((p) => p.gender === "men").slice(0, 4);

  return (
    <div className="page-wrap">
      {/* HERO */}
      <section className="home-hero">
        <div className="container home-hero__inner">
          <div className="home-hero__text">
            <p className="eyebrow">
              {user ? `Welcome back, ${user.name.split(" ")[0]}` : "Autumn / Winter Edit"}
            </p>
            <h1 className="home-hero__title">
              Wear <span>Confidence.</span>
              <br />
              Carry <span>Elegance.</span>
            </h1>
            <p className="home-hero__sub">
              Shoes, dresses, watches & perfumes curated for men and women who
              notice the details.
            </p>
            <div className="home-hero__actions">
              <Link to="/shoes" className="btn-primary">
                Explore Collection →
              </Link>
              <Link to="/perfumes" className="btn-outline">
                New Arrivals
              </Link>
            </div>
          </div>
          <div className="home-hero__image">
            <img
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=900"
              alt="LUXORA model wearing the new season edit"
            />
            <div className="home-hero__badge">
              <span className="seal">LX</span>
              <div>
                <strong>Free Shipping</strong>
                <p>On orders over ₹1999</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORY STRIP */}
      <section className="container category-strip">
        {categories.map((c) => (
          <Link to={`/${c.key}`} key={c.key} className="category-strip__item">
            <img src={c.image} alt={c.label} />
            <span>{c.label}</span>
          </Link>
        ))}
      </section>

      {/* POPULAR IN WOMEN */}
      {popularInWomen.length > 0 && (
        <section className="container home-section">
          <div className="home-section__head">
            <h2 className="section-title">Popular In Women</h2>
            <div className="gold-rule" />
          </div>
          <div className="home-grid">
            {popularInWomen.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* PROMO BANNER */}
      <section className="promo-banner">
        <div className="container promo-banner__inner">
          <div>
            <p className="eyebrow" style={{ color: "var(--gold-light)" }}>
              Limited Time
            </p>
            <h2 className="promo-banner__title">Exclusive Offers For You</h2>
            <p className="promo-banner__sub">Up to 40% off on watches & perfumes this week.</p>
            <Link to="/watches" className="btn-primary">
              Shop The Offer →
            </Link>
          </div>
          <img
            src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=700"
            alt="Model wearing sunglasses"
          />
        </div>
      </section>

      {/* POPULAR IN MEN / NEW COLLECTIONS */}
      {popularInMen.length > 0 && (
        <section className="container home-section">
          <div className="home-section__head">
            <h2 className="section-title">New Collections</h2>
            <div className="gold-rule" />
          </div>
          <div className="home-grid">
            {popularInMen.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
