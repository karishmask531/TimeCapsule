import { Link } from "react-router-dom";
import "./login.css"
function Login() {
    return (
        <div className="Login-container">
            <div className="logo-page">
                <div className="logo-section">
                    <h2>⏳ TimeCapsule</h2>
                </div>
                <div className="heading-section">
                    <h1>Welcome Back 👋</h1>
                    <p>Continue your journey by logging in.</p>
                </div>
                <form className="login-form">
                    <label>Email address</label>
                    <input type="email" placeholder="Enter email address" required />
                    <label>Password</label>
                    <input type="Password" placeholder="Password" required />
                    <p className="forgot-password">forgot password</p>
                    <button type="submit">login</button>
                </form>
                <p className="signup-link">Don't you have an account ? <Link to="/signup">Sign up</Link></p>
            </div>
        </div>
    )
}
export default Login;