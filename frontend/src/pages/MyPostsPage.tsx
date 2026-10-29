import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../components/Dashboard/DashboardLayout";
import api from "../services/api";
import "./MyPostsPage.css";

interface Post {
  id: number;
  title: string;
  content?: string;
  created_at?: string;
  author?: {
    id: number;
    username: string;
  };
}

function getUserId(): number | null {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const payload = JSON.parse(
      atob(
        token.split(".")[1]
          .replace(/-/g, "+")
          .replace(/_/g, "/")
      )
    );

    return typeof payload.user_id === "number"
      ? payload.user_id
      : null;
  } catch {
    return null;
  }
}

export default function MyPostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    let active = true;

    async function loadPosts() {
      const userId = getUserId();

      if (!userId) {
        if (active) {
          setError("Please sign in again to view your articles.");
          setLoading(false);
        }
        return;
      }

      try {
        const response = await api.get<Post[]>("/posts/");

        const myPosts = response.data.filter(
          (post) => post.author?.id === userId
        );

        if (active) setPosts(myPosts);
      } catch {
        if (active) {
          setError("Unable to load your articles. Please try again.");
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    loadPosts();

    return () => {
      active = false;
    };
  }, []);

  async function deletePost(postId: number) {
    if (
      !window.confirm(
        "Delete this article permanently? This action cannot be undone."
      )
    ) {
      return;
    }

    setDeletingId(postId);
    setError("");

    try {
      await api.delete(`/posts/${postId}/delete/`);

      setPosts((current) =>
        current.filter((post) => post.id !== postId)
      );
    } catch {
      setError("Unable to delete this article. Please try again.");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <DashboardLayout title="My Posts">
      <div className="myposts-page">
        <div className="page-top">
          <div>
            <h1>My Posts</h1>
            <p>Your published articles.</p>
          </div>

          <Link to="/create-post" className="new-post-btn">
            Create New Post
          </Link>
        </div>

        {loading && <p>Loading your articles...</p>}

        {error && <p role="alert">{error}</p>}

        {!loading && !error && posts.length === 0 && (
          <div className="posts-table">
            <p>You haven't published any articles yet.</p>
            <Link to="/create-post">Write your first article</Link>
          </div>
        )}

        {!loading && posts.length > 0 && (
          <div className="posts-table">
            {posts.map((post) => (
              <div className="post-row" key={post.id}>
                <div>
                  <h3>{post.title}</h3>
                  <p>
                    {post.created_at
                      ? new Date(post.created_at).toLocaleDateString()
                      : "Publication date unavailable"}
                  </p>
                </div>

                <div className="actions">
                  <Link to={`/posts/${post.id}`}>View</Link>

                  <button
                    type="button"
                    className="delete"
                    disabled={deletingId === post.id}
                    onClick={() => deletePost(post.id)}
                  >
                    {deletingId === post.id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
