import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Login.css";

export default function Login() {
  const [form, setForm] = useState({ name: "", email: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      // No password needed — any name + email logs you straight in.
      // New emails create an account on the fly, existing ones sign back in.
      await login(form.email, form.name);
      navigate("/");
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-card__image">
          <img
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=900"
            alt="LUXORA new season edit"
          />
          <div className="login-card__overlay">
            <span className="seal">LX</span>
            <h2>LUXORA</h2>
            <p>Shoes · Dresses · Watches · Perfumes</p>
          </div>
        </div>

        <div className="login-card__form">
          <p className="eyebrow">Welcome</p>
          <h1>Sign In To Your Account</h1>
          <p className="login-card__sub">
            No password needed — just enter your name and email and you're in.
            First time here? Your account is created automatically.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="login-field">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Ava Sharma"
              />
              <p className="login-field__hint">Only used the first time, to create your account.</p>
            </div>

            <div className="login-field">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
              />
            </div>

            {error && <p className="login-error">{error}</p>}

            <button type="submit" className="btn-primary login-submit" disabled={loading}>
              {loading ? "Please wait…" : "Sign In"}
            </button>
          </form>

          <p className="login-note">
            Note: this demo connects to your local MongoDB via the Express API.
            Run the server and sign in with any name and email to try it.
          </p>
        </div>
      </div>
    </div>
  );
}
