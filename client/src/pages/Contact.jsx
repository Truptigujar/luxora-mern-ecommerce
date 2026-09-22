import { useState } from "react";
import { api } from "../api";
import "../styles/InfoPage.css";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState(null); // { type: "success" | "error", text: string }
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    setLoading(true);
    try {
      const res = await api.sendContactMessage(form);
      setStatus({ type: "success", text: res.message || "Message sent successfully." });
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setStatus({ type: "error", text: err.message || "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <section
        className="info-hero"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1600)",
        }}
      >
        <div className="container">
          <p className="eyebrow" style={{ color: "var(--gold-light)" }}>
            Contact Us
          </p>
          <h1 className="info-hero__title">We'd Love To Hear From You</h1>
          <p className="info-hero__subtitle">
            Questions about an order, sizing, or a wholesale enquiry — send us a note
            and a real person will get back to you.
          </p>
        </div>
      </section>

      <div className="info-body">
        <section className="info-section">
          <div className="contact-layout">
            <div className="contact-info-card">
              <h3>Get In Touch</h3>

              <div className="contact-info-row">
                <div className="contact-info-row__icon">@</div>
                <div>
                  <strong>Email</strong>
                  <span>support@luxora.com</span>
                </div>
              </div>

              <div className="contact-info-row">
                <div className="contact-info-row__icon">☎</div>
                <div>
                  <strong>Phone</strong>
                  <span>+91 22 4567 8900</span>
                </div>
              </div>

              <div className="contact-info-row">
                <div className="contact-info-row__icon">⚑</div>
                <div>
                  <strong>Headquarters</strong>
                  <span>14th Floor, Meridian Tower, Bandra Kurla Complex, Mumbai 400051</span>
                </div>
              </div>

              <div className="contact-info-row">
                <div className="contact-info-row__icon">⏱</div>
                <div>
                  <strong>Support Hours</strong>
                  <span>Mon – Sat, 9:30 AM – 7:00 PM IST</span>
                </div>
              </div>
            </div>

            <div className="contact-form-card">
              <form onSubmit={handleSubmit}>
                <div className="contact-form-row">
                  <div className="contact-field">
                    <label>Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div className="contact-field">
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
                </div>

                <div className="contact-field">
                  <label>Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="What's this about?"
                  />
                </div>

                <div className="contact-field">
                  <label>Message</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us how we can help..."
                    required
                  />
                </div>

                <button type="submit" className="contact-submit" disabled={loading}>
                  {loading ? "Sending..." : "Send Message"}
                </button>

                {status && (
                  <div
                    className={`contact-status ${
                      status.type === "success" ? "contact-status--success" : "contact-status--error"
                    }`}
                  >
                    {status.text}
                  </div>
                )}
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
