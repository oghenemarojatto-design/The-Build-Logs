import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiFileText,
  FiEye,
  FiBookmark,
  FiUsers,
  FiPlus,
  FiArrowUpRight,
  FiArrowRight,
  FiEdit3,
  FiExternalLink,
  FiActivity,
} from "react-icons/fi";

import api from "../services/api";
import "./DashboardPage.css";

interface Post {
  id?: number | string;
  pk?: number | string;
  title: string;
  author?: string | { username?: string } | null;
  views?: number;
}

type PostsResponse = Post[] | { results?: Post[] };

export default function DashboardPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadPosts() {
      try {
        const response = await api.get<PostsResponse>("/posts/");
        const data = response.data;

        const result = Array.isArray(data)
          ? data
          : Array.isArray(data.results)
            ? data.results
            : [];

        if (active) {
          setPosts(result.filter((post) => typeof post.title === "string"));
        }
      } catch {
        if (active) {
          setError("We couldn't load your articles. Please try again.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadPosts();

    return () => {
      active = false;
    };
  }, []);

  const hasViewData = posts.some(
    (post) => typeof post.views === "number"
  );

  const totalViews = posts.reduce(
    (total, post) =>
      total + (typeof post.views === "number" ? post.views : 0),
    0
  );

  return (
    <main className="dashboard">
      <section className="dashboard-hero">
        <div className="dashboard-hero-content">
          <span className="dashboard-eyebrow">
            <span className="status-dot" />
            YOUR CREATOR SPACE
          </span>

          <h1>
            Build something
            <br />
            <span>worth reading.</span>
          </h1>

          <p>
            Your ideas, your articles, your progress.
            Everything starts here.
          </p>

          <div className="dashboard-hero-actions">
            <Link to="/create-post" className="dashboard-primary-btn">
              <FiPlus />
              Write an article
              <FiArrowUpRight />
            </Link>

            <Link to="/posts" className="dashboard-secondary-btn">
              Explore articles
              <FiArrowRight />
            </Link>
          </div>
        </div>

        <div className="dashboard-hero-art" aria-hidden="true">
          <div className="hero-orbit hero-orbit-one" />
          <div className="hero-orbit hero-orbit-two" />
          <div className="hero-glow" />

          <div className="hero-code-card">
            <div className="hero-code-top">
              <span />
              <span />
              <span />
              <small>your-next-idea.ts</small>
            </div>

            <div className="hero-code-content">
              <p><span>01</span> <b>const</b> idea = {"{"}</p>
              <p><span>02</span> &nbsp; build: <i>"something"</i>,</p>
              <p><span>03</span> &nbsp; share: <i>true</i>,</p>
              <p><span>04</span> &nbsp; repeat: <i>"every day"</i></p>
              <p><span>05</span> {"}"}</p>
            </div>

            <div className="hero-code-footer">
              <FiActivity />
              <span>CREATIVITY IN PROGRESS</span>
              <span className="hero-live-dot" />
            </div>
          </div>

          <div className="hero-floating-badge">
            <FiEdit3 />
            <div>
              <strong>Your next story</strong>
              <span>Starts with an idea</span>
            </div>
          </div>
        </div>
      </section>

      <section className="dashboard-section">
        <div className="dashboard-section-heading">
          <div>
            <span className="dashboard-section-label">THE OVERVIEW</span>
            <h2>Your workspace</h2>
            <p>A quick look at your publishing space.</p>
          </div>
        </div>

        <div className="stats-grid">
          <article className="stat-card">
            <div className="stat-top">
              <span className="stat-icon stat-icon-blue">
                <FiFileText />
              </span>
              <span className="stat-card-label">CONTENT</span>
            </div>
            <h3>{loading ? "…" : posts.length}</h3>
            <p>Articles available</p>
            <div className="stat-card-bottom">
              <span>Across the platform</span>
              <FiArrowUpRight />
            </div>
          </article>

          <article className="stat-card">
            <div className="stat-top">
              <span className="stat-icon stat-icon-purple">
                <FiEye />
              </span>
              <span className="stat-card-label">REACH</span>
            </div>
            <h3>
              {loading
                ? "…"
                : hasViewData
                  ? totalViews.toLocaleString()
                  : "—"}
            </h3>
            <p>Total article views</p>
            <div className="stat-card-bottom">
              <span>
                {hasViewData ? "Based on available data" : "View tracking unavailable"}
              </span>
              <FiArrowUpRight />
            </div>
          </article>

          <article className="stat-card">
            <div className="stat-top">
              <span className="stat-icon stat-icon-orange">
                <FiBookmark />
              </span>
              <span className="stat-card-label">SAVED</span>
            </div>
            <h3>—</h3>
            <p>Bookmarks</p>
            <div className="stat-card-bottom">
              <span>Not tracked yet</span>
              <FiArrowUpRight />
            </div>
          </article>

          <article className="stat-card">
            <div className="stat-top">
              <span className="stat-icon stat-icon-green">
                <FiUsers />
              </span>
              <span className="stat-card-label">COMMUNITY</span>
            </div>
            <h3>—</h3>
            <p>Followers</p>
            <div className="stat-card-bottom">
              <span>Not tracked yet</span>
              <FiArrowUpRight />
            </div>
          </article>
        </div>
      </section>

      <section className="dashboard-content-grid">
        <article className="dashboard-panel recent-panel">
          <div className="panel-heading">
            <div>
              <span className="dashboard-section-label">LATEST CONTENT</span>
              <h2>Recent articles</h2>
            </div>

            <Link to="/posts" className="panel-view-link">
              View all <FiArrowRight />
            </Link>
          </div>

          {loading && (
            <div className="dashboard-message">
              <span className="dashboard-loading-dot" />
              Loading articles...
            </div>
          )}

          {error && (
            <p className="dashboard-message dashboard-error" role="alert">
              {error}
            </p>
          )}

          {!loading && !error && posts.length === 0 && (
            <div className="dashboard-empty-state">
              <span className="empty-state-icon">
                <FiFileText />
              </span>
              <h3>Your story starts here.</h3>
              <p>
                You haven't published an article yet. Make the first one count.
              </p>
              <Link to="/create-post" className="dashboard-primary-btn">
                <FiPlus /> Create your first article
              </Link>
            </div>
          )}

          {!loading && !error && posts.length > 0 && (
            <div className="recent-articles-list">
              {posts.slice(0, 5).map((post, index) => {
                const postId = post.id ?? post.pk;
                const author =
                  typeof post.author === "string"
                    ? post.author
                    : post.author?.username;

                return (
                  <div
                    className="recent-article"
                    key={postId ?? `${post.title}-${index}`}
                  >
                    <div className="article-number">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <div className="recent-article-info">
                      {postId ? (
                        <Link
                          to={`/posts/${postId}`}
                          className="recent-article-title"
                        >
                          {post.title}
                        </Link>
                      ) : (
                        <span className="recent-article-title">
                          {post.title}
                        </span>
                      )}

                      <span className="recent-article-author">
                        {author ? `By ${author}` : "Published article"}
                      </span>
                    </div>

                    {postId ? (
                      <Link
                        to={`/posts/${postId}`}
                        className="article-open-btn"
                        aria-label={`Open ${post.title}`}
                      >
                        <FiExternalLink />
                      </Link>
                    ) : (
                      <span className="article-open-btn">
                        <FiFileText />
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </article>

        <aside className="dashboard-panel quick-actions-panel">
          <div className="panel-heading">
            <div>
              <span className="dashboard-section-label">GET THINGS DONE</span>
              <h2>Quick actions</h2>
            </div>
          </div>

          <Link to="/create-post" className="quick-action">
            <span className="quick-action-icon quick-action-blue">
              <FiPlus />
            </span>
            <span className="quick-action-text">
              <strong>Create an article</strong>
              <small>Turn an idea into a story</small>
            </span>
            <FiArrowUpRight className="quick-action-arrow" />
          </Link>

          <Link to="/profile" className="quick-action">
            <span className="quick-action-icon quick-action-purple">
              <FiUsers />
            </span>
            <span className="quick-action-text">
              <strong>Edit your profile</strong>
              <small>Keep your details up to date</small>
            </span>
            <FiArrowUpRight className="quick-action-arrow" />
          </Link>

          <Link to="/posts" className="quick-action">
            <span className="quick-action-icon quick-action-green">
              <FiFileText />
            </span>
            <span className="quick-action-text">
              <strong>Browse articles</strong>
              <small>Discover what's being shared</small>
            </span>
            <FiArrowUpRight className="quick-action-arrow" />
          </Link>

          <div className="dashboard-tip">
            <span className="dashboard-tip-label">A LITTLE REMINDER</span>
            <p>
              Great things are built one idea at a time. Keep showing up.
            </p>
          </div>
        </aside>
      </section>

      <footer className="dashboard-footer">
        <span>THE BUILD LOGS</span>
        <span>Build. Learn. Share. Repeat.</span>
      </footer>
    </main>
  );
}