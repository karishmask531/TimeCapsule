import { saveCapsule } from "../utils/capsuleStorage";
import { useMemo, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  IoArrowBackOutline,
  IoCloudUploadOutline,
} from "react-icons/io5";
import CapsulePreview from "./capsulepreview";
import "./createcapsule.css";

const emptyCapsule = {
  title: "",
  recipientName: "",
  recipientEmail: "",
  privacy: "private",
  sharedEmails: "",
  category: "Friends",
  message: "",
  unlockDate: "",
  unlockTime: "",
  image: null,
};

export default function CreateCapsule() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showPreview, setShowPreview] = useState(false);
  const existing = location.state?.capsule;

  const [form, setForm] = useState(() => ({
    ...emptyCapsule,
    ...(existing || {}),
    // Support older capsules that don't have a delivery time.
    unlockTime: existing?.unlockTime || "",
  }));

  const [error, setError] = useState("");
  const [showCancelDialog, setShowCancelDialog] = useState(false);

  const imagePreview = useMemo(() => {
    if (!form.image) return "";
    if (typeof form.image === "string") return form.image;
    return URL.createObjectURL(form.image);
  }, [form.image]);

  useEffect(() => {
    return () => {
      if (imagePreview?.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const updateField = (event) => {
    const { name, value, files } = event.target;
    setError("");

    if (name === "image") {
      const file = files?.[0];
      if (!file) return;

      if (!file.type.startsWith("image/")) {
        setError("Please select a valid image.");
        event.target.value = "";
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setError("Image size must be 5 MB or less.");
        event.target.value = "";
        return;
      }

      setForm((prev) => ({ ...prev, image: file }));
      return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePreview = (event) => {
    event.preventDefault();
    setError("");

    if (
      !form.title.trim() ||
      !form.recipientName.trim() ||
      !form.recipientEmail.trim() ||
      !form.message.trim() ||
      !form.unlockDate ||
      !form.unlockTime
    ) {
      setError(
        "Please fill in all required fields, including the delivery date and time."
      );
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(form.recipientEmail.trim())) {
      setError("Please enter a valid recipient email address.");
      return;
    }

    if (form.message.trim().length < 20) {
      setError("Your message must contain at least 20 characters.");
      return;
    }

    // Interpret the selected date and time in the sender's local timezone.
    const scheduledAt = new Date(
      `${form.unlockDate}T${form.unlockTime}`
    );

    if (
      Number.isNaN(scheduledAt.getTime()) ||
      scheduledAt.getTime() <= Date.now()
    ) {
      setError(
        "Please select a delivery date and time in the future."
      );
      return;
    }

    if (form.privacy === "shared" && form.sharedEmails.trim()) {
      const emails = form.sharedEmails
        .split(",")
        .map((email) => email.trim())
        .filter(Boolean);

      if (emails.some((email) => !emailPattern.test(email))) {
        setError("Please check the additional email addresses.");
        return;
      }

      const allEmails = [
        form.recipientEmail.trim(),
        ...emails,
      ].map((email) => email.toLowerCase());

      if (new Set(allEmails).size !== allEmails.length) {
        setError("Please remove duplicate email addresses.");
        return;
      }
    }

    setShowPreview(true);
  };

  const today = new Date();
  const localToday = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");

const handleConfirmCapsule = () => {
  const saveWithImage = (imageData) => {
    const savedCapsule = saveCapsule({
      ...form,
      id: form.id,
      image: imageData || null,
    });

    navigate("/confirmation", {
      state: { capsule: savedCapsule },
    });
  };

  if (form.image instanceof File) {
    const reader = new FileReader();

    reader.onloadend = () => {
      saveWithImage(reader.result);
    };

    reader.readAsDataURL(form.image);
  } else {
    saveWithImage(form.image || null);
  }
};


  return (
    <main className="capsule-page">
      <div className="capsule-topbar">
        <button
          type="button"
          className="capsule-back"
          onClick={() => navigate("/dashboard")}
        >
          <IoArrowBackOutline /> Dashboard
        </button>
        <span className="capsule-brand">⏳ TimeCapsule</span>
      </div>

      <section className="capsule-card">
        <div className="capsule-heading">
          <span className="capsule-icon">💌</span>
          <h1>Create a Time Capsule</h1>
          <p>
            Write a memory today. Let it be discovered in the future.
          </p>
        </div>

        <form onSubmit={handlePreview} className="capsule-form">
          <div className="capsule-field">
            <label htmlFor="title">
              Capsule title <span className="required-mark">*</span>
            </label>
            <input
              id="title"
              name="title"
              value={form.title}
              onChange={updateField}
              placeholder="e.g. A letter to my future self"
              maxLength={100}
              required
            />
          </div>

          <div className="capsule-grid">
            <div className="capsule-field">
              <label htmlFor="recipientName">
                Recipient name <span className="required-mark">*</span>
              </label>
              <input
                id="recipientName"
                name="recipientName"
                value={form.recipientName}
                onChange={updateField}
                placeholder="Enter recipient's name"
                required
              />
            </div>

            <div className="capsule-field">
              <label htmlFor="recipientEmail">
                Recipient email <span className="required-mark">*</span>
              </label>
              <input
                id="recipientEmail"
                name="recipientEmail"
                type="email"
                value={form.recipientEmail}
                onChange={updateField}
                placeholder="name@example.com"
                required
              />
            </div>
          </div>

          <div className="capsule-field">
            <label>Who can access this capsule?</label>
            <div className="privacy-options">
              <label
                className={`privacy-option ${
                  form.privacy === "private" ? "selected" : ""
                }`}
              >
                <input
                  type="radio"
                  name="privacy"
                  value="private"
                  checked={form.privacy === "private"}
                  onChange={updateField}
                />
                <span>🔒</span>
                <strong>Private</strong>
                <small>Intended for the primary recipient</small>
              </label>

              <label
                className={`privacy-option ${
                  form.privacy === "shared" ? "selected" : ""
                }`}
              >
                <input
                  type="radio"
                  name="privacy"
                  value="shared"
                  checked={form.privacy === "shared"}
                  onChange={updateField}
                />
                <span>👥</span>
                <strong>Shared</strong>
                <small>Specify additional recipients</small>
              </label>
            </div>

            <p className="capsule-note">
              These privacy choices are currently UI-only. Actual
              recipient access restrictions will be implemented with
              the backend.
            </p>
          </div>

          {form.privacy === "shared" && (
            <div className="capsule-field">
              <label htmlFor="sharedEmails">
                Additional recipient emails
              </label>
              <input
                id="sharedEmails"
                name="sharedEmails"
                value={form.sharedEmails}
                onChange={updateField}
                placeholder="friend@example.com, family@example.com"
              />
              <small>Separate email addresses with commas.</small>
            </div>
          )}

          <div className="capsule-field">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={form.category}
              onChange={updateField}
            >
              <option value="">Select a category</option>
              <option value="Friends">👯 Friends</option>
              <option value="Family">🏡 Family</option>
              <option value="Cousins">💖 Cousins</option>
              <option value="Love & Romance">❤️ Love & Romance</option>
              <option value="Birthday">🎂 Birthday</option>
              <option value="Anniversary">💍 Anniversary</option>
              <option value="School Memories">🎓 School Memories</option>
              <option value="College Memories">🏫 College Memories</option>
              <option value="Travel">✈️ Travel</option>
              <option value="Festivals & Celebrations">
                🎉 Festivals & Celebrations
              </option>
              <option value="Special Moments">✨ Special Moments</option>
              <option value="Future Self">⏳ Future Self</option>
              <option value="Achievements">🏆 Achievements</option>
              <option value="Thank You">🙏 Thank You</option>
              <option value="Apology">💌 Apology</option>
              <option value="Other">🌈 Other</option>
            </select>
          </div>

          <div className="capsule-grid">
            <div className="capsule-field">
              <label htmlFor="unlockDate">
                Delivery date <span className="required-mark">*</span>
              </label>
              <input
                id="unlockDate"
                name="unlockDate"
                type="date"
                min={localToday}
                value={form.unlockDate}
                onChange={updateField}
                required
              />
            </div>

            <div className="capsule-field">
              <label htmlFor="unlockTime">
                Delivery time <span className="required-mark">*</span>
              </label>
              <input
                id="unlockTime"
                name="unlockTime"
                type="time"
                value={form.unlockTime}
                onChange={updateField}
                required
              />
              <small>
                Uses your device's local time for now.
              </small>
            </div>
          </div>

          <div className="capsule-field">
            <label htmlFor="message">
              Your message <span className="required-mark">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              value={form.message}
              onChange={updateField}
              placeholder="Write a heartfelt message for the future..."
              rows={6}
              maxLength={5000}
              required
            />
            <small>
              {form.message.length}/5000 characters (minimum 20)
            </small>
          </div>

          <div className="capsule-field">
            <label htmlFor="image">
              Add a memory image (optional)
            </label>
            <label className="capsule-upload" htmlFor="image">
              <IoCloudUploadOutline size={28} />
              <strong>Choose an image</strong>
              <span>JPG, PNG or other image format · Max 5 MB</span>
            </label>
            <input
              className="capsule-file-input"
              id="image"
              name="image"
              type="file"
              accept="image/*"
              onChange={updateField}
            />

            {imagePreview && (
              <div className="capsule-image-preview">
                <img
                  src={imagePreview}
                  alt="Selected memory preview"
                />
                <button
                  type="button"
                  className="capsule-remove-image"
                  onClick={() =>
                    setForm((prev) => ({ ...prev, image: null }))
                  }
                >
                  Remove image
                </button>
              </div>
            )}
          </div>

          {error && (
            <p className="capsule-error" role="alert">
              {error}
            </p>
          )}

          <div className="capsule-actions">
            <button
              type="button"
              className="capsule-secondary-btn"
              onClick={() => setShowCancelDialog(true)}
            >
              Cancel
            </button>
            <button type="submit" className="capsule-primary-btn">
              Preview Capsule →
            </button>
          </div>
        </form>
      </section>

      {showCancelDialog && (
        <div className="capsule-modal-overlay">
          <div
            className="capsule-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cancel-capsule-title"
          >
            <h2 id="cancel-capsule-title">Cancel this capsule?</h2>
            <p>
              Your entered details will be discarded if you leave.
              Are you sure you want to return to the dashboard?
            </p>
            <div className="capsule-actions">
              <button
                type="button"
                className="capsule-secondary-btn"
                onClick={() => setShowCancelDialog(false)}
              >
                Keep Editing
              </button>
              <button
                type="button"
                className="capsule-primary-btn"
                onClick={() => navigate("/dashboard")}
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}

     {showPreview && (
  <CapsulePreview
    capsule={{
      ...form,
      image: imagePreview || null,
    }}
    onClose={() => setShowPreview(false)}
    onConfirm={handleConfirmCapsule}
  />
)}
    </main>
  );
}
