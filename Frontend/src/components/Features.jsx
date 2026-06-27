import "./Feature.css";
function Features() {
  return (
    <section  className="features">
        <h2>why choose TimeCapsule</h2>
        <div className="features-list">
            <div className="feature-card">
            <h3>📅</h3>
            <h4>
                Schedule Messages
            </h4>
            <p>Plan and schedule your messages to be delivered at the perfect moment.</p>
            </div>
            <div className="feature-card">
            <h3>🔒</h3>
            <h4>
                Secure login
            </h4>
            <p>
                Protect your account with our advanced security features.
            </p>
            </div>
            <div className="feature-card">
            <h3>📧</h3>
            <h4>
                Email Notifications
            </h4>
            <p>
                Stay updated with timely email alerts about your time capsules.
            </p>
            </div>
            <div className="feature-card">
            <h3>🎁</h3>
            <h4>
                Beautiful Gift Cards
            </h4>
            <p>
                Create and send beautiful gift cards to your loved ones.
            </p>
            </div>
        </div>
    </section>
  );
}
export default Features;