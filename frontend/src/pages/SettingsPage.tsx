import DashboardLayout from "../components/Dashboard/DashboardLayout";
import "./SettingsPage.css";

export default function SettingsPage() {
  return (
    <DashboardLayout title="Settings">

      <div className="settings-page">

        <h1>Settings</h1>

        <div className="setting-card">

          <h3>Account</h3>

          <label>Name</label>
          <input type="text" value="Victor Jatto" readOnly />

          <label>Email</label>
          <input type="email" value="victor@email.com" readOnly />

        </div>

        <div className="setting-card">

          <h3>Appearance</h3>

          <button>🌞 Light Mode</button>

          <button>🌙 Dark Mode</button>

        </div>

        <div className="setting-card danger">

          <h3>Danger Zone</h3>

          <button>Delete Account</button>

        </div>

      </div>

    </DashboardLayout>
  );
}