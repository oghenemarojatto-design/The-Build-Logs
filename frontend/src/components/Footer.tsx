import { Link } from "react-router-dom";
import {
  FaXTwitter,
  FaGithub,
  FaLinkedin,
  FaArrowUp,
} from "react-icons/fa6";
import "./Footer.css";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="footer">
      <div className="footer-container">

        {/* TOP */}
        <div className="footer-top">

          {/* BRAND */}
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <span className="footer-logo-icon">B</span>
              <span>BlueBlog</span>
            </Link>

            <p>
              A modern platform for sharing ideas,
              knowledge, creativity, and connected
              thinking with the world.
            </p>

            <div className="footer-socials">
              <a href="#" aria-label="X">
                <FaXTwitter />
              </a>

              <a href="#" aria-label="GitHub">
                <FaGithub />
              </a>

              <a href="#" aria-label="LinkedIn">
                <FaLinkedin />
              </a>
            </div>
          </div>

          {/* EXPLORE */}
          <div className="footer-column">
            <h3>Explore</h3>

            <Link to="/">Home</Link>
            <Link to="/posts">Articles</Link>
            <Link to="/categories">Categories</Link>
            <Link to="/about">About</Link>
          </div>

          {/* COMMUNITY */}
          <div className="footer-column">
            <h3>Community</h3>

            <Link to="/register">Join BlueBlog</Link>
            <Link to="/create-post">Write an Article</Link>
            <Link to="/profile">Your Profile</Link>
            <Link to="/posts">Discover Writers</Link>
          </div>

          {/* COMPANY */}
          <div className="footer-column">
            <h3>Company</h3>

            <Link to="/about">About Us</Link>
            <a href="#">Contact</a>
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
          </div>

        </div>

        {/* NEWSLETTER */}
        <div className="footer-newsletter">

          <div>
            <span className="newsletter-label">
              Stay connected
            </span>

            <h2>
              Never miss a great idea.
            </h2>

            <p>
              Get the latest stories and insights
              delivered to your inbox.
            </p>
          </div>

          <form
            className="newsletter-form"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Enter your email"
              required
            />

            <button type="submit">
              Subscribe
            </button>
          </form>

        </div>

        {/* BOTTOM */}
        <div className="footer-bottom">

          <div className="footer-legal">
            <span>
              © {new Date().getFullYear()} BlueBlog.
              All rights reserved.
            </span>

            <span>
              Built for curious minds.
            </span>
          </div>

          <button
            className="back-to-top"
            onClick={scrollToTop}
            aria-label="Back to top"
          >
            <FaArrowUp />
          </button>

        </div>

      </div>
    </footer>
  );
}