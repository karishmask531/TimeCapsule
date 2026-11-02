
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    IoPersonOutline,
    IoImageOutline,
    IoCardOutline,
    IoLockClosedOutline,
    IoNotificationsOutline,
    IoShieldCheckmarkOutline,
    IoTrashOutline,
    IoArrowBackOutline,
    IoLogOutOutline,
    IoCloudUploadOutline,
    IoPersonCircleOutline
} from "react-icons/io5";

import "./profile.css";

function Profile() {

    const navigate = useNavigate();

    const [activeSection, setActiveSection] = useState("personal");

    // Profile picture state
    const [profileImage, setProfileImage] = useState(
        () => localStorage.getItem("timecapsule_profile_image") || ""
    );

    const [imageMessage, setImageMessage] = useState("");
    const [imageMessageType, setImageMessageType] = useState("");

    // Sidebar menu
    const menuItems = [
        {
            id: "personal",
            label: "Personal Information",
            icon: <IoPersonOutline />
        },
        {
            id: "picture",
            label: "Profile Picture",
            icon: <IoImageOutline />
        },
        {
            id: "account",
            label: "Account Details",
            icon: <IoCardOutline />
        },
        {
            id: "password",
            label: "Change Password",
            icon: <IoLockClosedOutline />
        },
        {
            id: "notifications",
            label: "Notifications",
            icon: <IoNotificationsOutline />
        },
        {
            id: "security",
            label: "Account Security",
            icon: <IoShieldCheckmarkOutline />
        },
        {
            id: "delete",
            label: "Delete Account",
            icon: <IoTrashOutline />
        }
    ];

    const activeItem = menuItems.find(
        (item) => item.id === activeSection
    );

    // Upload profile picture
    const handleImageUpload = (e) => {

        const file = e.target.files[0];

        if (!file) return;

        setImageMessage("");
        setImageMessageType("");

        if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
            setImageMessage("Please select a JPG, PNG or WEBP image.");
            setImageMessageType("error");
            e.target.value = "";
            return;
        }

        if (file.size > 2 * 1024 * 1024) {
            setImageMessage("Image size should be less than 2 MB.");
            setImageMessageType("error");
            e.target.value = "";
            return;
        }

        const reader = new FileReader();

        reader.onloadend = () => {

            try {
                const imageData = reader.result;

                localStorage.setItem(
                    "timecapsule_profile_image",
                    imageData
                );

                setProfileImage(imageData);
                setImageMessage("Profile picture updated successfully!");
                setImageMessageType("success");

            } catch {
    setImageMessage(
        "Unable to save image. Try a smaller image."
    );
    setImageMessageType("error");
}

        };

        reader.onerror = () => {
            setImageMessage("Unable to read the selected image.");
            setImageMessageType("error");
        };

        reader.readAsDataURL(file);

        e.target.value = "";
    };

    // Remove profile picture
    const handleRemoveImage = () => {

        localStorage.removeItem("timecapsule_profile_image");

        setProfileImage("");
        setImageMessage("Profile picture removed successfully!");
        setImageMessageType("success");
    };

    // Profile picture section
    const renderPictureSection = () => (

        <div className="profile-picture-section">

            <div className="profile-picture-preview">

                {profileImage ? (
                    <img
                        src={profileImage}
                        alt="Your profile"
                    />
                ) : (
                    <IoPersonCircleOutline />
                )}

            </div>

            <h3>Your Profile Picture</h3>

            <p>
                Upload a picture to personalize your TimeCapsule account.
            </p>

            <div className="profile-picture-actions">

                <label className="profile-upload-btn">

                    <IoCloudUploadOutline />

                    Upload Picture

                    <input
                        type="file"
                        accept="image/png, image/jpeg, image/webp"
                        onChange={handleImageUpload}
                        hidden
                    />

                </label>

                {profileImage && (

                    <button
                        className="profile-remove-image-btn"
                        onClick={handleRemoveImage}
                    >
                        <IoTrashOutline />
                        Remove Picture
                    </button>

                )}

            </div>

            {imageMessage && (

                <p className={`profile-image-message ${imageMessageType}`}>
                    {imageMessage}
                </p>

            )}

            <div className="profile-image-info">

                <p>Supported formats: JPG, PNG and WEBP</p>
                <p>Maximum image size: 2 MB</p>

            </div>

        </div>
    );

    return (

        <div className="profile-settings-page">

            <div className="profile-settings-container">

                {/* Header */}

                <div className="profile-settings-header">

                    <button
                        className="profile-back-btn"
                        onClick={() => navigate("/dashboard")}
                    >
                        <IoArrowBackOutline />
                        Back to Dashboard
                    </button>

                    <div>
                        <h1>Account Settings</h1>

                        <p>
                            Manage your TimeCapsule account and preferences.
                        </p>
                    </div>

                </div>

                {/* Settings Layout */}

                <div className="profile-settings-layout">

                    {/* Sidebar */}

                    <aside className="profile-sidebar">

                        <div className="profile-sidebar-user">

                            <div className="profile-sidebar-avatar">

                                {profileImage ? (
                                    <img
                                        src={profileImage}
                                        alt="Profile"
                                    />
                                ) : (
                                    "TC"
                                )}

                            </div>

                            <div>
                                <h3>Your Profile</h3>
                                <p>Manage your account</p>
                            </div>

                        </div>

                        <div className="profile-sidebar-menu">

                            <p className="profile-menu-heading">
                                ACCOUNT SETTINGS
                            </p>

                            {menuItems.map((item) => (

                                <button
                                    key={item.id}
                                    className={`profile-menu-item ${
                                        activeSection === item.id
                                            ? "active"
                                            : ""
                                    }`}
                                    onClick={() => {
                                        setActiveSection(item.id);
                                        setImageMessage("");
                                    }}
                                >

                                    <span className="profile-menu-icon">
                                        {item.icon}
                                    </span>

                                    <span>{item.label}</span>

                                </button>

                            ))}

                        </div>

                        <button
                            className="profile-logout-btn"
                            onClick={() => navigate("/login")}
                        >
                            <IoLogOutOutline />
                            Sign Out
                        </button>

                    </aside>

                    {/* Main Content */}

                    <main className="profile-settings-content">

                        <div className="profile-content-heading">

                            <h2>{activeItem?.label}</h2>

                            <p>
                                Manage your {activeItem?.label.toLowerCase()} settings.
                            </p>

                        </div>

                        {/* Profile Picture */}

                        {activeSection === "picture" ? (

                            renderPictureSection()

                        ) : (

                            <div className="profile-content-placeholder">

                                <div className="profile-placeholder-icon">
                                    {activeItem?.icon}
                                </div>

                                <h3>{activeItem?.label}</h3>

                                <p>
                                    This section will be implemented in the
                                    upcoming steps.
                                </p>

                            </div>

                        )}

                    </main>

                </div>

            </div>

        </div>

    );
}

export default Profile;
