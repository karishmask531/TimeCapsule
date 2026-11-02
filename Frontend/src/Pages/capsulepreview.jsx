
import "./capsulepreview.css";

export default function CapsulePreview({
  capsule,
  onClose,
  onConfirm,
}) {
  if (!capsule) return null;

  return (
    <div
      className="capsule-preview-overlay"
      onClick={onClose}
    >
      <section
        className="capsule-preview-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="capsule-preview-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="capsule-preview-close"
          onClick={onClose}
          aria-label="Close preview"
        >
          ×
        </button>

        <div className="capsule-preview-heading">
          <span>💌</span>
          <p>YOUR MEMORY, SEALED IN TIME</p>
          <h2 id="capsule-preview-title">
            Preview Your Capsule
          </h2>
          <p>Take a moment to review your message.</p>
        </div>

        <div className="capsule-preview-details">
          <div className="capsule-preview-label">
            CAPSULE TITLE
          </div>
          <h3>{capsule.title || "Untitled capsule"}</h3>

          <div className="capsule-preview-info">
            <p>
              <strong>Recipient:</strong>{" "}
              {capsule.recipientName}
            </p>

            <p>
              <strong>Email:</strong>{" "}
              {capsule.recipientEmail}
            </p>

            <p>
              <strong>Category:</strong>{" "}
              {capsule.category || "Memories"}
            </p>

            <p>
              <strong>Access:</strong>{" "}
              {capsule.privacy === "shared"
                ? "Shared"
                : "Private"}
            </p>

            <p>
              <strong>Delivery date:</strong>{" "}
              {capsule.unlockDate}
            </p>

            <p>
              <strong>Delivery time:</strong>{" "}
              {capsule.unlockTime}
            </p>

            {capsule.privacy === "shared" &&
              capsule.sharedEmails?.trim() && (
                <p>
                  <strong>Additional recipients:</strong>{" "}
                  {capsule.sharedEmails}
                </p>
              )}
          </div>

          {capsule.image && (
            <div className="capsule-preview-image">
              <img
                src={
                  typeof capsule.image === "string"
                    ? capsule.image
                    : URL.createObjectURL(capsule.image)
                }
                alt="Your selected memory"
              />
            </div>
          )}

          <div className="capsule-preview-message">
            <span>✉️ Your message</span>
            <p>{capsule.message}</p>
          </div>

          <p className="capsule-preview-notice">
            This capsule is saved locally in your browser
            after confirmation. Automatic email delivery
            will require a backend.
          </p>
        </div>

        <div className="capsule-preview-actions">
          <button
            type="button"
            className="capsule-preview-edit"
            onClick={onClose}
          >
            ← Back to Edit
          </button>

          <button
            type="button"
            className="capsule-preview-confirm"
            onClick={onConfirm}
          >
            Confirm &amp; Save →
          </button>
        </div>
      </section>
    </div>
  );
}
