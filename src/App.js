import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Login from "./component/Login";
import Register from './component/Register';
import Dashboard from './component/Dashboard';
import Profile from './component/Profile';
import PrivateRoute from './component/PrivateRoute';
import Logout from './component/Logout';

function Home() {
  const navigate = useNavigate();

  const handleFindPartnerClick = () => {
    navigate('/login'); // Redirect to the Login page
  };

  return (
    <div>
    <section className="background-radial-gradient overflow-hidden">
      <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
        <div className="row gx-lg-5 align-items-center mb-5">
          <div className="col-lg-6 mb-5 mb-lg-0" style={{ zIndex: 10 }}>
            <h1 className="my-5 display-5 fw-bold ls-tight" style={{ color: 'hsl(218, 81%, 95%)' }}>
              Welcome to Matrimony <br />
              <span style={{ color: 'hsl(218, 81%, 75%)' }}>Find Your Perfect Partner</span>
            </h1>
            <p className="mb-4 opacity-70" style={{ color: 'hsl(218, 81%, 85%)' }}>
              Join thousands of others in finding a life partner. 
              Match, connect, and find yours.
            </p>
            <button
              className="btn btn-primary btn-lg"
              style={{ backgroundColor: 'hsl(218, 81%, 75%)', border: 'none' }}
              onClick={handleFindPartnerClick}
            >
              Let's get started
            </button>
          </div>

          <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
          <div className="card bg-glass">
            <div className="card-body d-flex flex-column align-items-center justify-content-center px-4 py-5 px-md-5">
              <h2 className="text-center">Our Promise</h2>
              <p className="text-center">
                We provide a trusted platform to find a partner for your life journey.
              </p>
              <img 
                src={require('./assets/images/matrimony-logo.png')} 
                alt="Logo" 
                className="img-fluid"
                
              />
            </div>
          </div>
        </div>

        </div>
      </div>
    </section>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

