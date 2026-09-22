import "./AdvancedFooter.css";
import { FiSend, FiTwitter, FiGithub, FiLinkedin, FiInstagram, FiMail, FiPhone, FiMapPin } from "react-icons/fi";

function AdvancedFooter() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    platform: [
      { label: "Home", href: "/" },
      { label: "Explore Articles", href: "/posts" },
      { label: "Learning Paths", href: "/categories" },
      { label: "Community", href: "/community" },
      { label: "About", href: "/about" },
    ],
    resources: [
      { label: "Getting Started", href: "/guide" },
      { label: "Write for Us", href: "/contribute" },
      { label: "FAQ", href: "/faq" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
    connect: [
      { label: "Blog", href: "/blog" },
      { label: "Events", href: "/events" },
      { label: "Webinars", href: "/webinars" },
      { label: "Partnerships", href: "/partnerships" },
      { label: "Press", href: "/press" },
    ],
  };

  const socialLinks = [
    { icon: FiTwitter, href: "https://twitter.com/buildlog", label: "Twitter" },
    { icon: FiGithub, href: "https://github.com/buildlog", label: "GitHub" },
    { icon: FiLinkedin, href: "https://linkedin.com/company/buildlog", label: "LinkedIn" },
    { icon: FiInstagram, href: "https://instagram.com/buildlog", label: "Instagram" },
  ];

  return (
    <footer className="advanced-footer">
      <div className="footer-background">
        <div className="footer-network">
          <div className="network-connection conn-1"></div>
          <div className="network-connection conn-2"></div>
          <div className="network-connection conn-3"></div>
          <div className="network-connection conn-4"></div>
          <div className="network-connection conn-5"></div>
        </div>
        <div className="footer-glow-glow-1"></div>
        <div className="footer-glow-glow-2"></div>
      </div>

      <div className="footer-container">
        <div className="footer-main">
          <div className="footer-brand">
            <div className="brand-container">
              <div className="brand-logo">
                <div className="logo-inner">
                  <span>B</span>
                </div>
              </div>
              <div className="brand-text">
                <h2>BuildLog</h2>
                <p className="tagline">Connect Ideas. Build Knowledge.</p>
              </div>
            </div>

            <p className="brand-description">
              The premier platform for sharing in-depth connected articles on
              technology, science, and the arts. We bridge disciplines and
              inspire innovation through curated content and vibrant community.
            </p>

            <div className="contact-info">
              <div className="contact-item">
                <FiMail className="contact-icon" />
                <span>BuildLogs@gmail.com</span>
              </div>
              <div className="contact-item">
                <FiPhone className="contact-icon" />
                <span>+234 813 098 2276</span>
              </div>
              <div className="contact-item">
                <FiMapPin className="contact-icon" />
                <span></span>
              </div>
            </div>

            <div className="newsletter-signup">
              <h3>Stay Updated</h3>
              <div className="signup-form">
                <input type="email" placeholder="Enter your email" />
                <button>
                  <FiSend className="button-icon" />
                </button>
              </div>
            </div>
          </div>

          <div className="footer-links-grid">
            <div className="links-column">
              <h3>Platform</h3>
              <ul>
                {footerLinks.platform.map((link) => (
                  <li key={link.label}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="links-column">
              <h3>Resources</h3>
              <ul>
                {footerLinks.resources.map((link) => (
                  <li key={link.label}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="links-column">
              <h3>Connect</h3>
              <ul>
                {footerLinks.connect.map((link) => (
                  <li key={link.label}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="links-column">
              <h3>Community</h3>
              <ul>
                <li>
                  <a href="/moderators">Moderators</a>
                </li>
                <li>
                  <a href="/guidelines">Community Guidelines</a>
                </li>
                <li>
                  <a href="/safety">Safety Center</a>
                </li>
                <li>
                  <a href="/report">Report Issue</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="bottom-content">
            <p>&copy; {currentYear} BuildLog. All rights reserved.</p>

            <div className="social-links">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    className="social-link"
                    aria-label={social.label}
                  >
                    <Icon className="social-icon" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default AdvancedFooter;
