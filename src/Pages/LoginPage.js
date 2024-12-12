import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import useAuthStore from "../store/authStore";
import './LoginPage.css';  // Importing the new CSS file

const LoginPage = () => {
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/resources');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="login-page">
      <h1 className="star-wars-heading">Star Wars</h1>
      <AuthForm />
    </div>
  );
};

export default LoginPage;
