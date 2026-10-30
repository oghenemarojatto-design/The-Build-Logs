import { Link } from "react-router-dom";
import DashboardLayout from "../components/Dashboard/DashboardLayout";
import "./BookmarksPage.css";

export default function BookmarksPage() {
  return (
    <DashboardLayout title="Bookmarks">
      <div className="bookmarks-page">
        <h1>Bookmarks</h1>

        <div className="bookmark-card">
          <h3>No bookmarks yet</h3>
          <p>
            Your saved articles will appear here once bookmarking
            is connected.
          </p>
          <Link to="/posts">Explore articles</Link>
        </div>
      </div>
    </DashboardLayout>
  );
}
