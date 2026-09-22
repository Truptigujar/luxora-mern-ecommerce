import { useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";
import "../styles/Footer.css";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null); // { type, text }
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setStatus(null);
    setLoading(true);
    try {
      const res = await api.subscribeNewsletter(email);
      setStatus({ type: "success", text: res.message || "Subscribed!" });
      setEmail("");
    } catch (err) {
      setStatus({ type: "error", text: err.message || "Something went wrong." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="footer">
      <div className="container footer__newsletter">
        <p className="eyebrow">Stay In The Loop</p>
        <h2 className="footer__newsletter-title">Get Exclusive Offers On Your Email</h2>
        <p className="footer__newsletter-sub">Subscribe to our newsletter and stay updated</p>
        <form className="footer__form" onSubmit={handleSubscribe}>
          <input
            type="email"
            placeholder="Your Email Id"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Subscribing..." : "Subscribe"}
          </button>
        </form>
        {status && (
          <p className={`footer__newsletter-status footer__newsletter-status--${status.type}`}>
            {status.text}
          </p>
        )}
      </div>

      <div className="container footer__main">
        <div className="footer__brand">
          <span className="seal">LX</span>
          <span className="footer__brand-text">LUXORA</span>
        </div>

        <nav className="footer__nav">
          <Link to="/company">Company</Link>
          <Link to="/products">Products</Link>
          <Link to="/offices">Offices</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </nav>

        <div className="footer__social">
          <a href="#" aria-label="Instagram">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
              <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
              <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
            </svg>
          </a>
          <a href="#" aria-label="Pinterest">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
              <path
                d="M10 17.5c.5-2 1.2-5.3 1.2-5.3M12 12c-.5-1.5.3-3 1.9-3 1.3 0 2 .9 2 2.2 0 1.7-1 3.3-2.5 3.3-.8 0-1.4-.5-1.6-1.1"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
            </svg>
          </a>
          <a href="#" aria-label="WhatsApp">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M7 17l-1.2 3.2L9 19c1 .5 2 .8 3 .8 4.4 0 8-3.6 8-8s-3.6-8-8-8-8 3.6-8 8c0 1.6.5 3 1.2 4.2L7 17z"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M9.2 9.6c.2-.6.6-.6.9-.6s.5 0 .6.3c.2.4.6 1.3.6 1.4.1.1.1.3 0 .5-.1.2-.2.3-.3.4-.1.2-.3.3-.1.6.2.4 1 1.4 2 2 .3.2.5.2.7 0 .2-.2.6-.7.8-1 .2-.2.3-.2.5-.1.2.1 1.4.7 1.6.8.2.1.3.2.3.3 0 .2 0 .8-.3 1.1-.3.4-1.4 1-2 1-.5 0-1.6-.3-3-1.6-1.7-1.6-2.5-3.2-2.6-3.4-.1-.2-.7-1-.7-1.9 0-.3.1-.6.2-.8z"
                fill="currentColor"
              />
            </svg>
          </a>
        </div>
      </div>

      <div className="footer__bottom">
        <p>Copyright @ 2026 LUXORA — All Rights Reserved.</p>
      </div>
    </footer>
  );
}
