
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API = "http://localhost:5000/api/items";

function ReportItem() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({
    title: "",
    description: "",
    type: "Lost",
    location: "",
    contact: ""
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previousForm) => ({
      ...previousForm,
      [name]: value
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");

    try {
      const response = await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit report.");
      }

      navigate("/items", {
        state: {
          message: "Report submitted successfully!"
        }
      });
    } catch (error) {
      setMessage(
        error.message || "Unable to connect to backend."
      );
    }
  }

  return (
    <main className="card">
      <span className="hero-tag">✦ HELP YOUR CAMPUS COMMUNITY</span>

      <h2 style={{ marginTop: "20px" }}>Report an Item</h2>
      <p>
        Share the details below to help reunite an item with its owner.
      </p>

      {message && <p className="message" role="alert">{message}</p>}

      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="title">Item Name *</label>
            <input
              id="title"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="e.g. Black wallet"
              required
            />
          </div>

          <div className="form-group">
            <label>Report Type *</label>
            <div className="type-selector">
              <label className={`type-option ${form.type === "Lost" ? "selected" : ""}`}>
                <input
                  type="radio"
                  name="type"
                  value="Lost"
                  checked={form.type === "Lost"}
                  onChange={handleChange}
                />
                <span>🔍 Lost</span>
              </label>

              <label className={`type-option ${form.type === "Found" ? "selected" : ""}`}>
                <input
                  type="radio"
                  name="type"
                  value="Found"
                  checked={form.type === "Found"}
                  onChange={handleChange}
                />
                <span>📦 Found</span>
              </label>
            </div>
          </div>

          <div className="form-group full-width">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Describe the item, its color, brand, or other identifying details..."
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="location">Location *</label>
            <input
              id="location"
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="e.g. College library"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="contact">Contact Information *</label>
            <input
              id="contact"
              name="contact"
              value={form.contact}
              onChange={handleChange}
              placeholder="Phone number or email"
              required
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit">Submit Report →</button>
          <Link to="/" className="button button-secondary">
            Cancel
          </Link>
        </div>
      </form>
    </main>
  );
}

export default ReportItem;
