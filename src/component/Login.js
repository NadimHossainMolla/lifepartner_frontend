import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../services/appClient';
import Footer from './Footer';
import './style.css';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checked, setChecked] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); // State for the error message
  const [isRegistering, setIsRegistering] = useState(false); // State to toggle between login and register

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Reset error message on form submit

    // Validation for empty fields
    if (!email && !password) {
      setErrorMessage('Both fields are required.');
      return;
    }
    if (!email) {
      setErrorMessage('Username is required.');
      return;
    }
    if (!password) {
      setErrorMessage('Password is required.');
      return;
    }

    // Optional: You can add more validation for email format or password strength
    // For example, basic email format check:
    //const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    //if (!emailRegex.test(email)) {
      //setErrorMessage('Please enter a valid email.');
      //return;
    //}

    // Password validation (you can add more rules here, like min length, special characters, etc.)
    //if (password.length < 6) {
      //setErrorMessage('Password must be at least 6 characters.');
      //return;
    //}

    try {
      
      const response = await apiClient.post("/Login", { 
        Username: email,
        Password: password
      });

      debugger;
      // Handle response
      if (response.status === 200 || response.status === 201) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("AccountId", response.data.id);
        navigate('/dashboard');
        // Reset form fields
        setEmail('');
        setPassword('');
        setChecked(false);
      } else {
        setErrorMessage('Wrong Username / Password!');
      }
    } catch (err) {
      if (err.response) {
        if (err.response.status === 401 || err.response.status === 404) {
          setErrorMessage('Wrong Username / Password!');
        } else {
          setErrorMessage('An unexpected error occurred.');
        }
      } else {
        setErrorMessage('Network error, please try again later.');
      }
    }
  };

  const RedirectToRegister = () => {
    navigate('/register'); // Redirect to the register page
  };

  return (
    <div>
      <section className="background-radial-gradient overflow-hidden">
        <div className="container px-4 py-5 px-md-5 my-5 pt-8">
          <div className="row gx-lg-5 pt-5 align-items-center">
            {/* Left side: Logo and Text */}
            <div className="col-lg-6 mb-5 mb-lg-0 pt-6">
              <div className="text-start">
                {/* Logo */}
                <img
                  src={require('../assets/images/logo.png')} // Ensure correct path
                  alt="Logo"
                  className="img-fluid"
                  style={{ height: '400px', width: 'auto' }} // Adjust size as needed
                />
              </div>
            </div>

            {/* Right side: Login Form */}
            <div className="col-lg-6 mb-5 mb-lg-0 pt-6">
              <div className="card bg-glass">
                <div className="card-body px-4 py-5 px-md-5">
                  <form onSubmit={handleSubmit}>
                    {/* Email Input */}
                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1">Email/Mobile No</label>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputEmail1"
                        placeholder="Enter your email or mobile"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    {/* Password Input */}
                    <div className="form-group">
                      <label htmlFor="exampleInputPassword1">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="exampleInputPassword1"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>

                    {/* Checkbox */}
                    <div className="form-group form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="exampleCheck1"
                        checked={checked}
                        onChange={(e) => setChecked(e.target.checked)}
                      />
                      <label className="form-check-label" htmlFor="exampleCheck1">
                        Remember me
                      </label>
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="btn btn-primary">
                      Login
                    </button>

                    {/* Error Message */}
                    {errorMessage && (
                      <div
                        className="alert alert-danger mt-3"
                        role="alert"
                        style={{
                          backgroundColor: '#f8d7da',
                          color: '#721c24',
                          border: '1px solid #f5c6cb',
                        }}
                      >
                        {errorMessage}
                      </div>
                    )}

                    {/* Register Button */}
                    <div className="text-center mt-3">
                      <button
                        type="button"
                        className="btn btn-link"
                        onClick={() => RedirectToRegister()} // Switch to Register form
                      >
                        Don't have an account? Register here
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Login;
