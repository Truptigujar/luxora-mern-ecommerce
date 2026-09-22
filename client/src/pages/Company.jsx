import "../styles/InfoPage.css";

export default function Company() {
  return (
    <div>
      <section
        className="info-hero"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600)",
        }}
      >
        <div className="container">
          <p className="eyebrow" style={{ color: "var(--gold-light)" }}>
            Our Company
          </p>
          <h1 className="info-hero__title">Crafted With Purpose, Worn With Pride</h1>
          <p className="info-hero__subtitle">
            LUXORA is a house of considered essentials — shoes, dresses, watches, and
            perfumes made to be lived in, not just looked at.
          </p>
        </div>
      </section>

      <div className="info-body">
        <section className="info-section">
          <div className="stat-row">
            <div className="stat-row__item">
              <strong>2018</strong>
              <span>Founded</span>
            </div>
            <div className="stat-row__item">
              <strong>40+</strong>
              <span>Countries Shipped To</span>
            </div>
            <div className="stat-row__item">
              <strong>250K+</strong>
              <span>Happy Customers</span>
            </div>
            <div className="stat-row__item">
              <strong>4</strong>
              <span>Flagship Categories</span>
            </div>
          </div>
        </section>

        <section className="info-section">
          <div className="info-section__head">
            <p className="eyebrow">What We Stand For</p>
            <h2>A Business Built On Three Ideas</h2>
            <p>
              Every decision we make — from the leather we source to the way we pack a
              parcel — is measured against the same three principles.
            </p>
          </div>
          <div className="info-grid">
            <div className="info-card">
              <div className="info-card__icon">01</div>
              <h3>Considered Craft</h3>
              <p>
                We work with small ateliers and long-standing manufacturing partners who
                care about finish as much as we do, from stitch density to clasp weight.
              </p>
            </div>
            <div className="info-card">
              <div className="info-card__icon">02</div>
              <h3>Honest Pricing</h3>
              <p>
                No inflated "was" prices. What you see reflects real material and
                labour cost, plus a fair margin — nothing manufactured for a sale event.
              </p>
            </div>
            <div className="info-card">
              <div className="info-card__icon">03</div>
              <h3>Made To Last</h3>
              <p>
                Every collection is designed for repeat wear over many seasons, not a
                single outfit — timeless silhouettes over fast-moving trends.
              </p>
            </div>
          </div>
        </section>

        <section className="info-section">
          <div className="two-col">
            <div>
              <p className="eyebrow">Leadership</p>
              <h2>Run By People Who Actually Shop Here</h2>
              <p style={{ color: "var(--grey)", lineHeight: 1.75, marginTop: 12 }}>
                LUXORA is led by a small team of designers, buyers, and operators who
                each still shop the collection every season. That closeness keeps us
                honest about what's genuinely worth making — and what isn't.
              </p>
              <p style={{ color: "var(--grey)", lineHeight: 1.75, marginTop: 12 }}>
                We keep our supply chain deliberately small, working with the same
                handful of manufacturing partners year over year, so quality control
                never becomes an afterthought as we grow.
              </p>
            </div>
            <div className="two-col__image">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900"
                alt="LUXORA design studio"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
