import "./Newsletter.css";
import { FiMail, FiSend, FiUser, FiMessageSquare, FiHeart } from "react-icons/fi";
import { useState } from "react";

function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsLoading(true);
    
    setTimeout(() => {
      setIsSubscribed(true);
      setEmail('');
      setIsLoading(false);
    }, 1500);
  };

  return (
    <section className="newsletter">
      <div className="newsletter-decorations">
        <div className="decoration-sphere sphere-1"></div>
        <div className="decoration-sphere sphere-2"></div>
        <div className="decoration-node node-1"></div>
        <div className="decoration-node node-2"></div>
      </div>

      <div className="newsletter-card">
        <div className="newsletter-content">
          {isSubscribed ? (
            <div className="success-state">
              <div className="success-icon">
                <FiHeart />
              </div>
              <h2>Welcome to BuildLog Community! 🎉</h2>
              <p>
                You're now part of a vibrant community of knowledge builders.
                Get ready to explore interconnected articles and connect with
                brilliant minds.
              </p>
              <div className="success-stats">
                <div className="stat">
                  <FiMessageSquare className="stat-icon" />
                  <span>Daily Insights</span>
                </div>
                <div className="stat">
                  <FiUser className="stat-icon" />
                  <span>Expert Access</span>
                </div>
                <div className="stat">
                  <FiHeart className="stat-icon" />
                  <span>Curated Content</span>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="newsletter-tag">
                <FiMail className="tag-icon" />
                <span>Be Part of the Journey</span>
              </div>

              <h2>
                Stay Connected with <span className="gradient-text">BuildLog</span>
              </h2>

              <p>
                Get early access to exclusive articles, behind-the-scenes
                insights from our expert contributors, and notifications when
                new connected stories are published.
              </p>

              <form className="newsletter-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <FiUser className="input-icon" />
                  <input
                    type="text"
                    placeholder="Your name"
                    className="form-input"
                    disabled={isLoading}
                  />
                </div>

                <div className="form-group">
                  <FiMail className="input-icon" />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-input"
                    disabled={isLoading}
                  />
                </div>

                <button
                  type="submit"
                  className="submit-btn"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="spinner"></div>
                  ) : (
                    <>
                      <span>Join Community</span>
                      <FiSend className="send-icon" />
                    </>
                  )}
                </button>
              </form>

              <div className="newsletter-benefits">
                <div className="benefit-item">
                  <FiHeart className="benefit-icon" />
                  <span>Free Access</span>
                </div>
                <div className="benefit-item">
                  <FiMessageSquare className="benefit-icon" />
                  <span>Expert Insights</span>
                </div>
                <div className="benefit-item">
                  <FiUser className="benefit-icon" />
                  <span>Community Access</span>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="newsletter-visual">
          <div className="visual-network">
            <div className="network-element element-1">
              <FiUser className="element-icon" />
            </div>
            <div className="network-element element-2">
              <FiMessageSquare className="element-icon" />
            </div>
            <div className="network-element element-3">
              <FiHeart className="element-icon" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Newsletter;
