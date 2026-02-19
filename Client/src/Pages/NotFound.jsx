import React from "react";
import { useNavigate } from "react-router-dom";
export const NotFound = () => {
    const navigate = useNavigate();
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <button onClick={() => navigate('/login')}>Login</button>
    </div>
  );
};


