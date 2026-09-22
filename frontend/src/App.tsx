import "./App.css";
import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";

// Main Pages
import HomePage from "./pages/HomePage";
import PostsPage from "./pages/PostsPage";
import PostDetailPage from "./pages/PostDetailPage";
import CategoriesPage from "./pages/CategoriesPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

// Dashboard Pages
import DashboardPage from "./pages/DashboardPage";
import ProfilePage from "./pages/ProfilePage";
import MyPostsPage from "./pages/MyPostsPage";
import BookmarksPage from "./pages/BookmarksPage";
import NotificationsPage from "./pages/NotificationsPage";
import SettingsPage from "./pages/SettingsPage";

function App() {
  return (
    <Routes>
      {/* Main Website */}
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />

        <Route path="posts" element={<PostsPage />} />
        <Route path="posts/:id" element={<PostDetailPage />} />

        <Route path="categories" element={<CategoriesPage />} />

        <Route path="create-post" element={<MyPostsPage />} />

        {/* User Pages */}
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="my-posts" element={<MyPostsPage />} />
        <Route path="bookmarks" element={<BookmarksPage />} />
        <Route path="notifications" element={<NotificationsPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>

      {/* Authentication */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* 404 */}
      <Route path="*" element={<h1>404 - Page Not Found</h1>} />
    </Routes>
  );
}

export default App;