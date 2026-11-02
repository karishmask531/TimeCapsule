
import { useLocation, useNavigate } from "react-router-dom";
import {
  IoCheckmarkCircleOutline,
  IoCalendarOutline,
  IoTimeOutline,
  IoMailOutline,
} from "react-icons/io5";
import "./confirmation.css";

export default function Confirmation() {
  const navigate = useNavigate();
  const location = useLocation();
  const capsule = location.state?.capsule;

  const formattedDate = capsule?.unlockDate
    ? new Date(`${capsule.unlockDate}T00:00:00`).toLocaleDateString(
        undefined,
        {
          day: "numeric",
          month: "long",
          year: "numeric",
        }
      )
    : "Not selected";

  const formattedTime = capsule?.unlockTime
    ? new Date(`2000-01-01T${capsule.unlockTime}`).toLocaleTimeString(
        [],
        {
          hour: "numeric",
          minute: "2-digit",
        }
      )
    : "Not selected";

  return (
    <main className="confirmation-page">
      <section className="confirmation-card">
        <div className="confirmation-icon">
          <IoCheckmarkCircleOutline />
        </div>

        <span className="confirmation-label">TIME CAPSULE</span>

        <h1>Capsule Saved Successfully!</h1>

        <p className="confirmation-subtitle">
          Your capsule details have been saved in this browser.
        </p>

        {capsule ? (
          <div className="confirmation-summary">
            <span className="confirmation-summary-icon">💌</span>

            <div className="confirmation-summary-details">
              <h2>{capsule.title || "Untitled Capsule"}</h2>
              <p>For {capsule.recipientName || "your recipient"}</p>

              <p className="confirmation-detail">
                <IoMailOutline />
                {capsule.recipientEmail || "No email provided"}
              </p>

              <p className="confirmation-detail">
                <IoCalendarOutline />
                Delivery date: {formattedDate}
              </p>

              <p className="confirmation-detail">
                <IoTimeOutline />
                Delivery time: {formattedTime}
              </p>
            </div>
          </div>
        ) : (
          <p className="confirmation-subtitle">
            No capsule details were received. You can create a new capsule
            below.
          </p>
        )}

        <div className="confirmation-demo-notice">
          <strong>Frontend demo mode</strong>
          <p>
            Your capsule is saved locally in this browser. It is not yet
            stored in a backend database.
          </p>
          <p>
            Scheduled email notifications and secure recipient access
            will be implemented when we build the backend.
          </p>
        </div>

        <div className="confirmation-actions">
          <button
            type="button"
            className="confirmation-primary"
            onClick={() => navigate("/mycapsules")}
          >
            View My Capsules
          </button>

          <button
            type="button"
            className="confirmation-secondary"
            onClick={() => navigate("/dashboard")}
          >
            Back to Dashboard
          </button>

          <button
            type="button"
            className="confirmation-secondary"
            onClick={() => navigate("/createcapsule")}
          >
            Create Another Capsule
          </button>
        </div>

        <p className="confirmation-footer">
          Every memory has a moment worth remembering. ✨
        </p>
      </section>
    </main>
  );
}
