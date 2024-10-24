import React from "react";
import ReactDOM from "react-dom";
import "./index.css"; // Optional: if you have global styles
import App from "./App"; // Import the main App component
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter for routing

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
