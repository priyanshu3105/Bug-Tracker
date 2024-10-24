import React, { useState } from "react";
import axios from "axios";
import "./BugList.css";

const BugList = ({ bugs, editBug, deleteBug }) => {
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedBug, setEditedBug] = useState({});

  const handleEditClick = (index) => {
    setEditingIndex(index);
    setEditedBug(bugs[index]); // Populate the edited bug state with the bug details
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedBug({ ...editedBug, [name]: value });
  };

  const handleSaveClick = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/bugs/${bugs[editingIndex]._id}`,
        editedBug
      );

      editBug(bugs[editingIndex]._id, {
        ...editedBug,
        _id: bugs[editingIndex]._id,
      }); // Update using the bug ID
      setEditingIndex(null);
      setEditedBug({});
    } catch (error) {
      console.error("Error updating bug:", error);
    }
  };

  const handleDeleteClick = async (bugId) => {
    try {
      await axios.delete(`http://localhost:5000/api/bugs/${bugId}`);
      deleteBug(bugId); // Remove the bug using its ID
    } catch (error) {
      console.error("Error deleting bug:", error);
    }
  };

  return (
    <div className="bug-list">
      <h2>Bugs List</h2>
      <table className="bug-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Date</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bugs.length > 0 ? (
            bugs.map((bug, index) => (
              <tr
                key={bug._id}
                className={`bug-item ${(
                  bug.priority || "normal"
                ).toLowerCase()}`}
              >
                <td>
                  {editingIndex === index ? (
                    <input
                      type="text"
                      name="title"
                      value={editedBug.title}
                      onChange={handleInputChange}
                    />
                  ) : (
                    bug.title
                  )}
                </td>
                <td>
                  {editingIndex === index ? (
                    <input
                      type="text"
                      name="description"
                      value={editedBug.description}
                      onChange={handleInputChange}
                    />
                  ) : (
                    bug.description
                  )}
                </td>
                <td>
                  {editingIndex === index ? (
                    <input
                      type="date"
                      name="date"
                      value={editedBug.date}
                      onChange={handleInputChange}
                    />
                  ) : (
                    bug.date
                  )}
                </td>
                <td>
                  {editingIndex === index ? (
                    <select
                      name="status"
                      value={editedBug.status}
                      onChange={handleInputChange}
                    >
                      <option value="Open">Open</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Resolved">Resolved</option>
                    </select>
                  ) : (
                    bug.status
                  )}
                </td>
                <td>
                  {editingIndex === index ? (
                    <select
                      name="priority"
                      value={editedBug.priority}
                      onChange={handleInputChange}
                    >
                      <option value="Low">Low</option>
                      <option value="Normal">Normal</option>
                      <option value="High">High</option>
                    </select>
                  ) : (
                    bug.priority || "Normal" // Fallback to "Normal" if undefined
                  )}
                </td>
                <td>
                  {editingIndex === index ? (
                    <button onClick={handleSaveClick}>Save</button>
                  ) : (
                    <>
                      <button
                        className="edit-button"
                        onClick={() => handleEditClick(index)}
                      >
                        Edit
                      </button>
                      <button
                        className="delete-button"
                        onClick={() => handleDeleteClick(bug._id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No bugs found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BugList;
