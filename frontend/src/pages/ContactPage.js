// ContactPage.js
import { useState } from "react";

const ContactPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      setError("Please fill all fields.");
      setSuccess("");
      return;
    }

    setError("");
    setSuccess("Message sent successfully! 🌅");

    setForm({
      name: "",
      email: "",
      message: ""
    });
  };

  return (
    <div className="contact-page page-container">

      {/* HERO */}
      <section className="contact-hero">
        <div className="about-hero-text">
          <h1>Share your peaceful moments 🌅</h1>
          <p>
            If you have a question or want to share a sunset that made you feel calm,
            send a message below.
          </p>
        </div>
      </section>

      {/* FORM */}
      <section className="contact-form-card">
        <form onSubmit={handleSubmit} className="register-form">

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
          />

          <textarea
            name="message"
            placeholder="Your Message..."
            rows="5"
            value={form.message}
            onChange={handleChange}
          />

          {error && <p className="error-msg">{error}</p>}
          {success && <p className="success-msg">{success}</p>}

          <button type="submit">Send Message</button>
        </form>
      </section>

      {/* RESOURCES */}
      <section className="about-section">
          <h2>Useful Resources</h2>

          <div className="feature-cards">

            <div className="feature-card">
              <h3>Calm Nature Sounds</h3>
              <p>Music to listen to while watching the sky.</p>
            </div>

            <div className="feature-card">
              <h3>Peaceful Skies Blog</h3>
              <p>Essays and poems inspired by sunsets.</p>
            </div>

            <div className="feature-card">
              <h3>Tripod</h3>
              <p>Keep your camera steady during sunset shots.</p>
            </div>

          </div>
      </section>

      {/* BEST VIEWING SPOT (MOVED FROM HTML) */}
      <section className="about-section">

          <h2>Best Viewing Spot 📍</h2>

          <iframe
            title="Best Viewing Spot"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4414.781712564207!2d2.292765605117028!3d48.85735396345788!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e2964e34e2d%3A0x8ddca9ee380ef7e0!2sEiffel%20Tower!5e0!3m2!1sen!2sph!4v1768649845193!5m2!1sen!2sph"
            width="100%"
            height="300"
            style={{
              border: "0",
              borderRadius: "12px",
              marginTop: "15px"
            }}
            allowFullScreen=""
            loading="lazy"
          />
      </section>

      {/* FOOTER */}
      <footer className="footer">
        Contact: angmmd@gmail.com | © 2026 Serenity - All Rights Reserved.
      </footer>

    </div>
  );
};

export default ContactPage;