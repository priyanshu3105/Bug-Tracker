import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import bugImage from "../components/bugImage.png";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <h1>
        <Link to="/dashboard">
          <img src={bugImage} alt="Bug Tracker Logo" className="navbar-logo" />{" "}
          {/* Use the imported image */}
          Bug Tracker
        </Link>
      </h1>
      <ul>
        <li>
          <button onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
