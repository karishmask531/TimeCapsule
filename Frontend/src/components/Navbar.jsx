import "./Navbar.css";
function Navbar() {
    return (
        <nav className="navbar">   
            <h2 className="logo">TimeCapsule</h2>
            <div className="nav-buttons">
                <button>Login</button>
                <button>Sign Up</button>
            </div>
        </nav>
    );
}
export default Navbar;