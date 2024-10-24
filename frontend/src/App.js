import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import BugList from "./components/Dashboard/BugList";
import AddBugForm from "./components/Dashboard/AddBugForm";
import "./App.css";
import axios from "axios";

function App() {
  const [bugs, setBugs] = useState([]);
  const navigate = useNavigate();

  const fetchBugs = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/bugs");
      setBugs(response.data);
    } catch (error) {
      console.error("Error fetching bugs:", error.response.data.message);
    }
  };

  const addBug = (newBug) => {
    setBugs((prevBugs) => [...prevBugs, newBug]); // Add the complete bug object
  };

  const editBug = (bugId, updatedBug) => {
    setBugs((prevBugs) =>
      prevBugs.map((bug) => (bug._id === bugId ? updatedBug : bug))
    ); // Update the specific bug using its ID
  };

  const deleteBug = (bugId) => {
    setBugs((prevBugs) => prevBugs.filter((bug) => bug._id !== bugId)); // Remove the bug by ID
  };

  useEffect(() => {
    fetchBugs();
  }, []);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={
            <>
              <BugList bugs={bugs} editBug={editBug} deleteBug={deleteBug} />
              <button
                className="add-bug-button"
                onClick={() => navigate("/add-bug")}
              >
                Add New Bug
              </button>
            </>
          }
        />
        <Route path="/add-bug" element={<AddBugForm addBug={addBug} />} />
      </Routes>
    </div>
  );
}

export default App;
