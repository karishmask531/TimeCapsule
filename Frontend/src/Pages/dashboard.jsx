
import { useState } from "react";
import "./dashboard.css";
import { useNavigate } from "react-router-dom";

import {
  IoAddOutline,
  IoGiftOutline,
  IoPersonOutline,
  IoLogOutOutline,
  IoTimeOutline,
  IoLockClosedOutline,
  IoHeartOutline,
  IoArrowForwardOutline,
  IoSparklesOutline,
  IoCalendarOutline,
  IoEyeOutline,
} from "react-icons/io5";

import { getCapsules } from "../utils/capsuleStorage";

function Dashboard() {
  const navigate = useNavigate();


  // Load saved capsules from localStorage
  const [capsules] = useState(() => getCapsules());

  // Check whether a capsule's unlock date and time have passed
  const isUnlocked = (capsule) => {
    if (!capsule.unlockDate) return false;

    const unlockDateTime = new Date(
      `${capsule.unlockDate}T${capsule.unlockTime || "00:00"}`
    );

    return (
      !Number.isNaN(unlockDateTime.getTime()) &&
      unlockDateTime <= new Date()
    );
  };

  const totalCapsules = capsules.length;

  const unlockedCapsules = capsules.filter(isUnlocked).length;

  const scheduledCapsules = totalCapsules - unlockedCapsules;

  // Get the three most recently created capsules
  const recentCapsules = [...capsules]
    .sort(
      (a, b) =>
        new Date(b.createdAt || 0) -
        new Date(a.createdAt || 0)
    )
    .slice(0, 3);

  const navigationCards = [
    {
      title: "Create a Capsule",
      description:
        "Capture a beautiful moment and send it into the future.",
      icon: <IoAddOutline />,
      className: "create-card",
      action: () => navigate("/createcapsule"),
      label: "Create now",
    },
    {
      title: "My Capsules",
      description:
        "Explore your saved memories and upcoming surprises.",
      icon: <IoGiftOutline />,
      className: "memories-card",
      action: () => navigate("/mycapsules"),
      label: "View capsules",
    },
    {
      title: "Your Profile",
      description:
        "Keep your personal details and account settings updated.",
      icon: <IoPersonOutline />,
      className: "profile-card",
      action: () => navigate("/profile"),
      label: "View profile",
    },
  ];

  const stats = [
    {
      label: "Total Capsules",
      value: totalCapsules,
      icon: <IoGiftOutline />,
      note: "Your saved memories",
    },
    {
      label: "Scheduled",
      value: scheduledCapsules,
      icon: <IoTimeOutline />,
      note: "Waiting for their moment",
    },
    {
      label: "Unlocked",
      value: unlockedCapsules,
      icon: <IoLockClosedOutline />,
      note: "Ready to revisit",
    },
  ];

  const formatDate = (date) => {
    if (!date) return "Date not available";

    return new Date(`${date}T00:00:00`).toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    );
  };

  return (
    <main className="dashboard-page">
      {/* Navigation */}
      <header className="dashboard-navbar">
        <button
          className="dashboard-brand"
          onClick={() => navigate("/")}
          aria-label="Go to TimeCapsule home"
        >
          <span className="brand-icon">
            <IoTimeOutline />
          </span>
          <span>
            Time<span className="brand-highlight">Capsule</span>
          </span>
        </button>

        <nav className="dashboard-nav-links">
          <button
            className="nav-link active"
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </button>

          <button
            className="nav-link"
            onClick={() => navigate("/mycapsules")}
          >
            My Capsules
          </button>

          <button
            className="nav-link"
            onClick={() => navigate("/profile")}
          >
            Profile
          </button>
        </nav>

        <button
          className="dashboard-logout"
          onClick={() => navigate("/")}
        >
          <IoLogOutOutline />
          <span>Logout</span>
        </button>
      </header>

      <div className="dashboard-content">
        {/* Hero section */}
        <section className="dashboard-hero">
          <div className="hero-decoration hero-decoration-one" />
          <div className="hero-decoration hero-decoration-two" />

          <div className="hero-copy">
            <span className="hero-eyebrow">
              <IoSparklesOutline />
              YOUR PERSONAL MEMORY SPACE
            </span>

            <h1>
              Every moment has
              <br />
              a story worth <span>keeping.</span>
            </h1>

            <p>
              Save today's feelings, celebrate life's milestones,
              and send little pieces of your heart into the future.
            </p>

            <button
              className="hero-create-button"
              onClick={() => navigate("/createcapsule")}
            >
              <IoAddOutline />
              Create New Capsule
              <IoArrowForwardOutline />
            </button>
          </div>

          <div className="hero-art" aria-hidden="true">
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />

            <div className="floating-heart heart-one">
              <IoHeartOutline />
            </div>

            <div className="floating-heart heart-two">
              <IoSparklesOutline />
            </div>

            <div className="memory-box">
              <div className="memory-box-ribbon" />
              <div className="memory-box-bow">♡</div>
              <div className="memory-box-clock">
                <IoTimeOutline />
              </div>
              <span className="memory-box-caption">
                A gift for tomorrow
              </span>
            </div>
          </div>
        </section>

        {/* Statistics */}
        <section className="dashboard-section">
          <div className="section-heading">
            <div>
              <span className="section-kicker">
                YOUR COLLECTION
              </span>
              <h2>Your memory overview</h2>
            </div>

            <span className="overview-date">
              <IoCalendarOutline />
              Your journey starts today
            </span>
          </div>

          <div className="stats-grid">
            {stats.map((stat) => (
              <article className="stat-card" key={stat.label}>
                <div className="stat-card-top">
                  <span className="stat-icon">
                    {stat.icon}
                  </span>
                  <span className="stat-indicator">●</span>
                </div>

                <p>{stat.label}</p>
                <strong>{stat.value}</strong>
                <span className="stat-note">{stat.note}</span>
              </article>
            ))}
          </div>
        </section>

        {/* Recent capsules */}
        <section className="dashboard-section recent-section">
          <div className="section-heading">
            <div>
              <span className="section-kicker">
                YOUR LATEST MEMORIES
              </span>
              <h2>Recently created capsules</h2>
            </div>

            <button
              className="recent-view-all"
              onClick={() => navigate("/mycapsules")}
            >
              View all
              <IoArrowForwardOutline />
            </button>
          </div>

          {recentCapsules.length > 0 ? (
            <div className="recent-capsules-grid">
              {recentCapsules.map((capsule) => (
                <article
                  className="recent-capsule-card"
                  key={capsule.id}
                >
                  <div className="recent-capsule-icon">
                    <IoGiftOutline />
                  </div>

                  <div className="recent-capsule-info">
                    <h3>{capsule.title || "Untitled Capsule"}</h3>

                    <p>
                      To: {capsule.recipientName || "Recipient"}
                    </p>

                    <span>
                      <IoCalendarOutline />
                      Unlocks: {formatDate(capsule.unlockDate)}
                    </span>
                  </div>

                  <span
                    className={`recent-capsule-status ${
                      isUnlocked(capsule)
                        ? "unlocked"
                        : "scheduled"
                    }`}
                  >
                    {isUnlocked(capsule) ? "Unlocked" : "Scheduled"}
                  </span>

                  <button
                    className="recent-capsule-view"
                    onClick={() =>
                      navigate(`/capsule/${capsule.id}`)
                    }
                    aria-label={`View ${capsule.title || "capsule"}`}
                  >
                    <IoEyeOutline />
                  </button>
                </article>
              ))}
            </div>
          ) : (
            <div className="recent-empty">
              <IoGiftOutline />
              <h3>No capsules yet</h3>
              <p>
                Your first memory is waiting to be created.
              </p>

              <button
                onClick={() => navigate("/createcapsule")}
              >
                Create your first capsule
                <IoArrowForwardOutline />
              </button>
            </div>
          )}
        </section>

        {/* Quick actions */}
        <section className="dashboard-section actions-section">
          <div className="section-heading">
            <div>
              <span className="section-kicker">
                MAKE IT MEANINGFUL
              </span>
              <h2>What would you like to do?</h2>
            </div>
          </div>

          <div className="dashboard-actions-grid">
            {navigationCards.map((card) => (
              <button
                className={`action-card ${card.className}`}
                key={card.title}
                onClick={card.action}
              >
                <span className="action-icon">
                  {card.icon}
                </span>

                <span className="action-card-title">
                  {card.title}
                </span>

                <span className="action-description">
                  {card.description}
                </span>

                <span className="action-link">
                  {card.label}
                  <IoArrowForwardOutline />
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Reminder */}
        <section className="memory-note">
          <div className="note-icon">
            <IoHeartOutline />
          </div>

          <div>
            <h3>A little reminder</h3>
            <p>
              The best time to preserve a beautiful memory is
              while you're living it. Your future self will thank you.
            </p>
          </div>

          <span className="note-sparkle">
            <IoSparklesOutline />
          </span>
        </section>

        <footer className="dashboard-footer">
          Made with <IoHeartOutline /> for the moments that matter.
        </footer>
      </div>
    </main>
  );
}

export default Dashboard;
