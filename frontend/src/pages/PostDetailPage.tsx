import { useEffect, useState } from "react";
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
  type Post,
} from "../services/posts";

import "./PostDetailPage.css";

interface Comment {
  id: number;
  content: string;
  author?: {
    username: string;
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
  const [error, setError] = useState("");

  const loadPost = async () => {
    if (!id) {
      setError("Post not found.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const data = await getPost(Number(id));

      setPost(data);
    } catch (err) {
      console.error("Failed to load post:", err);
      setError("Unable to load this article.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPost();
  }, [id]);

  const handleComment = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!id || !comment.trim()) return;

    try {
      setCommentLoading(true);

      await createComment(Number(id), comment.trim());

      setComment("");

      await loadPost();
    } catch (err) {
      console.error("Failed to create comment:", err);
      setError("Unable to post your comment.");
    } finally {
      setCommentLoading(false);
    }
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(
        window.location.href
      );

      alert("Article link copied!");
    } catch {
      console.log("Unable to copy link.");
    }
  };

  if (loading) {
    return (
      <div className="post-loading">
        Loading article...
      </div>
    );
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

      {/* HERO */}

      <section className="post-hero">

        <div className="hero-overlay">

          <Link
            to="/posts"
            className="back-to-posts"
          >
            <FiArrowLeft />
            Back to articles
          </Link>

          <span className="badge">
            {post.category || "Knowledge"}
          </span>

          <h1>{post.title}</h1>

          <div className="post-meta">

            <div className="author">

              <div className="avatar">
                {(
                  post.author?.username ||
                  "B"
                )
                  .charAt(0)
                  .toUpperCase()}
              </div>

              <span>
                {post.author?.username ||
                  "BlueBlog Writer"}
              </span>

            </div>

            <div className="reading-time">

              <FiClock />

              <span>
                5 min read
              </span>

            </div>

          </div>

        </div>

      </section>

      {/* ARTICLE */}

      <article className="article">

        {/* ACTIONS */}

        <div className="article-actions">

          <button
            type="button"
            aria-label="Like article"
          >
            <FiHeart />
          </button>

          <button
            type="button"
            aria-label="Save article"
          >
            <FiBookmark />
          </button>

          <button
            type="button"
            aria-label="Share article"
            onClick={handleShare}
          >
            <FiShare2 />
          </button>

        </div>

        {/* CONTENT */}

        <div className="article-content">
          <p>{post.content}</p>
        </div>

      </article>

      {/* COMMENTS */}

      <section className="comments">

        <div className="comments-header">

          <h2>
            Comments
            <span>{comments.length}</span>
          </h2>

          <p>
            Join the conversation and share your
            thoughts.
          </p>

        </div>

        {/* COMMENT LIST */}

        {comments.length === 0 ? (

          <div className="no-comments">
            <div>💬</div>

            <h3>
              No comments yet
            </h3>

            <p>
              Be the first person to start the
              conversation.
            </p>
          </div>

        ) : (

          <div className="comments-list">

            {comments.map((c) => (

              <div
                key={c.id}
                className="comment-card"
              >

                <div className="avatar">
                  {(
                    c.author?.username ||
                    "U"
                  )
                    .charAt(0)
                    .toUpperCase()}
                </div>

                <div className="comment-body">

                  <strong>
                    {c.author?.username ||
                      "BlueBlog User"}
                  </strong>

                  <p>
                    {c.content}
                  </p>

                </div>

              </div>

            ))}

          </div>
        )}

        {/* CREATE COMMENT */}

        <form
          className="comment-form"
          onSubmit={handleComment}
        >

          <h3>
            Share your thoughts
          </h3>

          <textarea
            rows={5}
            placeholder="Write a comment..."
            value={comment}
            onChange={(e) =>
              setComment(e.target.value)
            }
            disabled={commentLoading}
            required
          />

          <button
            type="submit"
            disabled={
              commentLoading ||
              !comment.trim()
            }
          >
            {commentLoading
              ? "Posting..."
              : "Post Comment"}
          </button>

        </form>

      </section>

    </main>
  );
}