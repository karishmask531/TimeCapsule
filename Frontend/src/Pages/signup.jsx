import { Link } from "react-router-dom";
import "./signup.css";
function Signup() {
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
                <form className="signup-form">
                    <label>Full Name</label>
                    <input type="text" placeholder="Username" required />
                    <label>Email Address</label>
                    <input type="email" placeholder="Email" required />
                    <label>Password</label>
                    <input type="password" placeholder="Password" required />
                    <label>Confirm Password</label>
                    <input type="password" placeholder="Confirm Password" />
                    <button type="submit">Sign Up</button>
                </form>
                <p className="login-link">Already have an account? <Link to="/login">Login here</Link></p>
            </div>
        </div>
    )
}
export default Signup;