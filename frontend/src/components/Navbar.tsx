import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FiSearch, FiBell, FiEdit3, FiMenu, FiX, FiBookOpen } from "react-icons/fi";
import ProfileDropdown from "./ProfileDropdown";
import "./Navbar.css";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobileMenu = () => setMobileOpen(false);

  return (
    <header className="navbar-wrapper">
      <nav className="navbar" aria-label="Main navigation">
        <Link to="/" className="logo" aria-label="The Build Logs home" onClick={closeMobileMenu}>
          <span className="logo-icon"><FiBookOpen /></span>
          <span className="logo-wordmark">The Build <strong>Logs</strong></span>
        </Link>

        <div className={`nav-links${mobileOpen ? " nav-links-open" : ""}`}>
          <NavLink to="/" end onClick={closeMobileMenu}>Home</NavLink>
          <NavLink to="/posts" onClick={closeMobileMenu}>Articles</NavLink>
          <NavLink to="/categories" onClick={closeMobileMenu}>Categories</NavLink>
          <NavLink to="/about" onClick={closeMobileMenu}>About</NavLink>
        </div>

        <div className="nav-right">
          <label className="search-box">
            <FiSearch aria-hidden="true" />
            <input type="search" placeholder="Search articles..." aria-label="Search articles" />
          </label>

          <button className="icon-btn" type="button" aria-label="Notifications">
            <FiBell />
          </button>

          <Link to="/create-post" className="write-btn">
            <FiEdit3 />
            <span>Write article</span>
          </Link>

          <div className="avatar-wrapper">
            <button
              className="avatar"
              type="button"
              aria-label="Open profile menu"
              aria-expanded={open}
              onClick={() => setOpen((value) => !value)}
            >
              V
            </button>
            {open && <div className="profile-dropdown-anchor"><ProfileDropdown /></div>}
          </div>

          <button
            className="mobile-menu-btn"
            type="button"
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((value) => !value)}
          >
            {mobileOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
