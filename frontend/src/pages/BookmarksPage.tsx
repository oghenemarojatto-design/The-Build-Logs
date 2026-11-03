import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../components/Dashboard/DashboardLayout";
import { getBookmarks, removeBookmark } from "../services/posts";
import type { Post } from "../services/posts";
import "./BookmarksPage.css";

interface SavedBookmark {
  id: number;
  post: Post;
  created_at: string;
}

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState<SavedBookmark[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadBookmarks = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getBookmarks();
      setBookmarks(data);
    } catch (err) {
      console.error("Failed to load bookmarks:", err);
      setError("Could not load your bookmarks. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadBookmarks();
  }, []);

  const handleRemove = async (postId: number) => {
    try {
      await removeBookmark(postId);
      setBookmarks((current) =>
        current.filter((bookmark) => bookmark.post.id !== postId)
      );
    } catch (err) {
      console.error("Failed to remove bookmark:", err);
      setError("Could not remove this bookmark. Please try again.");
    }
  };

  return (
    <DashboardLayout title="Bookmarks">
      <div className="bookmarks-page">
        <h1>Bookmarks</h1>

        {loading ? (
          <p>Loading your saved articles...</p>
        ) : error ? (
          <div className="bookmark-card">
            <p>{error}</p>
            <button onClick={loadBookmarks}>Try again</button>
          </div>
        ) : bookmarks.length === 0 ? (
          <div className="bookmark-card">
            <h3>No bookmarks yet</h3>
            <p>Your saved articles will appear here.</p>
            <Link to="/posts">Explore articles</Link>
          </div>
        ) : (
          <div className="bookmarks-list">
            {bookmarks.map((bookmark) => (
              <article className="bookmark-card" key={bookmark.id}>
                <h3>{bookmark.post.title}</h3>

                <p>
                  {bookmark.post.content?.slice(0, 180)}
                  {bookmark.post.content?.length > 180 ? "..." : ""}
                </p>

                <div>
                  <Link to={`/posts/${bookmark.post.id}`}>
                    Read article
                  </Link>

                  <button
                    type="button"
                    onClick={() => handleRemove(bookmark.post.id)}
                  >
                    Remove bookmark
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
