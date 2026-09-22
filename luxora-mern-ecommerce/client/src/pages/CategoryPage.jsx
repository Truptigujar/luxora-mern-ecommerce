import { useEffect, useMemo, useState } from "react";
import { api } from "../api";
import { fallbackProducts } from "../data/products";
import ProductCard from "../components/ProductCard";
import "../styles/CategoryPage.css";

export default function CategoryPage({ category, title, subtitle, heroImage, accentClass = "" }) {
  const [gender, setGender] = useState("all");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);
    api
      .getProducts({ category })
      .then((data) => active && setProducts(data))
      .catch(() => active && setProducts(fallbackProducts.filter((p) => p.category === category)))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [category]);

  const filtered = useMemo(
    () => (gender === "all" ? products : products.filter((p) => p.gender === gender)),
    [products, gender]
  );

  return (
    <div className={`page-wrap category-page ${accentClass}`}>
      <section className="category-hero" style={{ backgroundImage: `linear-gradient(120deg, rgba(43,27,46,0.55), rgba(181,73,91,0.35)), url(${heroImage})` }}>
        <div className="container">
          <p className="eyebrow" style={{ color: "var(--gold-light)" }}>
            LUXORA Collection
          </p>
          <h1 className="category-hero__title">{title}</h1>
          <p className="category-hero__subtitle">{subtitle}</p>
        </div>
      </section>

      <section className="container category-body">
        <div className="category-toolbar">
          <div className="category-tabs">
            {["all", "men", "women"].map((g) => (
              <button
                key={g}
                className={`category-tab ${gender === g ? "is-active" : ""}`}
                onClick={() => setGender(g)}
              >
                {g === "all" ? "All" : g}
              </button>
            ))}
          </div>
          <p className="category-count">{filtered.length} products</p>
        </div>

        {loading ? (
          <p className="category-loading">Loading the collection…</p>
        ) : (
          <div className="category-grid">
            {filtered.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
