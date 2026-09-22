import "./DashboardLayout.css";
import DashboardSidebar from "./DashboardSidebar";
import DashboardHeader from "./DashboardHeader";

interface DashboardLayoutProps {
  title: string;
  children: React.ReactNode;
}

export default function DashboardLayout({
  title,
  children,
}: DashboardLayoutProps) {
  return (
    <div className="dashboard">
      <DashboardSidebar />

      <div className="dashboard-main">
        <DashboardHeader title={title} />

        <main className="dashboard-content">
          {children}
        </main>
      </div>
    </div>
  );
}