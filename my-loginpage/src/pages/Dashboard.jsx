import React from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Dashboard({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    
    setUser(null);
    localStorage.removeItem("user");

    
    navigate("/login");
  };

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <h1>My Dashboard</h1>
        <div className="user-info">
          <span>👤 {user?.name}</span>
          <button className="logout-btn" onClick={handleLogout}>
            🚪 Logout
          </button>
        </div>
      </header>

      <div className="dashboard-container">
        {/* Sidebar */}
        <aside className="dashboard-sidebar">
          <ul>
            <li>🏠 Home</li>
            <li>📊 Analytics</li>
            <li>📁 Projects</li>
            <li>⚙️ Settings</li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="dashboard-content">
          <h2>Welcome, {user?.name} 🎉</h2>
          <p>Email: {user?.email}</p>
          <p>Mobile: {user?.mobile}</p>

          <div className="cards">
            <div className="card">
              <h3>Total Projects</h3>
              <p>12</p>
            </div>
            <div className="card">
              <h3>Tasks Completed</h3>
              <p>45</p>
            </div>
            <div className="card">
              <h3>Notifications</h3>
              <p>5</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
