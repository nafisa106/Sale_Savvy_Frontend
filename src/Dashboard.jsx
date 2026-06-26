// Dashboard.jsx
import React from "react";
import "./assets/styles.css";

function Dashboard({ name }) {
  return (
    <div className="dashboard-container">
      <h1>Hello {name},</h1>
      <h2>Welcome to KodNest Dashboard!</h2>
    </div>
  );
}

export default Dashboard;