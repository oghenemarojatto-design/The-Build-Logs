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
  FiTrendingUp,
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
          setError("");
        }
      } catch {
        if (active) setError("We couldn't load articles right now. Please try again.");
      } finally {
        if (active) setLoading(false);
      }
    }

    loadPosts();
    return () => {
      active = false;
    };
  }, []);

  const hasViewData = posts.some((post) => typeof post.views === "number");
  const totalViews = posts.reduce(
    (total, post) => total + (typeof post.views === "number" ? post.views : 0),
    0
  );

  const stats = [
    {
      label: "Published articles",
      value: loading ? "…" : posts.length.toLocaleString(),
      note: "Articles available",
      icon: <FiFileText />,
      tone: "blue",
    },
    {
      label: "Total views",
      value: loading ? "…" : hasViewData ? totalViews.toLocaleString() : "—",
      note: hasViewData ? "Based on available data" : "View tracking unavailable",
      icon: <FiEye />,
      tone: "violet",
    },
    {
      label: "Bookmarks",
      value: "—",
      note: "Not tracked yet",
      icon: <FiBookmark />,
      tone: "amber",
    },
    {
      label: "Followers",
      value: "—",
      note: "Not tracked yet",
      icon: <FiUsers />,
      tone: "green",
    },
  ];

  return (
    <main className="dashboard">
      <header className="dashboard-page-header">
        <div>
          <div className="dashboard-breadcrumb">
            <span>Workspace</span><FiArrowRight /><span>Dashboard</span>
          </div>
          <h1>Your dashboard</h1>
          <p>Manage your writing, track your content, and keep creating.</p>
        </div>
        <Link to="/create-post" className="dashboard-primary-btn">
          <FiPlus /> <span>Write an article</span> <FiArrowUpRight />
        </Link>
      </header>

      <section className="dashboard-hero">
        <div className="dashboard-hero-content">
          <span className="dashboard-eyebrow">
            <span className="status-dot" /> YOUR CREATOR WORKSPACE
          </span>
          <h2>Ideas become stories.<br /><span>Stories make impact.</span></h2>
          <p>Your next great article starts with an idea. Make space for it, write it down, and share it with the community.</p>
          <div className="dashboard-hero-actions">
            <Link to="/create-post" className="dashboard-hero-primary">
              <FiEdit3 /> Start writing <FiArrowUpRight />
            </Link>
            <Link to="/posts" className="dashboard-hero-secondary">
              Explore articles <FiArrowRight />
            </Link>
          </div>
        </div>
        <div className="dashboard-hero-visual" aria-hidden="true">
          <div className="dashboard-visual-orb orb-one" />
          <div className="dashboard-visual-orb orb-two" />
          <div className="dashboard-editor-card">
            <div className="dashboard-editor-top">
              <div className="editor-dots"><i /><i /><i /></div>
              <span>NEW ARTICLE</span>
              <FiActivity />
            </div>
            <div className="editor-lines">
              <span className="editor-line line-short" />
              <span className="editor-line line-long" />
              <span className="editor-line line-medium" />
              <span className="editor-line line-long" />
              <span className="editor-line line-small" />
            </div>
            <div className="editor-card-footer"><span className="editor-live-dot" /> YOUR NEXT IDEA STARTS HERE</div>
          </div>
          <div className="dashboard-visual-badge"><FiTrendingUp /><span><strong>Keep creating</strong><small>One story at a time</small></span></div>
        </div>
      </section>

      <section className="dashboard-section">
        <div className="dashboard-section-heading">
          <div>
            <span className="dashboard-section-label">AT A GLANCE</span>
            <h2>Publishing overview</h2>
          </div>
          <span className="dashboard-updated-label"><span /> Live workspace data</span>
        </div>
        <div className="stats-grid">
          {stats.map((stat) => (
            <article className="stat-card" key={stat.label}>
              <div className="stat-top">
                <span className={`stat-icon stat-icon-${stat.tone}`}>{stat.icon}</span>
                <span className="stat-card-label">{stat.label}</span>
              </div>
              <h3>{stat.value}</h3>
              <p>{stat.note}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="dashboard-content-grid">
        <article className="dashboard-panel recent-panel">
          <div className="panel-heading">
            <div>
              <span className="dashboard-section-label">YOUR CONTENT</span>
              <h2>Recent articles</h2>
              <p>Your latest writing from across the platform.</p>
            </div>
            <Link to="/posts" className="panel-view-link">View all <FiArrowRight /></Link>
          </div>

          {loading && <div className="dashboard-message"><span className="dashboard-loading-dot" /> Loading articles…</div>}
          {error && <p className="dashboard-message dashboard-error" role="alert">{error}</p>}

          {!loading && !error && posts.length === 0 && (
            <div className="dashboard-empty-state">
              <span className="empty-state-icon"><FiFileText /></span>
              <h3>Your first story starts here.</h3>
              <p>You haven't published an article yet. Turn an idea into something worth reading.</p>
              <Link to="/create-post" className="dashboard-primary-btn"><FiPlus /> Create an article</Link>
            </div>
          )}

          {!loading && !error && posts.length > 0 && (
            <div className="recent-articles-list">
              {posts.slice(0, 5).map((post, index) => {
                const postId = post.id ?? post.pk;
                const author = typeof post.author === "string" ? post.author : post.author?.username;
                return (
                  <div className="recent-article" key={postId ?? `${post.title}-${index}`}>
                    <div className="article-number">{String(index + 1).padStart(2, "0")}</div>
                    <div className="recent-article-info">
                      {postId ? <Link to={`/posts/${postId}`} className="recent-article-title">{post.title}</Link> : <span className="recent-article-title">{post.title}</span>}
                      <span className="recent-article-author">{author ? `By ${author}` : "Published article"}</span>
                    </div>
                    {postId ? (
                      <Link to={`/posts/${postId}`} className="article-open-btn" aria-label={`Open ${post.title}`}><FiExternalLink /></Link>
                    ) : <span className="article-open-btn"><FiFileText /></span>}
                  </div>
                );
              })}
            </div>
          )}
        </article>

        <aside className="dashboard-panel quick-actions-panel">
          <div className="panel-heading">
            <div><span className="dashboard-section-label">SHORTCUTS</span><h2>Quick actions</h2><p>Pick up where you left off.</p></div>
          </div>
          <Link to="/create-post" className="quick-action">
            <span className="quick-action-icon quick-action-blue"><FiPlus /></span>
            <span className="quick-action-text"><strong>Create an article</strong><small>Turn an idea into a story</small></span>
            <FiArrowUpRight className="quick-action-arrow" />
          </Link>
          <Link to="/profile" className="quick-action">
            <span className="quick-action-icon quick-action-purple"><FiUsers /></span>
            <span className="quick-action-text"><strong>Edit your profile</strong><small>Keep your details up to date</small></span>
            <FiArrowUpRight className="quick-action-arrow" />
          </Link>
          <Link to="/posts" className="quick-action">
            <span className="quick-action-icon quick-action-green"><FiFileText /></span>
            <span className="quick-action-text"><strong>Browse articles</strong><small>Discover what people are sharing</small></span>
            <FiArrowUpRight className="quick-action-arrow" />
          </Link>
          <div className="dashboard-tip">
            <span className="dashboard-tip-label">A NOTE FOR CREATORS</span>
            <p>Consistency beats perfection. Keep showing up and keep sharing what you learn.</p>
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
