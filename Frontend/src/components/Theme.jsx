
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Theme.css";
import heroImage from "../assets/gitcard.png";

function Theme() {
    const [showAuthPrompt, setShowAuthPrompt] = useState(false);
    const navigate = useNavigate();

    return (
        <section className="theme">
            <div className="theme-left">
                <h1>Send Memories Through Time</h1>

                <p>Every Memory Deserves the perfect moment.</p>

                <button onClick={() => setShowAuthPrompt(true)}>
                    Create Time Capsule
                </button>
            </div>

            <div className="theme-right">
                <img src={heroImage} alt="Gift card" />
            </div>

            {showAuthPrompt && (
                <div
                    className="auth-modal-overlay"
                    onClick={() => setShowAuthPrompt(false)}
                >
                    <div
                        className="auth-modal"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="auth-modal-title"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <button
                            className="auth-modal-close"
                            aria-label="Close dialog"
                            onClick={() => setShowAuthPrompt(false)}
                        >
                            &times;
                        </button>

                        <div className="auth-modal-icon">🎁</div>

                        <h2 id="auth-modal-title">
                            Your memories await!
                        </h2>

                        <p>
                            Log in or create an account to start
                            your own Time Capsule.
                        </p>

                        <button
                            className="auth-login-btn"
                            onClick={() => navigate("/login")}
                        >
                            Login
                        </button>

                        <button
                            className="auth-signup-btn"
                            onClick={() => navigate("/signup")}
                        >
                            Create an Account
                        </button>

                        <p className="auth-modal-footer">
                            Every memory deserves the perfect moment.
                        </p>
                    </div>
                </div>
            )}
        </section>
    );
}

export default Theme;
