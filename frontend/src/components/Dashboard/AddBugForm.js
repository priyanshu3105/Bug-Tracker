import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AddBugForm.css";

const AddBugForm = ({ addBug }) => {
  const [bugData, setBugData] = useState({
    title: "",
    description: "",
    date: "",
    status: "Open",
    priority: "Normal",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setBugData({ ...bugData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/bugs",
        bugData
      );
      console.log("Bug added:", response.data); // Debug the added bug
      addBug(response.data); // Pass the complete bug object to addBug
      navigate("/dashboard"); // Redirect to the dashboard
    } catch (error) {
      console.error("Error adding bug:", error);
    }
  };

  return (
    <div className="form-container">
      <h2>Add New Bug</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={bugData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={bugData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={bugData.date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={bugData.status}
            onChange={handleChange}
          >
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            name="priority"
            value={bugData.priority}
            onChange={handleChange}
          >
            <option value="Low">Low</option>
            <option value="Normal">Normal</option>
            <option value="High">High</option>
          </select>
        </div>
        <button type="submit" className="submit-button">
          Add Bug
        </button>
      </form>
      <button className="back-button" onClick={() => navigate("/dashboard")}>
        View Bug List
      </button>
    </div>
  );
};

export default AddBugForm;
