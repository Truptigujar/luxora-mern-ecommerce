import "../styles/InfoPage.css";

export default function About() {
  return (
    <div>
      <section
        className="info-hero"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1600)",
        }}
      >
        <div className="container">
          <p className="eyebrow" style={{ color: "var(--gold-light)" }}>
            About Us
          </p>
          <h1 className="info-hero__title">A Small Idea That Kept Growing</h1>
          <p className="info-hero__subtitle">
            LUXORA started as a single shoe rack at a weekend market. Here's how it
            became a full wardrobe.
          </p>
        </div>
      </section>

      <div className="info-body">
        <section className="info-section">
          <div className="two-col two-col--reverse">
            <div>
              <p className="eyebrow">Our Story</p>
              <h2>From One Stall To Four Categories</h2>
              <p style={{ color: "var(--grey)", lineHeight: 1.75, marginTop: 12 }}>
                LUXORA began in 2018 with a single collection of leather sneakers, sold
                out of a small stall at a weekend design market. What customers kept
                asking for wasn't more shoes — it was a place to build a whole outfit.
              </p>
              <p style={{ color: "var(--grey)", lineHeight: 1.75, marginTop: 12 }}>
                Dresses came first, then watches, then a signature line of perfumes —
                each one added only once we were confident we could make it as well as
                the thing that came before it.
              </p>
            </div>
            <div className="two-col__image">
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=900"
                alt="LUXORA early workshop"
              />
            </div>
          </div>
        </section>

        <section className="info-section">
          <div className="info-section__head">
            <p className="eyebrow">Milestones</p>
            <h2>Our Journey So Far</h2>
          </div>
          <div className="timeline">
            <div className="timeline__item">
              <div className="timeline__year">2018</div>
              <div className="timeline__marker">
                <div className="timeline__dot" />
                <div className="timeline__line" />
              </div>
              <div className="timeline__content">
                <h4>The First Collection</h4>
                <p>
                  Twelve leather sneaker styles, hand-sold at weekend markets across
                  Mumbai. Every pair was numbered and signed by the maker.
                </p>
              </div>
            </div>
            <div className="timeline__item">
              <div className="timeline__year">2020</div>
              <div className="timeline__marker">
                <div className="timeline__dot" />
                <div className="timeline__line" />
              </div>
              <div className="timeline__content">
                <h4>Dresses & Online Launch</h4>
                <p>
                  LUXORA moved online and introduced its first dress line, designed
                  in-house by a two-person studio team.
                </p>
              </div>
            </div>
            <div className="timeline__item">
              <div className="timeline__year">2022</div>
              <div className="timeline__marker">
                <div className="timeline__dot" />
                <div className="timeline__line" />
              </div>
              <div className="timeline__content">
                <h4>Watches, Then Perfumes</h4>
                <p>
                  Two new categories in one year — both built with manufacturing
                  partners we'd already worked with for years on other products.
                </p>
              </div>
            </div>
            <div className="timeline__item">
              <div className="timeline__year">2026</div>
              <div className="timeline__marker">
                <div className="timeline__dot" />
              </div>
              <div className="timeline__content">
                <h4>250,000+ Customers</h4>
                <p>
                  Shipping to 40+ countries, with the same small-batch approach we
                  started with — nothing mass-produced, everything considered.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="info-section">
          <div className="info-grid" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
            <div className="info-card">
              <div className="info-card__icon">♥</div>
              <h3>Slow By Design</h3>
              <p>We'd rather ship four excellent categories than forty average ones.</p>
            </div>
            <div className="info-card">
              <div className="info-card__icon">✓</div>
              <h3>Radically Transparent</h3>
              <p>Real prices, real materials, real reviews — no manufactured hype.</p>
            </div>
            <div className="info-card">
              <div className="info-card__icon">↻</div>
              <h3>Built To Return To</h3>
              <p>Every piece is designed to still feel right three years from now.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
