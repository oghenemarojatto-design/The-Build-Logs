import DashboardLayout from "../components/Dashboard/DashboardLayout";
import "./NotificationsPage.css";

export default function NotificationsPage() {
  const notifications = [
    {
      title: "John liked your article",
      time: "2 minutes ago",
    },
    {
      title: "Sarah commented on your post",
      time: "15 minutes ago",
    },
    {
      title: "New follower: David",
      time: "1 hour ago",
    },
    {
      title: "Your article reached 10,000 views 🎉",
      time: "Yesterday",
    },
  ];

  return (
    <DashboardLayout title="Notifications">
      <div className="notifications-page">

        <div className="page-header">
          <h1>Notifications</h1>
          <button>Mark All Read</button>
        </div>

        <div className="notification-list">

          {notifications.map((item, index) => (
            <div className="notification-card" key={index}>

              <div className="notification-dot"></div>

              <div className="notification-content">
                <h3>{item.title}</h3>
                <p>{item.time}</p>
              </div>

            </div>
          ))}

        </div>

      </div>
    </DashboardLayout>
  );
}