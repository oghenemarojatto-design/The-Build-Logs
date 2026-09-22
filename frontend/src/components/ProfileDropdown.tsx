import {
    FiUser,
    FiGrid,
    FiBookmark,
    FiBell,
    FiSettings,
    FiLogOut,
    FiFileText,
    FiChevronRight
} from "react-icons/fi";

import { Link } from "react-router-dom";

import "./ProfileDropdown.css";

export default function ProfileDropdown(){

    return(

        <div className="profile-dropdown">

            <div className="profile-header">

                <div className="profile-avatar">
                    V
                </div>

                <div>

                    <h4>
                        Victor Jatto
                    </h4>

                    <p>
                        victor@email.com
                    </p>

                    <small>
                        Premium Member
                    </small>

                </div>

            </div>

            <Link to="/dashboard">
                <span><FiGrid/> Dashboard</span>
                <FiChevronRight/>
            </Link>

            <Link to="/profile">
                <span><FiUser/> My Profile</span>
                <FiChevronRight/>
            </Link>

            <Link to="/my-posts">
                <span><FiFileText/> My Posts</span>
                <FiChevronRight/>
            </Link>

            <Link to="/bookmarks">
                <span><FiBookmark/> Bookmarks</span>

                <div className="badge">
                    12
                </div>
            </Link>

            <Link to="/notifications">
                <span><FiBell/> Notifications</span>

                <div className="badge">
                    4
                </div>
            </Link>

            <Link to="/settings">
                <span><FiSettings/> Settings</span>
                <FiChevronRight/>
            </Link>

            <button className="logout-btn">

                <FiLogOut/>

                Logout

            </button>

        </div>

    )

}