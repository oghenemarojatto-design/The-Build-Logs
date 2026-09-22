import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FiSearch, FiBell, FiEdit } from "react-icons/fi";
import ProfileDropdown from "./ProfileDropdown";
import "./Navbar.css";

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="navbar-wrapper">
      <nav className="navbar">
        {/* Logo */}
        <Link to="/" className="logo">
          <div className="logo-icon">B</div>
          <span>BlueBlog</span>
        </Link>

        {/* Navigation Links */}
        <div className="nav-links">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/posts">Posts</NavLink>
          <NavLink to="/categories">Categories</NavLink>
          <NavLink to="/about">About</NavLink>
        </div>

        {/* Right Side */}
        <div className="nav-right">
          {/* Search */}
          <div className="search-box">
            <FiSearch />
            <input
              type="text"
              placeholder="Search articles..."
            />
          </div>

          {/* Notifications */}
          <button className="icon-btn">
            <FiBell />
          </button>

          {/* Write Post */}
          <Link to="/create-post" className="write-btn">
            <FiEdit />
            <span>Write Post</span>
          </Link>

          {/* Avatar + Dropdown */}
          <div
            className="avatar-wrapper"
            style={{ position: "relative" }}
          >
            <div
              className="avatar"
              onClick={() => setOpen(!open)}
              style={{ cursor: "pointer" }}
            >
              V
            </div>

            {open && <ProfileDropdown />}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;