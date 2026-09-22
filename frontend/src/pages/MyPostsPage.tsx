import DashboardLayout from "../components/Dashboard/DashboardLayout";
import "./MyPostsPage.css";

export default function MyPostsPage() {
  const posts = [
    {
      id: 1,
      title: "Understanding React Hooks",
      category: "Technology",
      status: "Published",
      views: 1250,
    },
    {
      id: 2,
      title: "Artificial Intelligence in 2026",
      category: "AI",
      status: "Draft",
      views: 0,
    },
    {
      id: 3,
      title: "Modern CSS Tips",
      category: "Design",
      status: "Published",
      views: 890,
    },
  ];

  return (
    <DashboardLayout title="My Posts">
      <div className="myposts-page">

        <div className="page-top">
          <h1>My Posts</h1>

          <button>Create New Post</button>
        </div>

        <div className="posts-table">

          {posts.map((post) => (
            <div className="post-row" key={post.id}>

              <div>
                <h3>{post.title}</h3>
                <p>{post.category}</p>
              </div>

              <span>{post.status}</span>

              <strong>{post.views} Views</strong>

              <div className="actions">
                <button>Edit</button>
                <button className="delete">Delete</button>
              </div>

            </div>
          ))}

        </div>

      </div>
    </DashboardLayout>
  );
}