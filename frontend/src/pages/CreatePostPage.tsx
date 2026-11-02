import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../services/posts";
import "./CreatePostPage.css";

function CreatePostPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((current) => ({
      ...current,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.content.trim()) {
      setMessage("Please enter both a title and your article.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      await createPost(formData.title.trim(), formData.content.trim());

      setMessage("Your article has been published successfully!");

      setFormData({
        title: "",
        content: "",
      });

      window.setTimeout(() => {
        navigate("/posts");
      }, 1500);
    } catch (error: unknown) {
      console.error("Error creating post:", error);

      const status =
        typeof error === "object" &&
        error !== null &&
        "response" in error
          ? (
              error as {
                response?: { status?: number };
              }
            ).response?.status
          : undefined;

      if (status === 401) {
        setMessage("Please sign in before publishing an article.");
      } else if (status === 400) {
        setMessage("Please check your article and try again.");
      } else {
        setMessage("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="create-post-container">
      <div className="create-post-glow create-post-glow-one" />
      <div className="create-post-glow create-post-glow-two" />

      <section className="create-post-workspace">
        <header className="create-post-heading">
          <div className="create-post-eyebrow">
            <span className="create-post-eyebrow-dot" />
            YOUR CREATIVE SPACE
          </div>

          <h1>
            Bring your ideas
            <br />
            <span>to life.</span>
          </h1>

          <p>
            Every great article starts with an idea.
            <br className="create-post-desktop-break" />
            Put yours into words and share it with the world.
          </p>
        </header>

        <div className="create-post-card">
          <div className="create-post-card-top">
            <div className="create-post-document-icon" aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 3.75H14L19 8.75V20.25H7C5.9 20.25 5 19.35 5 18.25V5.75C5 4.65 5.9 3.75 7 3.75Z"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinejoin="round"
                />
                <path
                  d="M14 3.75V8.75H19M9 13H15M9 16.5H15"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div>
              <h2>New article</h2>
              <p>Write something worth reading.</p>
            </div>

            <span className="create-post-draft-badge">
              <span />
              EDITOR
            </span>
          </div>

          <div className="create-post-divider" />

          <form onSubmit={handleSubmit}>
            <div className="create-post-field">
              <div className="create-post-label-row">
                <label htmlFor="post-title">Article title</label>
                <span>REQUIRED</span>
              </div>

              <input
                id="post-title"
                type="text"
                name="title"
                placeholder="Give your article a great title..."
                value={formData.title}
                onChange={handleChange}
                maxLength={160}
                required
              />

              <div className="create-post-field-hint">
                Make it clear, interesting, and memorable.
                <span>{formData.title.length}/160</span>
              </div>
            </div>

            <div className="create-post-field create-post-content-field">
              <div className="create-post-label-row">
                <label htmlFor="post-content">Your story</label>
                <span>REQUIRED</span>
              </div>

              <textarea
                id="post-content"
                name="content"
                placeholder="Start with your idea...&#10;&#10;Share your thoughts, explain what you have learned, or tell a story that matters."
                value={formData.content}
                onChange={handleChange}
                rows={12}
                required
              />

              <div className="create-post-field-hint">
                Take your time. Good writing is worth sharing.
                <span>
                  {formData.content.trim()
                    ? formData.content.trim().split(/\s+/).length
                    : 0}{" "}
                  words
                </span>
              </div>
            </div>

            {message && (
              <div
                className={`create-post-message ${
                  message.includes("successfully")
                    ? "create-post-message-success"
                    : "create-post-message-error"
                }`}
                role="status"
              >
                <span aria-hidden="true">
                  {message.includes("successfully") ? "✓" : "!"}
                </span>
                {message}
              </div>
            )}

            <div className="create-post-form-footer">
              <div className="create-post-footer-note">
                <span aria-hidden="true">✦</span>
                <span>Your voice. Your ideas. Your story.</span>
              </div>

              <button
                type="submit"
                className="create-post-publish-button"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="create-post-spinner" />
                    Publishing...
                  </>
                ) : (
                  <>
                    Publish article
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        d="M5 12H19M12 5L19 12L12 19"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        <footer className="create-post-bottom-note">
          <span className="create-post-bottom-line" />
          <span>MADE FOR CURIOUS MINDS</span>
          <span className="create-post-bottom-line" />
        </footer>
      </section>
    </main>
  );
}

export default CreatePostPage;
