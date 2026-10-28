
import { useState } from "react";
import {
  IoCloseOutline,
  IoCalendarOutline,
  IoMailOutline,
  IoPersonOutline,
} from "react-icons/io5";
import CapsuleImage from "./CapsuleImage";
import "./capsulepreview.css";

export default function CapsulePreview({
  capsule,
  onClose,
  onConfirm,
  onCancel,
}) {
  const [showCancelDialog, setShowCancelDialog] = useState(false);

  if (!capsule) return null;

  const formattedDate = capsule.unlockDate
    ? new Date(`${capsule.unlockDate}T00:00:00`).toLocaleDateString(
        undefined,
        { day: "numeric", month: "long", year: "numeric" }
      )
    : "Not selected";

  return (
    <div
      className="preview-modal-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className="preview-modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="preview-modal-title"
      >
        <header className="preview-modal-header">
          <div>
            <span className="preview-modal-badge">PREVIEW MODE</span>
            <h2 id="preview-modal-title">Review your capsule</h2>
            <p>Make sure everything looks right before continuing.</p>
          </div>

          <button
            type="button"
            className="preview-modal-close"
            onClick={onClose}
            aria-label="Close preview"
          >
            <IoCloseOutline size={25} />
          </button>
        </header>

        <div className="preview-modal-content">
          {capsule.image && (
            <CapsuleImage
              image={capsule.image}
              alt="Capsule memory"
              className="preview-modal-image"
            />
          )}

          <div className="preview-modal-details">
            <span className="preview-modal-category">
              {capsule.category}
            </span>

            <h3>{capsule.title}</h3>

            <div className="preview-modal-info">
              <p>
                <IoPersonOutline />
                <span>Recipient: {capsule.recipientName}</span>
              </p>

              <p>
                <IoMailOutline />
                <span>{capsule.recipientEmail}</span>
              </p>

              <p>
                <IoCalendarOutline />
                <span>Unlock date: {formattedDate}</span>
              </p>
            </div>

            <div className="preview-modal-privacy">
              <strong>
                {capsule.privacy === "private"
                  ? "🔒 Private capsule"
                  : "👥 Shared capsule"}
              </strong>

              <p>
                {capsule.privacy === "private"
                  ? "Intended for the primary recipient."
                  : "Intended for the primary recipient and specified additional recipients."}
              </p>

              {capsule.privacy === "shared" &&
                capsule.sharedEmails?.trim() && (
                  <p className="preview-modal-emails">
                    Additional recipients: {capsule.sharedEmails}
                  </p>
                )}
            </div>

            <div className="preview-modal-message">
              <h4>Your message</h4>
              <p>{capsule.message}</p>
            </div>
          </div>
        </div>

        <p className="preview-modal-demo">
          Demo only: this capsule has not been saved or scheduled.
        </p>

        <footer className="preview-modal-actions">
          <button
            type="button"
            className="preview-modal-secondary"
            onClick={() => setShowCancelDialog(true)}
          >
            Cancel
          </button>

          <button
            type="button"
            className="preview-modal-secondary"
            onClick={onClose}
          >
            Edit Details
          </button>

          <button
            type="button"
            className="preview-modal-primary"
            onClick={onConfirm}
          >
            Confirm Capsule →
          </button>
        </footer>
      </section>

      {showCancelDialog && (
        <div
          className="preview-cancel-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setShowCancelDialog(false);
            }
          }}
        >
          <section
            className="preview-cancel-dialog"
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="preview-cancel-title"
          >
            <h3 id="preview-cancel-title">Cancel this capsule?</h3>

            <p>
              Are you sure you want to discard your entered details and return
              to the dashboard?
            </p>

            <div className="preview-cancel-actions">
              <button
                type="button"
                className="preview-modal-secondary"
                onClick={() => setShowCancelDialog(false)}
              >
                No, Keep Editing
              </button>

              <button
                type="button"
                className="preview-modal-primary"
                onClick={onCancel}
              >
                Yes, Cancel
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
