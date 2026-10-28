import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiFileText,
  FiEye,
  FiBookmark,
  FiUsers,
  FiPlus,
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
        const results: Post[] = Array.isArray(data)
          ? data
          : data.results ?? [];

        if (active) {
          setPosts(results.filter((post) => typeof post.title === "string"));
        }
      } catch {
        if (active) {
          setError("Unable to load articles from the server.");
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
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Welcome to your dashboard 👋</h1>
          <p>Manage your articles and publishing activity.</p>
        </div>

        <Link to="/create-post" className="new-post-btn">
          <FiPlus />
          New Post
        </Link>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <FiFileText className="stat-icon" />
          <h2>{loading ? "…" : posts.length}</h2>
          <p>Articles Available</p>
        </div>

        <div className="stat-card">
          <FiEye className="stat-icon" />
          <h2>
            {loading ? "…" : hasViewData ? totalViews.toLocaleString() : "—"}
          </h2>
          <p>Views {hasViewData ? "" : "(not tracked)"}</p>
        </div>

        <div className="stat-card">
          <FiBookmark className="stat-icon" />
          <h2>—</h2>
          <p>Bookmarks (not tracked)</p>
        </div>

        <div className="stat-card">
          <FiUsers className="stat-icon" />
          <h2>—</h2>
          <p>Followers (not tracked)</p>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3>Recent Articles</h3>

          {loading && <p>Loading articles...</p>}

          {error && <p role="alert">{error}</p>}

          {!loading && !error && posts.length === 0 && (
            <div>
              <p>No articles have been published yet.</p>
              <Link to="/create-post">Publish your first article</Link>
            </div>
          )}

          {!loading && !error && posts.length > 0 && (
            <ul>
              {posts.slice(0, 5).map((post, index) => {
                const postId = post.id ?? post.pk;
                const author =
                  typeof post.author === "string"
                    ? post.author
                    : post.author?.username;

                return (
                  <li key={postId ?? `${post.title}-${index}`}>
                    {postId ? (
                      <Link to={`/posts/${postId}`}>{post.title}</Link>
                    ) : (
                      <span>{post.title}</span>
                    )}
                    {author && <small> — {author}</small>}
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className="dashboard-card">
          <h3>Quick Actions</h3>
          <p><Link to="/create-post">Create New Post</Link></p>
          <p><Link to="/profile">Edit Profile</Link></p>
          <p><Link to="/posts">Browse Articles</Link></p>
        </div>

        <div className="dashboard-card">
          <h3>Publishing Activity</h3>
          {loading ? (
            <p>Checking articles...</p>
          ) : error ? (
            <p>Activity is unavailable right now.</p>
          ) : (
            <p>
              {posts.length === 0
                ? "No articles have been published yet."
                : `${posts.length} article${posts.length === 1 ? "" : "s"} available.`}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
