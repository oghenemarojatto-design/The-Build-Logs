import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  FaGoogle,
  FaGithub,
  FaFacebook,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

import { FaXTwitter } from "react-icons/fa6";

import "./RegisterPage.css";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [agree, setAgree] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleRegister = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    if (!agree) {
      alert("Please accept the Terms & Conditions.");
      return;
    }

    setLoading(true);

    // Temporary demo registration

    setTimeout(() => {
      setLoading(false);

      navigate("/login");
    }, 1500);
  };

  return (
    <div className="register-page">

      <div className="register-overlay"></div>

      <div className="register-card">

        <div className="register-header">

          <div className="logo-circle">
            B
          </div>

          <h1>Create Account</h1>

          <p>
            Join BlueBlog and start sharing ideas with
            creators around the world.
          </p>

        </div>

        <form onSubmit={handleRegister}>

          <div className="input-group">

            <label>Username</label>

            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) =>
                setUsername(e.target.value)
              }
              required
            />

          </div>

          <div className="input-group">

            <label>Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />

          </div>          <div className="input-group">

            <label>Password</label>

            <div className="password-box">

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
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
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>

            </div>

          </div>

          <div className="input-group">

            <label>Confirm Password</label>

            <div className="password-box">

              <input
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
                required
              />

              <button
                type="button"
                className="eye-btn"
                onClick={() =>
                  setShowConfirmPassword(
                    !showConfirmPassword
                  )
                }
              >
                {showConfirmPassword ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}
              </button>

            </div>

          </div>

          <label className="remember">

            <input
              type="checkbox"
              checked={agree}
              onChange={() => setAgree(!agree)}
            />

            I agree to the Terms & Conditions

          </label>

          <button
            className="login-btn"
            disabled={loading}
          >
            {loading
              ? "Creating Account..."
              : "Create Account"}
          </button>

        </form>

        <div className="divider">
          <span>or continue with</span>
        </div>

        <div className="social-buttons">

          <button type="button">
            <FaGoogle />
          </button>

          <button type="button">
            <FaGithub />
          </button>

          <button type="button">
            <FaFacebook />
          </button>

          <button type="button">
            <FaXTwitter />
          </button>

        </div>

        <div className="register-link">

          Already have an account?

          <Link to="/login">
            {" "}Sign In
          </Link>

        </div>

      </div>

    </div>
  );
}