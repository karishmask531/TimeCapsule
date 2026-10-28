import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./login.css";

function Login() {
  const navigate = useNavigate();

  // Input states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Error states
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Password visibility
  const [showPassword, setShowPassword] = useState(false);

  // Loading state
  const [isLoading, setIsLoading] = useState(false);

  function validateEmail(value) {
    const trimmedEmail = value.trim();

    // Basic email format validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!trimmedEmail) {
      return "Please enter your email.";
    }

    if (trimmedEmail.length > 254) {
      return "Email address is too long.";
    }

    if (!emailRegex.test(trimmedEmail)) {
      return "Please enter a valid email address.";
    }

    const [localPart, domain] = trimmedEmail.split("@");

    if (localPart.length > 64) {
      return "The email username is too long.";
    }

    if (localPart.startsWith(".") || localPart.endsWith(".")) {
      return "Email cannot start or end with a dot before @.";
    }

    if (localPart.includes("..")) {
      return "Email cannot contain consecutive dots.";
    }

    if (
      domain.includes("..") ||
      domain.startsWith(".") ||
      domain.endsWith(".")
    ) {
      return "Please enter a valid email domain.";
    }

    return "";
  }

  function validatePassword(value) {
    if (!value) {
      return "Please enter your password.";
    }

    if (/\s/.test(value)) {
      return "Password cannot contain spaces.";
    }

    if (value.length < 8) {
      return "Password must contain at least 8 characters.";
    }

    if (value.length > 128) {
      return "Password cannot exceed 128 characters.";
    }

    if (!/[A-Z]/.test(value)) {
      return "Include at least one uppercase letter (A-Z).";
    }

    if (!/[a-z]/.test(value)) {
      return "Include at least one lowercase letter (a-z).";
    }

    if (!/[0-9]/.test(value)) {
      return "Include at least one number (0-9).";
    }

    if (!/[^A-Za-z0-9\s]/.test(value)) {
      return "Include at least one special character, such as @ or #.";
    }

    return "";
  }

  function handleLogin(e) {
    e.preventDefault();

    if (isLoading) return;

    setEmailError("");
    setPasswordError("");
    setFormError("");
    setSuccessMessage("");

    const emailValidationError = validateEmail(email);
    const passwordValidationError = validatePassword(password);

    setEmailError(emailValidationError);
    setPasswordError(passwordValidationError);

    if (emailValidationError || passwordValidationError) {
      setFormError("Please correct the errors below.");
      return;
    }

    // Frontend demonstration only; no real authentication yet.
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setSuccessMessage("Login form validated successfully!");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    }, 800);
  }

  return (
    <div className="login-container">
      <div className="login-page">
        <div className="logo-section">
          <h2>⏳ TimeCapsule</h2>
        </div>

        <div className="heading-section">
          <h1>Welcome Back 👋</h1>
          <p>Continue your journey by logging in.</p>
        </div>

        {formError && (
          <div className="form-error" role="alert">
            ⚠ {formError}
          </div>
        )}

        {successMessage && (
          <div className="success-message" role="status">
            ✅ {successMessage}
          </div>
        )}

        <form className="login-form" onSubmit={handleLogin} noValidate>
          <label htmlFor="login-email">
            Email Address <span className="required-star">*</span>
          </label>

          <input
            id="login-email"
            type="email"
            placeholder="Enter your email"
            value={email}
            autoComplete="email"
            maxLength={254}
            disabled={isLoading}
            aria-invalid={Boolean(emailError)}
            aria-describedby={emailError ? "email-error" : undefined}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError("");
              setFormError("");
              setSuccessMessage("");
            }}
          />

          {emailError && (
            <p id="email-error" className="error-message" role="alert">
              {emailError}
            </p>
          )}

          <label htmlFor="login-password">
            Password <span className="required-star">*</span>
          </label>

          <div className="password-field">
            <input
              id="login-password"
              className="password-input"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              autoComplete="current-password"
              maxLength={128}
              disabled={isLoading}
              aria-invalid={Boolean(passwordError)}
              aria-describedby={passwordError ? "password-error" : undefined}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError("");
                setFormError("");
                setSuccessMessage("");
              }}
            />

            <button
              type="button"
              className="eye-btn"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              disabled={isLoading}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {passwordError && (
            <p id="password-error" className="error-message" role="alert">
              {passwordError}
            </p>
          )}

          <p className="forgot-password">Forgot Password?</p>

          <button type="submit" disabled={isLoading}>
            {isLoading ? "Checking..." : "Login"}
          </button>
        </form>

        <p className="signup-link">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
