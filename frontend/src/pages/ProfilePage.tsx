import { useEffect, useState, type FormEvent } from "react";
import DashboardLayout from "../components/Dashboard/DashboardLayout";
import api from "../services/api";
import "./ProfilePage.css";

interface UserProfile {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [formData, setFormData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
  });

  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get<UserProfile>("/api/profile/");

      setProfile(response.data);
      setFormData({
        username: response.data.username || "",
        first_name: response.data.first_name || "",
        last_name: response.data.last_name || "",
        email: response.data.email || "",
      });
    } catch {
      setError("Unable to load your profile. Please log in again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const response = await api.patch("/api/profile/", formData);

      const updatedProfile = response.data.user as UserProfile;

      setProfile(updatedProfile);
      setFormData({
        username: updatedProfile.username,
        first_name: updatedProfile.first_name,
        last_name: updatedProfile.last_name,
        email: updatedProfile.email,
      });

      localStorage.setItem(
        "user",
        JSON.stringify({
          username: updatedProfile.username,
          email: updatedProfile.email,
        })
      );

      setEditing(false);
      setSuccess("Your profile has been updated successfully.");
    } catch (err: any) {
      const data = err.response?.data;

      if (data && typeof data === "object") {
        const firstError = Object.values(data).flat()[0];
        setError(
          typeof firstError === "string"
            ? firstError
            : "Unable to update your profile."
        );
      } else {
        setError("Unable to update your profile. Please try again.");
      }
    } finally {
      setSaving(false);
    }
  };

  const initials = profile
    ? `${profile.first_name?.[0] || ""}${profile.last_name?.[0] || ""}` ||
      profile.username[0]?.toUpperCase() ||
      "U"
    : "U";

  if (loading) {
    return (
      <DashboardLayout title="My Profile">
        <div className="profile-page">
          <p>Loading your profile...</p>
        </div>
      </DashboardLayout>
    );
  }

  if (!profile) {
    return (
      <DashboardLayout title="My Profile">
        <div className="profile-page">
          <p>{error}</p>
          <button onClick={fetchProfile}>Try Again</button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="My Profile">
      <div className="profile-page">
        <div className="profile-card">
          <div className="profile-avatar">{initials.toUpperCase()}</div>

          <div className="profile-info">
            <h2>
              {profile.first_name || profile.last_name
                ? `${profile.first_name} ${profile.last_name}`.trim()
                : profile.username}
            </h2>

            <p>{profile.email || "No email added"}</p>

            <button onClick={() => setEditing(!editing)}>
              {editing ? "Cancel Editing" : "Edit Profile"}
            </button>
          </div>
        </div>

        {error && <p className="profile-error">{error}</p>}
        {success && <p className="profile-success">{success}</p>}

        {editing && (
          <form className="profile-section" onSubmit={handleSave}>
            <h3>Edit Your Information</h3>

            <div className="profile-form">
              <label>
                Username
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                First Name
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                />
              </label>

              <label>
                Last Name
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                />
              </label>

              <label>
                Email
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </label>
            </div>

            <button type="submit" disabled={saving}>
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </form>
        )}

        <div className="profile-grid">
          <div className="profile-section">
            <h3>Personal Information</h3>

            <div className="info-row">
              <span>Full Name</span>
              <strong>
                {`${profile.first_name} ${profile.last_name}`.trim() ||
                  "Not provided"}
              </strong>
            </div>

            <div className="info-row">
              <span>Username</span>
              <strong>{profile.username}</strong>
            </div>

            <div className="info-row">
              <span>Email</span>
              <strong>{profile.email || "Not provided"}</strong>
            </div>

            <div className="info-row">
              <span>Account ID</span>
              <strong>#{profile.id}</strong>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

