import React from "react";
import "./index.css"; // Import your CSS file for styles
import { useNavigate } from "react-router-dom";

function ErrorPage() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/"); // Navigate to the previous page
  };

  return (
    <div className="error-container">
      <h1 className="error-title">Something went wrong please try after sometime</h1>
      <div className="error-buttons">
        <button className="error-button" onClick={handleGoBack}>
          Go Back
        </button>
      </div>
    </div>
  );
}

export default ErrorPage;
