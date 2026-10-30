import "./DashboardSidebar.css";

export default function DashboardSidebar() {
  return (
    <aside className="dashboard-sidebar">
      <h2>The Build Logs</h2>

      <nav>
        <p>Dashboard</p>
        <p>Profile</p>
        <p>My Posts</p>
        <p>Bookmarks</p>
        <p>Notifications</p>
        <p>Settings</p>
      </nav>
    </aside>
  );
}