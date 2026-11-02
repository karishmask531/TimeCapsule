
import { useNavigate, useParams } from "react-router-dom";
import {
  IoArrowBackOutline,
  IoCalendarOutline,
  IoTimeOutline,
  IoMailOutline,
  IoPersonOutline,
  IoPencilOutline,
  IoTrashOutline,
  IoLockClosedOutline,
} from "react-icons/io5";

import {
  getCapsuleById,
  deleteCapsule,
} from "../utils/capsuleStorage";

import "./capsuledetails.css";

function formatDate(date) {
  if (!date) return "Not selected";

  const parsed = new Date(`${date}T00:00:00`);

  if (Number.isNaN(parsed.getTime())) {
    return date;
  }

  return parsed.toLocaleDateString(undefined, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatTime(time) {
  if (!time) return "Not selected";

  const parsed = new Date(`2000-01-01T${time}`);

  if (Number.isNaN(parsed.getTime())) {
    return time;
  }

  return parsed.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function CapsuleDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const capsule = getCapsuleById(id);

  const handleDelete = () => {
    if (!capsule) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete this capsule? This action cannot be undone."
    );

    if (!confirmed) return;

    deleteCapsule(capsule.id);
    navigate("/mycapsules");
  };

  if (!capsule) {
    return (
      <main className="capsule-details-page">
        <section className="capsule-details-card">
          <div className="capsule-details-heading">
            <span className="capsule-details-emoji">🔎</span>
            <h1>Capsule Not Found</h1>
          </div>

          <p>
            This capsule may have been deleted or is no longer
            available in this browser.
          </p>

          <div className="capsule-details-actions">
            <button
              type="button"
              className="capsule-details-edit"
              onClick={() => navigate("/mycapsules")}
            >
              Back to My Capsules
            </button>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="capsule-details-page">
      <header className="capsule-details-topbar">
        <button
          type="button"
          onClick={() => navigate("/mycapsules")}
        >
          <IoArrowBackOutline />
          My Capsules
        </button>

        <span>⏳ TimeCapsule</span>
      </header>

      <section className="capsule-details-card">
        {/* Capsule heading */}
        <div className="capsule-details-heading">
          <span className="capsule-details-emoji">
            💌
          </span>

          <span className="capsule-details-category">
            {capsule.category || "Memories"}
          </span>

          <h1>
            {capsule.title || "Untitled Capsule"}
          </h1>

          <span className="capsule-details-status">
            {capsule.status || "Scheduled"}
          </span>
        </div>

        {/* Optional capsule image */}
        {capsule.image && (
          <img
            className="capsule-details-image"
            src={capsule.image}
            alt={`Image attached to ${capsule.title || "capsule"}`}
          />
        )}

        {/* Capsule information */}
        <div className="capsule-details-information">
          <div>
            <IoPersonOutline />

            <section>
              <span>Recipient</span>
              <strong>
                {capsule.recipientName || "Not specified"}
              </strong>
            </section>
          </div>

          <div>
            <IoMailOutline />

            <section>
              <span>Recipient email</span>
              <strong>
                {capsule.recipientEmail || "Not specified"}
              </strong>
            </section>
          </div>

          <div>
            <IoCalendarOutline />

            <section>
              <span>Delivery date</span>
              <strong>
                {formatDate(capsule.unlockDate)}
              </strong>
            </section>
          </div>

          <div>
            <IoTimeOutline />

            <section>
              <span>Delivery time</span>
              <strong>
                {formatTime(capsule.unlockTime)}
              </strong>
            </section>
          </div>

          <div>
            <IoLockClosedOutline />

            <section>
              <span>Privacy</span>
              <strong>
                {capsule.privacy === "shared"
                  ? "Shared with selected recipients"
                  : "Private"}
              </strong>
            </section>
          </div>
        </div>

        {/* Shared recipients */}
        {capsule.privacy === "shared" &&
          capsule.sharedEmails && (
            <section className="capsule-details-shared">
              <h3>Shared with</h3>
              <p>{capsule.sharedEmails}</p>
            </section>
          )}

        {/* Full message */}
        <div className="capsule-details-message">
          <h2>Your Message</h2>

          <p>
            {capsule.message || "No message added."}
          </p>
        </div>

        {/* Edit and delete actions */}
        <div className="capsule-details-actions">
          <button
            type="button"
            className="capsule-details-edit"
            onClick={() =>
              navigate("/createcapsule", {
                state: {
                  capsule,
                  editMode: true,
                },
              })
            }
          >
            <IoPencilOutline />
            Edit Capsule
          </button>

          <button
            type="button"
            className="capsule-details-delete"
            onClick={handleDelete}
          >
            <IoTrashOutline />
            Delete Capsule
          </button>
        </div>

        {/* Demo notice */}
        <p className="capsule-details-notice">
          Your capsule is stored locally in this browser.
          Scheduled email delivery will be added when the
          backend is implemented.
        </p>
      </section>
    </main>
  );
}
