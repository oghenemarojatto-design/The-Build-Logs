import DashboardLayout from "../components/Dashboard/DashboardLayout";
import "./BookmarksPage.css";

export default function BookmarksPage() {
  const bookmarks = [
    "The Future of Artificial Intelligence",
    "Mastering React Router",
    "Design Systems Explained",
    "Building REST APIs with Django",
  ];

  return (
    <DashboardLayout title="Bookmarks">
      <div className="bookmarks-page">

        <h1>Bookmarks</h1>

        {bookmarks.map((item, index) => (
          <div className="bookmark-card" key={index}>
            <div>
              <h3>{item}</h3>
              <p>Technology</p>
            </div>

            <button>Remove</button>
          </div>
        ))}

      </div>
    </DashboardLayout>
  );
}