import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./login.css";

function Login() {

    const navigate = useNavigate();

    // Input States
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Error States
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [formError, setFormError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    // Password Visibility
    const [showPassword, setShowPassword] = useState(false);

    // Loading State
    const [isLoading, setIsLoading] = useState(false);

    function handleLogin(e) {

        e.preventDefault();

        // Clear previous errors
        setEmailError("");
        setPasswordError("");
        setFormError("");
        setSuccessMessage("");

        let isValid = true;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Email Validation
        if (email.trim() === "") {
            setEmailError("Please enter your email.");
            isValid = false;
        }
        else if (!emailRegex.test(email)) {
            setEmailError("Please enter a valid email.");
            isValid = false;
        }

        // Password Validation
        if (password === "") {
            setPasswordError("Please enter your password.");
            isValid = false;
        }

        if (!isValid) {
            setFormError("⚠ Please correct the errors below.");
            return;
        }

        // Simulate Login API
        setIsLoading(true);

        setTimeout(() => {

            setIsLoading(false);

            setSuccessMessage("✅ Login Successful!");

            setTimeout(() => {

                navigate("/dashboard");

            }, 1500);

        }, 2000);

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

                {formError &&
                    <div className="form-error">
                        {formError}
                    </div>
                }

                {successMessage &&
                    <div className="success-message">
                        {successMessage}
                    </div>
                }

                <form
                    className="login-form"
                    onSubmit={handleLogin}
                >

                    <label>Email Address</label>

                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setEmailError("");
                            setFormError("");
                        }}
                    />

                    {emailError &&
                        <p className="error-message">
                            {emailError}
                        </p>
                    }

                    <label>Password</label>

                    <div className="password-field">
                        <input
                            className="password-input"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setPasswordError("");
                                setFormError("");
                            }}
                        />

                        <button
                            type="button"
                            className="eye-btn"
                            onClick={() => setShowPassword(!showPassword)}
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>

                    {passwordError &&
                        <p className="error-message">
                            {passwordError}
                        </p>
                    }

                    <p className="forgot-password">
                        Forgot Password?
                    </p>

                    <button

                        type="submit"

                        disabled={isLoading}

                    >

                        {isLoading ? "Logging in..." : "Login"}

                    </button>

                </form>

                <p className="signup-link">

                    Don't have an account?

                    <Link to="/signup">

                        {" "}Sign Up

                    </Link>

                </p>

            </div>

        </div>

    );

}

export default Login;