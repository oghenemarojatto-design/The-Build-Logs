import {
  FiUser,
  FiGrid,
  FiBookmark,
  FiBell,
  FiSettings,
  FiLogOut,
  FiFileText,
  FiChevronRight,
} from "react-icons/fi";

import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./ProfileDropdown.css";

interface ProfileDropdownProps {
  onClose: () => void;
}

export default function ProfileDropdown({
  onClose,
}: ProfileDropdownProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const fullName =
    `${user?.first_name || ""} ${user?.last_name || ""}`.trim() ||
    user?.username ||
    "User";

  const initials =
    `${user?.first_name?.[0] || ""}${user?.last_name?.[0] || ""}`.toUpperCase() ||
    user?.username?.[0]?.toUpperCase() ||
    "U";

  const handleLogout = () => {
    onClose();
    logout();
    navigate("/login");
  };

  return (
    <div className="profile-dropdown">
      <div className="profile-header">
        <div className="profile-avatar">{initials}</div>

        <div>
          <h4>{fullName}</h4>
          <p>{user?.email || "No email added"}</p>
        </div>
      </div>

      <Link to="/dashboard" onClick={onClose}>
        <span><FiGrid /> Dashboard</span>
        <FiChevronRight />
      </Link>

      <Link to="/profile" onClick={onClose}>
        <span><FiUser /> My Profile</span>
        <FiChevronRight />
      </Link>

      <Link to="/my-posts" onClick={onClose}>
        <span><FiFileText /> My Posts</span>
        <FiChevronRight />
      </Link>

      <Link to="/bookmarks" onClick={onClose}>
        <span><FiBookmark /> Bookmarks</span>
        <FiChevronRight />
      </Link>

      <Link to="/notifications" onClick={onClose}>
        <span><FiBell /> Notifications</span>
        <FiChevronRight />
      </Link>

      <Link to="/settings" onClick={onClose}>
        <span><FiSettings /> Settings</span>
        <FiChevronRight />
      </Link>

      <button
        className="logout-btn"
        type="button"
        onClick={handleLogout}
      >
        <FiLogOut />
        Logout
      </button>
    </div>
  );
}