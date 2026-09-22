import "../styles/InfoPage.css";

const OFFICES = [
  {
    city: "Mumbai",
    tag: "Headquarters",
    address: "14th Floor, Meridian Tower, Bandra Kurla Complex, Mumbai 400051",
    phone: "+91 22 4567 8900",
    hours: "Mon – Fri, 9:30 AM – 6:30 PM IST",
    img: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=700",
  },
  {
    city: "Delhi",
    tag: "Design Studio",
    address: "3rd Floor, Ambience Tower, Vasant Kunj, New Delhi 110070",
    phone: "+91 11 2345 6789",
    hours: "Mon – Fri, 9:30 AM – 6:30 PM IST",
    img: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=700",
  },
  {
    city: "Bengaluru",
    tag: "Fulfilment Centre",
    address: "Plot 22, Electronics City Phase 1, Bengaluru 560100",
    phone: "+91 80 3456 7890",
    hours: "Mon – Sat, 9:00 AM – 7:00 PM IST",
    img: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=700",
  },
  {
    city: "London",
    tag: "EU/UK Support",
    address: "22 Fenchurch Street, London EC3M 3BY, United Kingdom",
    phone: "+44 20 7946 0958",
    hours: "Mon – Fri, 9:00 AM – 5:30 PM GMT",
    img: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=700",
  },
];

export default function Offices() {
  return (
    <div>
      <section
        className="info-hero"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600)",
        }}
      >
        <div className="container">
          <p className="eyebrow" style={{ color: "var(--gold-light)" }}>
            Our Offices
          </p>
          <h1 className="info-hero__title">Where To Find Us</h1>
          <p className="info-hero__subtitle">
            Four locations, one team — reach out to whichever office is closest to you.
          </p>
        </div>
      </section>

      <div className="info-body">
        <section className="info-section">
          <div className="info-grid">
            {OFFICES.map((o) => (
              <div className="office-card" key={o.city}>
                <div className="office-card__image">
                  <img src={o.img} alt={`${o.city} skyline`} />
                </div>
                <div className="office-card__body">
                  <span className="office-card__tag">{o.tag}</span>
                  <h3>{o.city}</h3>
                  <p>{o.address}</p>
                  <p>{o.phone}</p>
                  <p>{o.hours}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
