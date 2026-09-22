import DashboardLayout from "../components/Dashboard/DashboardLayout";
import "./ProfilePage.css";

export default function ProfilePage() {
  return (
    <DashboardLayout title="My Profile">
      <div className="profile-page">

        <div className="profile-card">
          <div className="profile-avatar">V</div>

          <div className="profile-info">
            <h2>Victor Jatto</h2>
            <p>victor@email.com</p>

            <button>Edit Profile</button>
          </div>
        </div>

        <div className="profile-grid">

          <div className="profile-section">
            <h3>Personal Information</h3>

            <div className="info-row">
              <span>Full Name</span>
              <strong>Victor Jatto</strong>
            </div>

            <div className="info-row">
              <span>Username</span>
              <strong>victor</strong>
            </div>

            <div className="info-row">
              <span>Email</span>
              <strong>victor@email.com</strong>
            </div>

            <div className="info-row">
              <span>Location</span>
              <strong>Nigeria</strong>
            </div>

          </div>

          <div className="profile-section">

            <h3>Statistics</h3>

            <div className="stats">

              <div>
                <h2>25</h2>
                <p>Posts</p>
              </div>

              <div>
                <h2>120</h2>
                <p>Bookmarks</p>
              </div>

              <div>
                <h2>3.2K</h2>
                <p>Views</p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}