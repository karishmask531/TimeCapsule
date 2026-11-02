
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./signup.css";

function Signup() {
    const navigate = useNavigate();

    const [fullName, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmpassword] = useState("");

    const [fullNameError, setFullNameError] = useState("");
    const [emailError, setEmailerror] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPassworderror, setConfirmPassworderror] = useState("");
    const [formError, setFormError] = useState("");
    const [successMessage, setsuccessMessage] = useState("");

    const [showPassword, setShowpassword] = useState(false);
    const [showconfirmPassword, setShowConfirmpassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    function validateEmail(value) {
        const trimmedEmail = value.trim();
        const emailRegex =
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

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

        if (
            localPart.length > 64 ||
            localPart.startsWith(".") ||
            localPart.endsWith(".") ||
            localPart.includes("..") ||
            domain.includes("..") ||
            domain.startsWith(".") ||
            domain.endsWith(".")
        ) {
            return "Please enter a valid email address.";
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

    function handleSignup(event) {
        event.preventDefault();

        if (isLoading) return;

        setFormError("");
        setFullNameError("");
        setEmailerror("");
        setPasswordError("");
        setConfirmPassworderror("");
        setsuccessMessage("");

        let isValid = true;

        const trimmedName = fullName.trim();
        const nameRegex = /^[A-Za-z]+(?:[ '-][A-Za-z]+)*$/;

        // Full name validation
        if (!trimmedName) {
            setFullNameError("Please enter your full name.");
            isValid = false;
        } else if (trimmedName.length < 3) {
            setFullNameError("Full name should contain at least 3 characters.");
            isValid = false;
        } else if (trimmedName.length > 100) {
            setFullNameError("Full name cannot exceed 100 characters.");
            isValid = false;
        } else if (!nameRegex.test(trimmedName)) {
            setFullNameError(
                "Use letters, spaces, hyphens or apostrophes only."
            );
            isValid = false;
        }

        // Email validation
        const emailValidationError = validateEmail(email);

        if (emailValidationError) {
            setEmailerror(emailValidationError);
            isValid = false;
        }

        // Password validation
        const passwordValidationError = validatePassword(password);

        if (passwordValidationError) {
            setPasswordError(passwordValidationError);
            isValid = false;
        }

        // Confirm password validation
        if (!confirmPassword) {
            setConfirmPassworderror("Please confirm your password.");
            isValid = false;
        } else if (password !== confirmPassword) {
            setConfirmPassworderror("Passwords do not match.");
            isValid = false;
        }

        if (!isValid) {
            setFormError("Please correct the errors below before continuing.");
            return;
        }

        // Frontend demonstration only.
        // Real account creation will be implemented with the backend API.
        setIsLoading(true);

        setsuccessMessage(
            "Details validated successfully! Backend registration is not connected yet."
        );

        setTimeout(() => {
            setIsLoading(false);
            navigate("/login");
        }, 2000);
    }

    return (
        <div className="signup-container">
            <div className="signup-page">
                <div className="logo-section">
                    <h2>⏳ TimeCapsule</h2>
                </div>

                <div className="heading-section">
                    <h1>Create Account</h1>
                    <p className="signup-description">
                        Start preserving your memories with TimeCapsule!
                    </p>
                </div>

                {formError && (
                    <div className="form-error" role="alert">
                        ⚠ {formError}
                    </div>
                )}

                {successMessage && (
                    <div className="success-message" role="status">
                        {successMessage}
                    </div>
                )}

                <form
                    className="signup-form"
                    onSubmit={handleSignup}
                    noValidate
                >
                    <label htmlFor="signup-name">
                        Full Name <span className="required-star">*</span>
                    </label>

                    <input
                        id="signup-name"
                        type="text"
                        placeholder="Enter your full name"
                        value={fullName}
                        autoComplete="name"
                        maxLength={100}
                        disabled={isLoading}
                        aria-invalid={Boolean(fullNameError)}
                        onChange={(event) => {
                            setFullname(event.target.value);
                            setFullNameError("");
                            setFormError("");
                            setsuccessMessage("");
                        }}
                    />

                    {fullNameError && (
                        <p className="error-message" role="alert">
                            {fullNameError}
                        </p>
                    )}

                    <label htmlFor="signup-email">
                        Email Address <span className="required-star">*</span>
                    </label>

                    <input
                        id="signup-email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        autoComplete="email"
                        maxLength={254}
                        disabled={isLoading}
                        aria-invalid={Boolean(emailError)}
                        onChange={(event) => {
                            setEmail(event.target.value);
                            setEmailerror("");
                            setFormError("");
                            setsuccessMessage("");
                        }}
                    />

                    {emailError && (
                        <p className="error-message" role="alert">
                            {emailError}
                        </p>
                    )}

                    <label htmlFor="signup-password">
                        Password <span className="required-star">*</span>
                    </label>

                    <div className="password-field">
                        <input
                            id="signup-password"
                            className="password-input"
                            type={showPassword ? "text" : "password"}
                            placeholder="Create a password"
                            value={password}
                            autoComplete="new-password"
                            maxLength={128}
                            disabled={isLoading}
                            aria-invalid={Boolean(passwordError)}
                            onChange={(event) => {
                                setPassword(event.target.value);
                                setPasswordError("");
                                setConfirmPassworderror("");
                                setFormError("");
                                setsuccessMessage("");
                            }}
                        />

                        <button
                            type="button"
                            className="toggle-password"
                            onClick={() => setShowpassword(!showPassword)}
                            aria-label={
                                showPassword ? "Hide password" : "Show password"
                            }
                            disabled={isLoading}
                        >
                            {showPassword ? "🙈" : "👁"}
                        </button>
                    </div>

                    {passwordError && (
                        <p className="error-message" role="alert">
                            {passwordError}
                        </p>
                    )}

                    <label htmlFor="signup-confirm-password">
                        Confirm Password{" "}
                        <span className="required-star">*</span>
                    </label>

                    <div className="password-field">
                        <input
                            id="signup-confirm-password"
                            className="password-input"
                            type={showconfirmPassword ? "text" : "password"}
                            placeholder="Confirm your password"
                            value={confirmPassword}
                            autoComplete="new-password"
                            maxLength={128}
                            disabled={isLoading}
                            aria-invalid={Boolean(confirmPassworderror)}
                            onChange={(event) => {
                                setConfirmpassword(event.target.value);
                                setConfirmPassworderror("");
                                setFormError("");
                                setsuccessMessage("");
                            }}
                        />

                        <button
                            type="button"
                            className="toggle-password"
                            onClick={() =>
                                setShowConfirmpassword(!showconfirmPassword)
                            }
                            aria-label={
                                showconfirmPassword
                                    ? "Hide confirm password"
                                    : "Show confirm password"
                            }
                            disabled={isLoading}
                        >
                            {showconfirmPassword ? "🙈" : "👁"}
                        </button>
                    </div>

                    {confirmPassworderror && (
                        <p className="error-message" role="alert">
                            {confirmPassworderror}
                        </p>
                    )}

                    <p className="required-note">
                        <span className="required-star">*</span> Indicates a
                        mandatory field
                    </p>

                    <button type="submit" disabled={isLoading}>
                        {isLoading ? "Creating account..." : "Sign Up"}
                    </button>
                    <button
  type="button"
  className="cancel-btn"
  onClick={() => navigate("/")}
>
  Cancel
</button>
                </form>

                <p className="login-link">
                    Already have an account? <Link to="/login">Login here</Link>
                </p>
            </div>
        </div>
    );
}

export default Signup;
