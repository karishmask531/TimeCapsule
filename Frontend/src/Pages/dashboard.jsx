import "./dashboard.css";
import DashboardCard from "../components/dashboardcard";
import { IoAddCircleOutline, IoLogOutOutline,IoGiftOutline, IoPersonCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
function Dashboard() {
    const navigate = useNavigate();
    return (

        <div className="dashboard">

            <h1>Welcome Back 👋</h1>

            <p>
                Start creating your memories with TimeCapsule.
            </p>
            <div className="dashboard-grid">
                <DashboardCard icon={<IoAddCircleOutline />} title="Create Capsule" description="Create and manage your time capsules." onClick={() => navigate("/createcapsule")} />
                <DashboardCard icon={<IoGiftOutline />} title="MyCapsules" description="View your saved memories." onClick={() => navigate("/mycapsules")} />
                <DashboardCard icon={<IoPersonCircleOutline />} title="Profile" description="Manage your profile and settings." onClick={() => navigate("/profile")}  />
                 <DashboardCard
            icon={<IoLogOutOutline />}
            title="Logout"
            description="Securely sign out."
            onClick={() => navigate("/login")}
        />
            </div>

        </div>

    );
}

export default Dashboard;