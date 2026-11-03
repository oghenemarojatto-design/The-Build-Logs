import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { useParams, Link } from "react-router-dom";
import {
  FiHeart,
  FiBookmark,
  FiShare2,
  FiClock,
  FiArrowLeft,
} from "react-icons/fi";

import {
  getPost,
  createComment,
  likePost,
  unlikePost,
  bookmarkPost,
  removeBookmark,
  getBookmarks,
  type Post,
  type Comment,
} from "../services/posts";

import "./PostDetailPage.css";

interface SavedBookmark {
  post: {
    id: number;
  };
}

interface PostWithComments extends Post {
  comments?: Comment[];
}

export default function PostDetailPage() {
  const { id } = useParams<{ id: string }>();

  const [post, setPost] = useState<PostWithComments | null>(null);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [commentLoading, setCommentLoading] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);
  const [bookmarkLoading, setBookmarkLoading] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const postId = Number(id);

  const loadPost = async () => {
    if (!id || !Number.isInteger(postId) || postId <= 0) {
      setError("Post not found.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const data = await getPost(postId);
      setPost(data);
    } catch (err) {
      console.error("Failed to load post:", err);
      setError("Unable to load this article.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadPost();
  }, [id]);

  useEffect(() => {
    let active = true;

    const checkBookmark = async () => {
      if (!id || !Number.isInteger(postId) || postId <= 0) return;

      try {
        const saved = (await getBookmarks()) as SavedBookmark[];

        if (active) {
          setBookmarked(
            saved.some((item) => item.post?.id === postId)
          );
        }
      } catch {
        if (active) setBookmarked(false);
      }
    };

    void checkBookmark();

    return () => {
      active = false;
    };
  }, [id]);

  const handleComment = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!id || !comment.trim()) return;

    try {
      setCommentLoading(true);
      setNotice("");

      await createComment(postId, comment.trim());

      setComment("");
      setNotice("Comment posted successfully.");
      await loadPost();
    } catch (err) {
      console.error("Failed to create comment:", err);
      setNotice("Unable to post your comment. Please log in and try again.");
    } finally {
      setCommentLoading(false);
    }
  };

  const handleLike = async () => {
    if (!post || likeLoading) return;

    const wasLiked = Boolean(post.liked_by_user);

    try {
      setLikeLoading(true);
      setNotice("");

      setPost({
        ...post,
        liked_by_user: !wasLiked,
        likes_count: Math.max(
          0,
          (post.likes_count ?? 0) + (wasLiked ? -1 : 1)
        ),
      });

      const result = wasLiked
        ? await unlikePost(post.id)
        : await likePost(post.id);

      setPost((current) =>
        current
          ? {
              ...current,
              liked_by_user: result.liked,
              likes_count: result.likes_count,
            }
          : current
      );
    } catch (err) {
      console.error("Failed to update like:", err);
      await loadPost();
      setNotice("Unable to update like. Please log in and try again.");
    } finally {
      setLikeLoading(false);
    }
  };

  const handleBookmark = async () => {
    if (!post || bookmarkLoading) return;

    try {
      setBookmarkLoading(true);
      setNotice("");

      if (bookmarked) {
        await removeBookmark(post.id);
        setBookmarked(false);
        setNotice("Article removed from bookmarks.");
      } else {
        await bookmarkPost(post.id);
        setBookmarked(true);
        setNotice("Article saved to bookmarks.");
      }
    } catch (err) {
      console.error("Failed to update bookmark:", err);
      setNotice("Unable to save this article. Please log in and try again.");
    } finally {
      setBookmarkLoading(false);
    }
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setNotice("Article link copied!");
    } catch {
      setNotice("Unable to copy the link on this browser.");
    }
  };

  if (loading) {
    return <div className="post-loading">Loading article...</div>;
  }

  if (error || !post) {
    return (
      <div className="post-error">
        <h2>{error || "Article not found."}</h2>
        <Link to="/posts">
          <FiArrowLeft />
          Back to articles
        </Link>
      </div>
    );
  }

  const comments = post.comments ?? [];

  return (
    <main className="post-detail-page">
      <section className="post-hero">
        <div className="hero-overlay">
          <Link to="/posts" className="back-to-posts">
            <FiArrowLeft />
            Back to articles
          </Link>

          <span className="badge">{post.category || "Knowledge"}</span>

          <h1>{post.title}</h1>

          <div className="post-meta">
            <div className="author">
              <div className="avatar">
                {(post.author?.username || "B")
                  .charAt(0)
                  .toUpperCase()}
              </div>

              <span>
                {post.author?.username || "The Build Logs Writer"}
              </span>
            </div>

            <div className="reading-time">
              <FiClock />
              <span>5 min read</span>
            </div>
          </div>
        </div>
      </section>

      <article className="article">
        <div className="article-actions">
          <button
            type="button"
            aria-label={post.liked_by_user ? "Unlike article" : "Like article"}
            aria-pressed={Boolean(post.liked_by_user)}
            disabled={likeLoading}
            onClick={handleLike}
            title={`${post.likes_count ?? 0} likes`}
          >
            <FiHeart
              fill={post.liked_by_user ? "currentColor" : "none"}
            />
            <span>{post.likes_count ?? 0}</span>
          </button>

          <button
            type="button"
            aria-label={bookmarked ? "Remove bookmark" : "Save article"}
            aria-pressed={bookmarked}
            disabled={bookmarkLoading}
            onClick={handleBookmark}
            title={bookmarked ? "Remove bookmark" : "Save article"}
          >
            <FiBookmark
              fill={bookmarked ? "currentColor" : "none"}
            />
          </button>

          <button
            type="button"
            aria-label="Share article"
            onClick={handleShare}
          >
            <FiShare2 />
          </button>
        </div>

        {notice && (
          <p role="status" aria-live="polite">
            {notice}
          </p>
        )}

        <div className="article-content">
          <p>{post.content}</p>
        </div>
      </article>

      <section className="comments">
        <div className="comments-header">
          <h2>
            Comments <span>{comments.length}</span>
          </h2>

          <p>Join the conversation and share your thoughts.</p>
        </div>

        {comments.length === 0 ? (
          <div className="no-comments">
            <div>💬</div>
            <h3>No comments yet</h3>
            <p>Be the first person to start the conversation.</p>
          </div>
        ) : (
          <div className="comments-list">
            {comments.map((c) => (
              <div key={c.id} className="comment-card">
                <div className="avatar">
                  {(c.author?.username || "U")
                    .charAt(0)
                    .toUpperCase()}
                </div>

                <div className="comment-body">
                  <strong>
                    {c.author?.username || "The Build Logs User"}
                  </strong>
                  <p>{c.content}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        <form className="comment-form" onSubmit={handleComment}>
          <h3>Share your thoughts</h3>

          <textarea
            rows={5}
            placeholder="Write a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            disabled={commentLoading}
            required
          />

          <button
            type="submit"
            disabled={commentLoading || !comment.trim()}
          >
            {commentLoading ? "Posting..." : "Post Comment"}
          </button>
        </form>
      </section>
    </main>
  );
}
