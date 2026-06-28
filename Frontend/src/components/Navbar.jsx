 import {Link} from "react-router-dom";
import "./Navbar.css";
function Navbar() {
    return (
        <nav className="navbar">   
            <h2 className="logo">TimeCapsule</h2>
            <div className="nav-buttons">
                <Link to="/login">
                    <button>Login</button>
                </Link>
                <Link to="/signup">
                    <button>Sign Up</button>
                </Link>
            </div>
        </nav>
    );
}
export default Navbar;