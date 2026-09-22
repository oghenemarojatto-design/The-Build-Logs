import "./DashboardPage.css";
import {
  FiFileText,
  FiEye,
  FiBookmark,
  FiUsers,
  FiPlus,
  FiTrendingUp,
} from "react-icons/fi";

export default function DashboardPage() {
  return (
    <div className="dashboard">

      <div className="dashboard-header">
        <div>
          <h1>Welcome back, Victor 👋</h1>
          <p>Here's what's happening with your BlueBlog account today.</p>
        </div>

        <button className="new-post-btn">
          <FiPlus />
          New Post
        </button>
      </div>

      <div className="stats-grid">

        <div className="stat-card">
          <FiFileText className="stat-icon" />
          <h2>18</h2>
          <p>Total Posts</p>
        </div>

        <div className="stat-card">
          <FiEye className="stat-icon" />
          <h2>24.8K</h2>
          <p>Total Views</p>
        </div>

        <div className="stat-card">
          <FiBookmark className="stat-icon" />
          <h2>156</h2>
          <p>Bookmarks</p>
        </div>

        <div className="stat-card">
          <FiUsers className="stat-icon" />
          <h2>1.2K</h2>
          <p>Followers</p>
        </div>

      </div>

      <div className="dashboard-grid">

        <div className="dashboard-card">
          <h3>Recent Posts</h3>

          <ul>
            <li>Understanding React Hooks</li>
            <li>Future of Artificial Intelligence</li>
            <li>Modern CSS Tricks</li>
            <li>Django REST API Guide</li>
          </ul>
        </div>

        <div className="dashboard-card">
          <h3>Quick Actions</h3>

          <button>Create New Post</button>
          <button>Edit Profile</button>
          <button>Manage Categories</button>
        </div>

        <div className="dashboard-card">
          <h3>Performance</h3>

          <div className="performance">
            <FiTrendingUp />
            <span>+18% this month</span>
          </div>

          <p>Your articles are performing better than last month.</p>
        </div>

      </div>

    </div>
  );
}