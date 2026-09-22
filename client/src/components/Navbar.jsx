import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import "../styles/Navbar.css";

export default function Navbar() {
  const { totalCount } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const links = [
    { to: "/", label: "Home" },
    { to: "/shoes", label: "Shoes" },
    { to: "/dresses", label: "Dresses" },
    { to: "/watches", label: "Watches" },
    { to: "/perfumes", label: "Perfumes" },
  ];

  return (
    <header className="navbar">
      <div className="container navbar__inner">
        <Link to="/" className="navbar__brand">
          <span className="seal">LX</span>
          <span className="navbar__brand-text">LUXORA</span>
        </Link>

        <nav className={`navbar__links ${open ? "is-open" : ""}`}>
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) => `navbar__link ${isActive ? "is-active" : ""}`}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="navbar__actions">
          {user ? (
            <div className="navbar__user">
              <span className="navbar__hello">Hi, {user.name.split(" ")[0]}</span>
              <button className="navbar__logout" onClick={logout}>
                Logout
              </button>
            </div>
          ) : (
            <button className="navbar__login" onClick={() => navigate("/login")}>
              Login
            </button>
          )}

          <Link to="/cart" className="navbar__cart" aria-label="Cart">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
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
            {totalCount > 0 && <span className="navbar__cart-badge">{totalCount}</span>}
          </Link>

          <button className="navbar__burger" onClick={() => setOpen((o) => !o)} aria-label="Menu">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
}
