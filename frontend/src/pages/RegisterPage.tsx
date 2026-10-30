import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import {
  FaGoogle,
  FaGithub,
  FaFacebook,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

import { FaXTwitter } from "react-icons/fa6";

import api from "../services/api";
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
  const [error, setError] = useState("");

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 8) {
      setError("Your password must contain at least 8 characters.");
      return;
    }

    if (!agree) {
      setError("Please accept the Terms & Conditions.");
      return;
    }

    setLoading(true);

    try {
      // Create a real account through Django.
      await api.post("/api/register/", {
        username: username.trim(),
        email: email.trim(),
        password,
      });

      // Registration succeeded. The user must now log in.
      navigate("/login", {
        replace: true,
        state: {
          notice: "Account created successfully. Please sign in.",
        },
      });
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const data = err.response?.data;

        if (data && typeof data === "object") {
          const messages = Object.entries(
            data as Record<string, unknown>
          ).flatMap(([field, value]) => {
            const items = Array.isArray(value) ? value : [value];

            return items
              .filter((item): item is string => typeof item === "string")
              .map((item) => `${field}: ${item}`);
          });

          setError(
            messages.length > 0
              ? messages.join(" ")
              : "Registration failed. Please check your details."
          );
        } else {
          setError(
            "Could not connect to the server. Please try again."
          );
        }
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-overlay" />

      <div className="register-card">
        <div className="register-header">
          <div className="logo-circle">B</div>

          <h1>Create Account</h1>

          <p>
            Join BlueBlog and start sharing ideas with creators
            around the world.
          </p>
        </div>

        <form onSubmit={handleRegister}>
          <div className="input-group">
            <label htmlFor="register-username">Username</label>

            <input
              id="register-username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="register-email">Email</label>

            <input
              id="register-email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="register-password">Password</label>

            <div className="password-box">
              <input
                id="register-password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                minLength={8}
                required
              />

              <button
                type="button"
                className="eye-btn"
                aria-label={showPassword ? "Hide password" : "Show password"}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="register-confirm-password">
              Confirm Password
            </label>

            <div className="password-box">
              <input
                id="register-confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="new-password"
                required
              />

              <button
                type="button"
                className="eye-btn"
                aria-label={
                  showConfirmPassword ? "Hide password" : "Show password"
                }
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <label className="remember">
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
            />
            I agree to the Terms & Conditions
          </label>

          {error && (
            <p
              role="alert"
              style={{ color: "#dc2626", marginTop: "12px" }}
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            className="login-btn"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div className="divider">
          <span>or continue with</span>
        </div>

        <div className="social-buttons">
          <button type="button" disabled title="Google login is not configured">
            <FaGoogle />
          </button>

          <button type="button" disabled title="GitHub login is not configured">
            <FaGithub />
          </button>

          <button type="button" disabled title="Facebook login is not configured">
            <FaFacebook />
          </button>

          <button type="button" disabled title="X login is not configured">
            <FaXTwitter />
          </button>
        </div>

        <div className="register-link">
          Already have an account?{" "}
          <Link to="/login">Sign In</Link>
        </div>
      </div>
    </div>
  );
}