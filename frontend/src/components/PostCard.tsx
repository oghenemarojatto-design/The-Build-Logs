import { Link } from "react-router-dom";
import { FiArrowRight, FiHeart, FiClock, FiShare2, FiMessageSquare, FiUsers } from "react-icons/fi";
import "./PostCard.css";

interface Author {
  username: string;
}

interface PostCardProps {
  id: number;
  title: string;
  content: string;
  author: Author;
  category?: string;
  readTime?: string;
  connections?: number;
}

function PostCard({
  id,
  title,
  content,
  author,
  category = "Technology",
  readTime = "5 min read",
  connections = 0,
}: PostCardProps) {
  const getCategoryColor = (cat: string) => {
    const colors: { [key: string]: string } = {
      Technology: "#3b82f6",
      Science: "#10b981", 
      Arts: "#f59e0b",
      Frontend: "#6366f1",
      Backend: "#8b5cf6",
      AI: "#ef4444",
    };
    return colors[cat] || colors.Technology;
  };

  return (
    <article className="post-card">
      <div className="post-card-header">
        <span 
          className="category-badge"
          style={{ backgroundColor: `${getCategoryColor(category)}20`, color: getCategoryColor(category) }}
        >
          {category}
        </span>
        {connections > 0 && (
          <div className="connections-badge">
            <FiShare2 className="connections-icon" />
            <span>{connections}</span>
          </div>
        )}
      </div>

      <div className="post-image">
        <img 
          src={`https://picsum.photos/seed/${id}/300/200`} 
          alt={title}
          loading="lazy"
        />
      </div>

      <div className="post-content">
        <h3>{title}</h3>
        <p>{content.substring(0, 120)}...</p>

        <div className="post-meta">
          <div className="author-info">
            <div className="avatar">
              {author.username.charAt(0).toUpperCase()}
            </div>
            <span className="author-name">{author.username}</span>
          </div>
          <div className="post-stats">
            <div className="stat-item">
              <FiClock className="stat-icon" />
              <span>{readTime}</span>
            </div>
            <div className="stat-item">
              <FiHeart className="stat-icon" />
              <span>128</span>
            </div>
            <div className="stat-item">
              <FiMessageSquare className="stat-icon" />
              <span>42</span>
            </div>
          </div>
        </div>

        <div className="post-interactions">
          <button className="interaction-btn">
            <FiHeart />
            <span>Like</span>
          </button>
          <button className="interaction-btn">
            <FiMessageSquare />
            <span>Comment</span>
          </button>
          <button className="interaction-btn">
            <FiUsers />
            <span>Connect</span>
          </button>
        </div>

        <Link to={`/posts/${id}`} className="read-more-btn">
          Read Full Article
          <FiArrowRight className="arrow-icon" />
        </Link>
      </div>
    </article>
  );
}

export default PostCard;
