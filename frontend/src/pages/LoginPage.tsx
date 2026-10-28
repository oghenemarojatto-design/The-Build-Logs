import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
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

import api from "../services/api";
import "./LoginPage.css";

export default function LoginPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await api.post("/api/login/", {
        username: username.trim(),
        password,
      });

      const { access, refresh } = response.data;

      if (!access || !refresh) {
        throw new Error("The server did not return authentication tokens.");
      }

      // Keep the access token available to the API client.
      localStorage.setItem("token", access);

      if (remember) {
        localStorage.setItem("refresh", refresh);
      } else {
        sessionStorage.setItem("refresh", refresh);
      }

      navigate("/dashboard", { replace: true });
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 401) {
          setError("Incorrect username or password.");
        } else if (err.response?.data) {
          const data = err.response.data as Record<string, unknown>;
          const message = Object.values(data)
            .flat()
            .find((value) => typeof value === "string");

          setError(
            typeof message === "string"
              ? message
              : "Login failed. Please check your details."
          );
        } else {
          setError("Cannot reach the server. Please try again.");
        }
      } else {
        setError(
          err instanceof Error
            ? err.message
            : "Something went wrong. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-background" />

      <div className="login-container">
        <div className="login-left">
          <div className="brand">
            <div className="brand-logo">B</div>
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
            Share technology, science, AI and modern ideas with the world.
          </p>

          <div className="feature-list">
            <div className="feature">
              <FaCheckCircle />
              <span>Create articles</span>
            </div>
            <div className="feature">
              <FaCheckCircle />
              <span>Build your professional profile</span>
            </div>
            <div className="feature">
              <FaCheckCircle />
              <span>Connect with readers</span>
            </div>
            <div className="feature">
              <FaCheckCircle />
              <span>Bookmark articles</span>
            </div>
          </div>
        </div>

        <div className="login-right">
          <div className="login-card">
            <h2>Welcome Back 👋</h2>
            <p>Sign in to continue your journey.</p>

            <form onSubmit={handleLogin}>
              <div className="input-group">
                <label htmlFor="login-username">
                  Email or Username
                </label>
                <input
                  id="login-username"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="login-password">Password</label>

                <div className="password-box">
                  <input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    required
                  />

                  <button
                    type="button"
                    className="eye-btn"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <div className="login-options">
                <label className="remember">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                  />
                  Remember me
                </label>

                <Link
                  to="#"
                  onClick={(e) => e.preventDefault()}
                >
                  Forgot Password?
                </Link>
              </div>

              {error && (
                <p role="alert" style={{ color: "#dc2626" }}>
                  {error}
                </p>
              )}

              <button
                type="submit"
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
              <button
                type="button"
                className="social-btn"
                disabled
                title="Google login is not configured"
              >
                <FaGoogle /> Google
              </button>

              <button
                type="button"
                className="social-btn"
                disabled
                title="GitHub login is not configured"
              >
                <FaGithub /> GitHub
              </button>

              <button
                type="button"
                className="social-btn"
                disabled
                title="Facebook login is not configured"
              >
                <FaFacebookF /> Facebook
              </button>

              <button
                type="button"
                className="social-btn"
                disabled
                title="X login is not configured"
              >
                <FaXTwitter /> X
              </button>
            </div>

            <p className="bottom-text">
              Don't have an account?{" "}
              <Link to="/register">Create one</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}