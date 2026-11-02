
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  IoArrowBackOutline,
  IoAddOutline,
  IoSearchOutline,
  IoCalendarOutline,
  IoTimeOutline,
  IoMailOutline,
  IoHeartOutline,
  IoFilterOutline,
  IoTrashOutline,
  IoEyeOutline,
  IoRefreshOutline,
} from "react-icons/io5";

import {
  getCapsules,
  deleteCapsule,
} from "../utils/capsuleStorage";

import "./mycapsule.css";

function formatDate(date) {
  if (!date) return "Date not set";

  const parsedDate = new Date(`${date}T00:00:00`);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return parsedDate.toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatTime(time) {
  if (!time) return "Time not set";

  const parsedTime = new Date(`2000-01-01T${time}`);

  if (Number.isNaN(parsedTime.getTime())) {
    return time;
  }

  return parsedTime.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });
}

function getCapsuleEmoji(category) {
  const emojiMap = {
    Friends: "💌",
    Family: "🏡",
    Cousins: "🎓",
    "Future Self": "⏳",
    Love: "❤️",
    Birthday: "🎂",
    Travel: "✈️",
    Memories: "📸",
  };

  return emojiMap[category] || "💝";
}

function MyCapsules() {
  const navigate = useNavigate();

  const [capsules, setCapsules] = useState(() => getCapsules());
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");

  const categories = useMemo(() => {
    const savedCategories = capsules
      .map((capsule) => capsule.category)
      .filter(Boolean);

    return ["All", ...new Set(savedCategories)];
  }, [capsules]);

  const filteredCapsules = useMemo(() => {
    const query = search.trim().toLowerCase();

    return capsules.filter((capsule) => {
      const title = (capsule.title || "").toLowerCase();
      const recipientName = (
        capsule.recipientName ||
        capsule.recipient ||
        ""
      ).toLowerCase();
      const recipientEmail = (
        capsule.recipientEmail || ""
      ).toLowerCase();

      const matchesSearch =
        title.includes(query) ||
        recipientName.includes(query) ||
        recipientEmail.includes(query);

      const matchesCategory =
        category === "All" || capsule.category === category;

      const matchesStatus =
        status === "All" || capsule.status === status;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesStatus
      );
    });
  }, [capsules, search, category, status]);

  const scheduledCount = capsules.filter(
    (capsule) => capsule.status === "Scheduled"
  ).length;

  const deliveredCount = capsules.filter(
    (capsule) => capsule.status === "Delivered"
  ).length;

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this capsule? This action cannot be undone."
    );

    if (!confirmed) return;

    const remainingCapsules = deleteCapsule(id);
    setCapsules(remainingCapsules);
  };

  const handleRefresh = () => {
    setCapsules(getCapsules());
  };

 const handlePreview = (capsule) => {
  navigate(`/capsule/${capsule.id}`);
};

  const clearFilters = () => {
    setSearch("");
    setCategory("All");
    setStatus("All");
  };

  return (
    <main className="mycapsules-page">
      <header className="mycapsules-topbar">
        <button
          type="button"
          className="mycapsules-back"
          onClick={() => navigate("/dashboard")}
        >
          <IoArrowBackOutline />
          Dashboard
        </button>

        <span className="mycapsules-brand">
          ⏳ TimeCapsule
        </span>

        <button
          type="button"
          className="mycapsules-create"
          onClick={() => navigate("/createcapsule")}
        >
          <IoAddOutline />
          Create Capsule
        </button>
      </header>

      <section className="mycapsules-content">
        <div className="mycapsules-heading">
          <span className="mycapsules-eyebrow">
            YOUR MEMORY COLLECTION
          </span>

          <h1>My Capsules</h1>

          <p>
            Every message holds a memory. Find all your moments
            in one place.
          </p>
        </div>

        {/* Capsule statistics */}
        <div className="mycapsules-stats">
          <article className="mycapsules-stat-card">
            <span className="mycapsules-stat-icon purple">
              💌
            </span>

            <div>
              <p>Total Capsules</p>
              <h2>{capsules.length}</h2>
            </div>
          </article>

          <article className="mycapsules-stat-card">
            <span className="mycapsules-stat-icon orange">
              ⏳
            </span>

            <div>
              <p>Scheduled</p>
              <h2>{scheduledCount}</h2>
            </div>
          </article>

          <article className="mycapsules-stat-card">
            <span className="mycapsules-stat-icon green">
              ✓
            </span>

            <div>
              <p>Delivered</p>
              <h2>{deliveredCount}</h2>
            </div>
          </article>
        </div>

        {/* Capsule list */}
        <section className="mycapsules-list-section">
          <div className="mycapsules-list-heading">
            <div>
              <h2>Your collection</h2>
              <p>
                Explore your saved capsules and their delivery
                dates.
              </p>
            </div>

            <div className="mycapsules-heading-actions">
              <span className="mycapsules-count">
                {filteredCapsules.length}{" "}
                {filteredCapsules.length === 1
                  ? "capsule"
                  : "capsules"}
              </span>

              <button
                type="button"
                className="mycapsules-refresh"
                onClick={handleRefresh}
                title="Refresh capsules"
                aria-label="Refresh capsules"
              >
                <IoRefreshOutline />
              </button>
            </div>
          </div>

          {/* Search and filters */}
          <div className="mycapsules-toolbar">
            <div className="mycapsules-search">
              <IoSearchOutline />

              <input
                type="search"
                aria-label="Search capsules"
                placeholder="Search by title, recipient, or email..."
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
              />
            </div>

            <div className="mycapsules-filter">
              <IoFilterOutline />

              <select
                aria-label="Filter by category"
                value={category}
                onChange={(event) =>
                  setCategory(event.target.value)
                }
              >
                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item === "All"
                      ? "All categories"
                      : item}
                  </option>
                ))}
              </select>
            </div>

            <div className="mycapsules-filter">
              <select
                aria-label="Filter by status"
                value={status}
                onChange={(event) =>
                  setStatus(event.target.value)
                }
              >
                <option value="All">All statuses</option>
                <option value="Scheduled">Scheduled</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>

          {/* Capsule cards */}
          {filteredCapsules.length > 0 ? (
            <div className="mycapsules-grid">
              {filteredCapsules.map((capsule) => (
                <article
                  className="mycapsule-card"
                  key={capsule.id}
                >
                  <div className="mycapsule-card-top">
                    <span className="mycapsule-emoji">
                      {capsule.emoji ||
                        getCapsuleEmoji(capsule.category)}
                    </span>

                    <span
                      className={`mycapsule-status ${
                        capsule.status === "Delivered"
                          ? "delivered"
                          : "scheduled"
                      }`}
                    >
                      {capsule.status === "Delivered"
                        ? "✓ Delivered"
                        : "◷ Scheduled"}
                    </span>
                  </div>

                  <span className="mycapsule-category">
                    {capsule.category || "Memories"}
                  </span>

                  <h3>{capsule.title || "Untitled capsule"}</h3>

                  <p className="mycapsule-recipient">
                    <IoHeartOutline />

                    For{" "}
                    {capsule.recipientName ||
                      capsule.recipient ||
                      "Your recipient"}
                  </p>

                  {capsule.recipientEmail && (
                    <p className="mycapsule-recipient-email">
                      <IoMailOutline />
                      {capsule.recipientEmail}
                    </p>
                  )}

                  <div className="mycapsule-delivery">
                    <p>
                      <IoCalendarOutline />
                      {formatDate(
                        capsule.unlockDate || capsule.date
                      )}
                    </p>

                    <p>
                      <IoTimeOutline />
                      {formatTime(
                        capsule.unlockTime || capsule.time
                      )}
                    </p>
                  </div>

                  <div className="mycapsule-card-footer">
                    <span>
                      <IoMailOutline />
                      {capsule.privacy === "shared"
                        ? "Shared capsule"
                        : "Private capsule"}
                    </span>

                    <div className="mycapsule-card-actions">
                      <button
                        type="button"
                        className="mycapsule-view-button"
                        onClick={() => handlePreview(capsule)}
                        title="View capsule"
                        aria-label={`View ${capsule.title}`}
                      >
                        <IoEyeOutline />
                      </button>

                      <button
                        type="button"
                        className="mycapsule-delete-button"
                        onClick={() =>
                          handleDelete(capsule.id)
                        }
                        title="Delete capsule"
                        aria-label={`Delete ${capsule.title}`}
                      >
                        <IoTrashOutline />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="mycapsules-empty">
              <span>
                {capsules.length === 0 ? "💌" : "🔎"}
              </span>

              <h3>
                {capsules.length === 0
                  ? "Your collection is waiting"
                  : "No capsules found"}
              </h3>

              <p>
                {capsules.length === 0
                  ? "Create your first time capsule and save a special memory for the future."
                  : "Try a different search or change your filters."}
              </p>

              {capsules.length === 0 ? (
                <button
                  type="button"
                  onClick={() => navigate("/createcapsule")}
                >
                  <IoAddOutline />
                  Create your first capsule
                </button>
              ) : (
                <button
                  type="button"
                  onClick={clearFilters}
                >
                  Clear filters
                </button>
              )}
            </div>
          )}
        </section>

        <p className="mycapsules-demo-notice">
          Your capsules are currently saved in this browser.
          Automatic email delivery and secure account-based storage
          will be connected when the backend is implemented.
        </p>
      </section>
    </main>
  );
}

export default MyCapsules;
