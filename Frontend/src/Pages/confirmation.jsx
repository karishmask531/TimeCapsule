
import { useLocation, useNavigate } from "react-router-dom";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import "./confirmation.css";

export default function Confirmation() {
  const navigate = useNavigate();
  const location = useLocation();
  const capsule = location.state?.capsule;

  return (
    <main className="confirmation-page">
      <section className="confirmation-card">
        <div className="confirmation-icon">
          <IoCheckmarkCircleOutline />
        </div>

        <span className="confirmation-label">TIME CAPSULE</span>

        <h1>You're all set!</h1>

        <p className="confirmation-subtitle">
          You've completed the capsule details and preview.
        </p>

        {capsule && (
          <div className="confirmation-summary">
            <span className="confirmation-summary-icon">💌</span>
            <div>
              <h2>{capsule.title}</h2>
              <p>For {capsule.recipientName}</p>
              <p>
                Unlock date:{" "}
                {new Date(`${capsule.unlockDate}T00:00:00`).toLocaleDateString(
                  undefined,
                  { day: "numeric", month: "long", year: "numeric" }
                )}
              </p>
            </div>
          </div>
        )}

        <div className="confirmation-demo-notice">
          <strong>Demo mode</strong>
          <p>
            Form validated successfully! Demo only — your capsule has not
            been saved or scheduled.
          </p>
          <p>
            Connect the backend later to save your capsule and enable scheduled
            delivery and recipient access controls.
          </p>
        </div>

        <div className="confirmation-actions">
          <button
            className="confirmation-primary"
            onClick={() => navigate("/dashboard")}
          >
            Back to Dashboard
          </button>

          <button
            className="confirmation-secondary"
            onClick={() =>
              navigate("/createcapsule", {
                state: capsule ? { capsule } : undefined,
              })
            }
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
