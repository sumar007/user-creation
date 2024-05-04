import React from "react";
import { Link } from "react-router-dom";
import "./AdminDashboard.css";

const AdminPanel = () => {
  return (
    <div className="admin-dashboard-container">
      <h2>Admin Dashboard</h2>
      <div className="dashboard-buttons">
        <Link to="/admin/add-user">
          <button>Add User</button>
        </Link>
        <Link to="/admin/users">
          <button>Get Users</button>
        </Link>
      </div>
    </div>
  );
};

export default AdminPanel;
