import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import BugList from "./BugList";
import AddBugForm from "./AddBugForm";
import "./Dashboard.css";

const Dashboard = ({ bugs, addBug, editBug, deleteBug }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="dashboard">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <BugList bugs={bugs} editBug={editBug} deleteBug={deleteBug} />
            </>
          }
        />
        <Route path="/add-bug" element={<AddBugForm addBug={addBug} />} />
      </Routes>
    </div>
  );
};

export default Dashboard;
