import React from "react";

function Dashboard({ user }) {
  return (
    <div>
      <h2>Welcome, {user.name} 🎉</h2>
      <p>Email: {user.email}</p>
      <p>Mobile: {user.mobile}</p>
      <h3>This is your dashboard!</h3>
    </div>
  );
}

export default Dashboard;
