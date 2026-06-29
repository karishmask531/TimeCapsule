import { Link,useNavigate } from "react-router-dom";
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
    const [formError, setFormError] = useState("");
    const [confirmPassworderror, setConfirmPassworderror] = useState("");
    const [ successMessage, setsuccessMessage ] = useState("");

    function handleSignup(event) {
        event.preventDefault();

        // Clear previous errors
        setFormError("");
        setFullNameError("");
        setEmailerror("");
        setPasswordError("");
        setConfirmPassworderror("");

        let isValid = true;

        const nameRegex = /^[A-Za-z\s]+$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

        // Full Name
        if (fullName.trim() === "") {
            setFullNameError("Please enter your full name.");
            isValid = false;
        }
        else if (fullName.trim().length < 3) {
            setFullNameError("Full name should contain at least 3 characters.");
            isValid = false;
        }
        else if (!nameRegex.test(fullName)) {
            setFullNameError("Full name should contain only alphabets and spaces.");
            isValid = false;
        }

        // Email
        if (email.trim() === "") {
            setEmailerror("Please enter your email.");
            isValid = false;
        }
        else if (!emailRegex.test(email)) {
            setEmailerror("Please enter a valid email.");
            isValid = false;
        }

        // Password
        if (password === "") {
            setPasswordError("Please enter your password.");
            isValid = false;
        }
        else if (!passwordRegex.test(password)) {
            setPasswordError(
                "Password must contain 8+ characters, uppercase, lowercase, number and special character."
            );
            isValid = false;
        }

        // Confirm Password
        if (confirmPassword === "") {
            setConfirmPassworderror("Please confirm your password.");
            isValid = false;
        }
        else if (password !== confirmPassword) {
            setConfirmPassworderror("Passwords do not match.");
            isValid = false;
        }

        if (!isValid) {
            setFormError("⚠ Please correct the errors below before creating your account.");
            return;
        }

        setsuccessMessage("🎉 Account created successfully! Redirecting to Login...");
        setTimeout(() => {
    navigate("/login");
}, 2000);

        // Later we will call backend API here
    }
    return (
        <div className="signup-container">
            <div className="signup-page">
                <div className="logo-section">
                    <h2>⏳ TimeCapsule</h2>
                </div>
                <div className="heading-section">
                    <h1>Create Account</h1>
                    <p className="signup-description">Start preserving your memories with TimeCapsule!</p>
                </div>
              
                {formError && (
                    <div className="form-error">
                        {formError}
                    </div>
                )}
                  {successMessage && (
                    <div className="success-message">
                        {successMessage}
                    </div>
                )}
                <form className="signup-form">
                    <label>Full Name</label>
                    <input
                        type="text"
                        placeholder="Username"
                        value={fullName}
                        onChange={(e) => {
                            setFullname(e.target.value);
                            setFullNameError("");
                            setFormError("");
                        }}
                        required
                    />
                    {fullNameError && (
                        <p className="error-message">
                            {fullNameError}
                        </p>
                    )}
                    <label>Email Address</label>
                    <input type="email" placeholder="Email" value={email} onChange={(e) => {
                        setEmail(e.target.value);
                        setEmailerror("");
                        setFormError("");
                    }} required />
                    {emailError && (
                        <p className="error-message">
                            {emailError}
                        </p>
                    )}
                    <label>Password</label>
                    <input type="password" placeholder="Password" value={password} onChange={(e) => {
                        setPassword(e.target.value); setPasswordError("");
                        setFormError("");
                    }}
                        required />
                    {passwordError && (
                        <p className="error-message">
                            {passwordError}
                        </p>
                    )}
                    <label>Confirm Password</label>
                    <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => {
                        setConfirmpassword(e.target.value); setConfirmPassworderror("");
                        setFormError("");
                    }} />
                    {confirmPassworderror && (
                        <p className="error-message">
                            {confirmPassworderror}
                        </p>
                    )}
                    <button type="submit" onClick={handleSignup}>Sign Up</button>
                </form>
                <p className="login-link">Already have an account? <Link to="/login">Login here</Link></p>
            </div>
        </div>
    )
}
export default Signup;