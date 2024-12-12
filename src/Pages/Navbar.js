import React from 'react';
import { useNavigate } from 'react-router-dom';  // For navigation
import useAuthStore from '../store/authStore';  // Import the auth store
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();  // Get the logout function from the store

  const handleLogout = () => {
    logout();  // Call the logout function to update the auth state
    navigate('/');  // Redirect to the login page
  };

  return (
    <div className="navbar">
      {/* Header Section */}
      <h1 className="navbar-title">Star Wars Data</h1>
      
      {/* Logout Button aligned to the right */}
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Navbar;
