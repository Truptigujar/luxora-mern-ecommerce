import { Link } from "react-router-dom";
import "../styles/InfoPage.css";

const CATEGORIES = [
  {
    to: "/shoes",
    name: "Shoes",
    tag: "16 Styles",
    desc: "Sneakers, boots, heels & flats for every stride.",
    img: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=900",
  },
  {
    to: "/dresses",
    name: "Dresses",
    tag: "16 Styles",
    desc: "Everyday silhouettes and occasion-ready pieces.",
    img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=900",
  },
  {
    to: "/watches",
    name: "Watches",
    tag: "16 Styles",
    desc: "Automatic, chronograph & minimalist timepieces.",
    img: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=900",
  },
  {
    to: "/perfumes",
    name: "Perfumes",
    tag: "16 Styles",
    desc: "Signature scents for men and women, all day wear.",
    img: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=900",
  },
];

export default function Products() {
  return (
    <div>
      <section
        className="info-hero"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600)",
        }}
      >
        <div className="container">
          <p className="eyebrow" style={{ color: "var(--gold-light)" }}>
            Our Products
          </p>
          <h1 className="info-hero__title">Four Categories, One Standard</h1>
          <p className="info-hero__subtitle">
            Every LUXORA product — no matter the category — goes through the same
            quality and design review before it reaches the shop.
          </p>
        </div>
      </section>

      <div className="info-body">
        <section className="info-section">
          <div className="info-section__head">
            <p className="eyebrow">Shop By Category</p>
            <h2>Explore The Full Collection</h2>
          </div>
          <div className="info-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
            {CATEGORIES.map((c) => (
              <Link to={c.to} key={c.name} className="product-cat-card">
                <img src={c.img} alt={c.name} />
                <div className="product-cat-card__content">
                  <span>{c.tag}</span>
                  <h3>{c.name}</h3>
                  <p>{c.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="info-section">
          <div className="info-section__head">
            <p className="eyebrow">How We Choose What To Sell</p>
            <h2>Our Product Standards</h2>
            <p>
              Before anything joins the catalogue, it has to clear three checks — the
              same ones, whether it's a ₹1,299 sneaker or a ₹5,000 watch.
            </p>
          </div>
          <div className="info-grid">
            <div className="info-card">
              <div className="info-card__icon">Fit</div>
              <h3>True-To-Size Fit</h3>
              <p>
                Every style is fit-tested across our full size run before it's approved,
                so the size chart on the product page is one you can actually trust.
              </p>
            </div>
            <div className="info-card">
              <div className="info-card__icon">Mat</div>
              <h3>Material Transparency</h3>
              <p>
                Each product page states exactly what it's made of — no vague "premium
                fabric" descriptions — so you know what you're paying for.
              </p>
            </div>
            <div className="info-card">
              <div className="info-card__icon">QC</div>
              <h3>Independent Quality Check</h3>
              <p>
                A random sample from every production batch is inspected separately
                from the manufacturer before it's cleared for sale.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
