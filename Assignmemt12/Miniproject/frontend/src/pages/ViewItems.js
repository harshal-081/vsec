
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const API = "http://localhost:5000/api/items";

function ViewItems() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const location = useLocation();

  async function getItems(searchText = "") {
    try {
      const response = await fetch(
        `${API}?search=${encodeURIComponent(searchText)}`
      );

      if (!response.ok) {
        throw new Error("Could not load items.");
      }

      const data = await response.json();
      setItems(data);
    } catch (error) {
      setMessage("Unable to connect to backend.");
    }
  }

  useEffect(() => {
    getItems();
  }, []);

  useEffect(() => {
    if (location.state?.message) {
      setMessage(location.state.message);
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  async function markReturned(id) {
    try {
      const response = await fetch(`${API}/${id}`, {
        method: "PATCH"
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Update failed.");
      }

      await getItems(search);
      setMessage("Item marked as returned.");
    } catch (error) {
      setMessage(error.message || "Could not update item.");
    }
  }

  async function deleteItem(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this item?"
    );

    if (!confirmed) return;

    try {
      const response = await fetch(`${API}/${id}`, {
        method: "DELETE"
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Delete failed.");
      }

      await getItems(search);
      setMessage("Item deleted successfully.");
    } catch (error) {
      setMessage(error.message || "Could not delete item.");
    }
  }

  return (
    <main className="card">
      <span className="hero-tag">✦ CAMPUS ITEM DIRECTORY</span>

      <h2 style={{ marginTop: "20px" }}>Browse Reported Items</h2>
      <p>
        Search for lost belongings or view items reported by other students.
      </p>

      {message && (
        <p className="message" role="status">{message}</p>
      )}

      <div className="items-toolbar">
        <input
          className="search-input"
          type="search"
          value={search}
          onChange={(event) => {
            const value = event.target.value;
            setSearch(value);
            getItems(value);
          }}
          placeholder="🔎  Search by item name..."
          aria-label="Search items by name"
        />

        <Link to="/report" className="button">
          + Report Item
        </Link>
      </div>

      <div className="item-list">
        {items.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🔎</div>
            <h3>No items found</h3>
            <p>
              {search
                ? "Try another search term."
                : "No items have been reported yet. Be the first to report one!"}
            </p>
            {!search && (
              <Link to="/report" className="button">
                Report an Item
              </Link>
            )}
          </div>
        ) : (
          items.map((item) => (
            <article className="item" key={item._id}>
              <div className="badge-row">
                <span
                  className={`status-badge ${
                    item.type === "Lost" ? "badge-lost" : "badge-found"
                  }`}
                >
                  {item.type === "Lost" ? "🔍 Lost Item" : "📦 Found Item"}
                </span>

                <span
                  className={`status-badge ${
                    item.status === "Returned"
                      ? "badge-returned"
                      : "badge-open"
                  }`}
                >
                  {item.status || "Open"}
                </span>
              </div>

              <h3>{item.title}</h3>

              <p>
                <strong>Description:</strong> {item.description}
              </p>

              <p>
                <strong>Location:</strong> {item.location}
              </p>

              <p>
                <strong>Contact:</strong> {item.contact}
              </p>

              <div className="item-actions">
                {item.status === "Open" && (
                  <button onClick={() => markReturned(item._id)}>
                    ✓ Mark Returned
                  </button>
                )}

                <button
                  className="delete"
                  onClick={() => deleteItem(item._id)}
                >
                  Delete
                </button>
              </div>
            </article>
          ))
        )}
      </div>

      <Link to="/" className="button button-secondary">
        ← Back to Home
      </Link>
    </main>
  );
}

export default ViewItems;
