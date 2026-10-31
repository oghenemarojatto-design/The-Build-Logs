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

export default function ProfileDropdown() {
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
logout();
navigate("/login");
};

return ( <div className="profile-dropdown"> <div className="profile-header"> <div className="profile-avatar">{initials}</div>

```
    <div>
      <h4>{fullName}</h4>
      <p>{user?.email || "No email added"}</p>
    </div>
  </div>

  <Link to="/dashboard">
    <span><FiGrid /> Dashboard</span>
    <FiChevronRight />
  </Link>

  <Link to="/profile">
    <span><FiUser /> My Profile</span>
    <FiChevronRight />
  </Link>

  <Link to="/my-posts">
    <span><FiFileText /> My Posts</span>
    <FiChevronRight />
  </Link>

  <Link to="/bookmarks">
    <span><FiBookmark /> Bookmarks</span>
    <FiChevronRight />
  </Link>

  <Link to="/notifications">
    <span><FiBell /> Notifications</span>
    <FiChevronRight />
  </Link>

  <Link to="/settings">
    <span><FiSettings /> Settings</span>
    <FiChevronRight />
  </Link>

  <button className="logout-btn" onClick={handleLogout}>
    <FiLogOut />
    Logout
  </button>
</div>


);
}
