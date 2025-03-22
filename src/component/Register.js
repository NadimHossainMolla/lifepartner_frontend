import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom for navigation
import './style.css';
import Footer from './Footer';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // State for error messages
  const [successMessage, setSuccessMessage] = useState(''); // State for success messages

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Reset error message before validation
    setSuccessMessage(''); // Reset success message before validation

    // Basic validation
    if (!email || !password || !confirmPassword) {
      setErrorMessage('All fields are required.');
      return;
    }

    // Check if input is an email or a contact number
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    const contactRegex = /^\d{10}$/;

    if (!emailRegex.test(email) && !contactRegex.test(email)) {
      setErrorMessage('Please enter a valid email or a 10-digit contact number.');
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      setErrorMessage("Passwords don't match!");
      return;
    }

    // Password length check (you can add more complex checks)
    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters.');
      return;
    }

    // Validation passed, proceed with form submission


    try {
      // Axios POST request for registration
      const response = await axios.post('https://localhost:7249/api/Accounts/Register', {
        Username: email,
        Password: password,
      });

      // Handle the response based on status
      if (response.status === 200 || response.status === 201) {
        setSuccessMessage('Congrats! You are Registered Successfully. Please login now');
        // Reset form fields
        setEmail('');
        setPassword('');
        setConfirmPassword('');
      } else {
        setErrorMessage('Sorry! Email or Mobile No already exists!');
      }
    } catch (err) {
      setErrorMessage('An error occurred: ' + err.message);
      console.error('Error during registration:', err);
    }
  };

  return (
    <div>
      <section className="background-radial-gradient overflow-hidden">
        <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-5 pt-5">
          <div className="row gx-lg-5 align-items-center mb-5 pt-5">
            <div className="col-lg-6 mb-5 mb-lg-0 pt-4" style={{ zIndex: 10 }}>
              <h1 className="my-5 display-5 fw-bold ls-tight" style={{ color: 'hsl(218, 81%, 95%)' }}>
                find the best partner <br />
                <span style={{ color: 'hsl(218, 81%, 75%)' }}>for your life</span>
              </h1>
              <p className="mb-4 opacity-70" style={{ color: 'hsl(218, 81%, 85%)' }}>
                Marriage is not just about finding the right person, it is also about being the right person. Let's get registered on our platform and embark on a journey to find your perfect match, while enjoying exclusive benefits and a trusted space for your love story.
              </p>
            </div>

            <div className="col-lg-6 mb-5 mb-lg-0 pt-4 position-relative">
              <div className="card bg-glass">
                <div className="card-body px-4 py-5 px-md-5">
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="text">Email / Mobile No</label>
                      <input
                        type="text"
                        className="form-control"
                        id="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="confirmPassword">Confirm Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="confirmPassword"
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                    <br />

                    {/* Conditionally render Register button */}
                    {!successMessage && (
                      <button type="submit" className="btn btn-primary">
                        Register
                      </button>
                    )}

                    {/* Display error message */}
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

                    {/* Display success message and login link */}
                    {successMessage && (
                      <div
                        className="alert alert-success mt-3"
                        role="alert"
                        style={{
                          backgroundColor: '#d4edda',
                          color: '#155724',
                          border: '1px solid #c3e6cb',
                        }}
                      >
                        {successMessage}
                        <br />
                        <Link to="/login" className="alert-link">
                          Click here to login
                        </Link>
                      </div>
                    )}
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

export default Register;
