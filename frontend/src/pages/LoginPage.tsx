import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaGoogle,
  FaGithub,
  FaFacebookF,
  FaEye,
  FaEyeSlash,
  FaArrowRight,
  FaCheckCircle,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

import "./LoginPage.css";

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      navigate("/dashboard");
    }, 1200);
  };

  return (
    <div className="login-page">

      <div className="login-background"></div>

      <div className="login-container">

        {/* LEFT SIDE */}

        <div className="login-left">

          <div className="brand">

            <div className="brand-logo">
              B
            </div>

            <h2>BlueBlog</h2>

          </div>

          <span className="premium-tag">
            Premium Knowledge Platform
          </span>

          <h1>
            Build.
            <br />
            Connect.
            <br />
            Inspire.
          </h1>

          <p>
            Join thousands of creators sharing technology,
            science, AI and modern ideas with the world.
          </p>

          <div className="feature-list">

            <div className="feature">

              <FaCheckCircle />

              <span>Create unlimited articles</span>

            </div>

            <div className="feature">

              <FaCheckCircle />

              <span>Build your professional profile</span>

            </div>

            <div className="feature">

              <FaCheckCircle />

              <span>Connect with global readers</span>

            </div>

            <div className="feature">

              <FaCheckCircle />

              <span>Bookmark & save articles</span>

            </div>

          </div>

        </div>

        {/* RIGHT SIDE */}

        <div className="login-right">

          <div className="login-card">

            <h2>Welcome Back 👋</h2>

            <p>
              Sign in to continue your journey.
            </p>

            <form onSubmit={handleLogin}>

              <div className="input-group">

                <label>Email or Username</label>

                <input
                  type="text"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

              </div>

              <div className="input-group">

                <label>Password</label>

                <div className="password-box">

                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />

                  <button
                    type="button"
                    className="eye-btn"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                  >
                    {showPassword ? (
                      <FaEyeSlash />
                    ) : (
                      <FaEye />
                    )}
                  </button>

                </div>

              </div>

              <div className="login-options">

                <label className="remember">

                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={() =>
                      setRemember(!remember)
                    }
                  />

                  Remember me

                </label>

                <Link to="#">
                  Forgot Password?
                </Link>

              </div>

              <button
                className="login-btn"
                disabled={loading}
              >
                {loading ? (
                  "Signing In..."
                ) : (
                  <>
                    Sign In
                    <FaArrowRight />
                  </>
                )}
              </button>

            </form>

            <div className="divider">
              <span>OR CONTINUE WITH</span>
            </div>

            <div className="social-login">

              <button className="social-btn">
                <FaGoogle />
                Google
              </button>

              <button className="social-btn">
                <FaGithub />
                GitHub
              </button>

              <button className="social-btn">
                <FaFacebookF />
                Facebook
              </button>

              <button className="social-btn">
                <FaXTwitter />
                X
              </button>

            </div>

            <p className="bottom-text">

              Don't have an account?

              <Link to="/register">
                Create one
              </Link>

            </p>

          </div>

        </div>

      </div>

    </div>
  );
}