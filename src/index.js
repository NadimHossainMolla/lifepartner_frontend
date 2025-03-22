import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.min";
import { jwtDecode } from 'jwt-decode';

// Check token expiry
const checkTokenExpiry = () => {
  debugger;
  const token = localStorage.getItem("token");
  const currentPath = window.location.pathname; // Get the current URL path

    if (currentPath === "/login" || currentPath === "/" ) {
        return; // Skip checking token expiry on the login page
    }
    else{
      if (token) {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000; // Current time in seconds
        if (decoded.exp < currentTime) {
            localStorage.removeItem("jwtToken"); // Remove expired token
            alert("Session expired. Please log in again.");
            window.location.href = "/login"; // Redirect to login page
        }
    }

    }
  
};

// Run the token check before rendering the app
checkTokenExpiry();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
