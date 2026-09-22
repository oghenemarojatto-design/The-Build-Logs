import "./DashboardHeader.css";

interface DashboardHeaderProps {
  title: string;
}

export default function DashboardHeader({
  title,
}: DashboardHeaderProps) {
  return (
    <header className="dashboard-header">
      <h1>{title}</h1>
    </header>
  );
}