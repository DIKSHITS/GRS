import React from "react";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "universal-cookie";

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove the user cookie
    const cookies = new Cookies();
    cookies.remove("user", { path: "/" });

    // Clear session storage
    sessionStorage.clear();

    // Redirect to the home page
    navigate("/");
  };

  
}

export default LogoutButton;
