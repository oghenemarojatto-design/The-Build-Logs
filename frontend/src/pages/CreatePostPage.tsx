import { useState } from "react";
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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      // Create the post
      await createPost(formData.title, formData.content);

      setMessage("✅ Post created successfully!");

      // Clear the form
      setFormData({
        title: "",
        content: "",
      });

      // Go to posts page after 1.5 seconds
      setTimeout(() => {
        navigate("/posts");
      }, 1500);
    } catch (error: any) {
      console.error("Error creating post:", error);

      if (error.response?.status === 401) {
        setMessage("Please login first.");
      } else if (error.response?.status === 400) {
        setMessage("Please fill in all required fields.");
      } else {
        setMessage("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-post-container">
      <div className="create-post-card">
        <h2>Create New Post</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Post Title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <textarea
            name="content"
            placeholder="Write your post..."
            value={formData.content}
            onChange={handleChange}
            rows={8}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Publishing..." : "Publish Post"}
          </button>
        </form>

        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
}

export default CreatePostPage;