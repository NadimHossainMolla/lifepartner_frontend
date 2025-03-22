import React,{useState, useEffect }from 'react';
import { FaBars, FaTachometerAlt, FaUser, FaEnvelope, FaCog, FaSignOutAlt } from 'react-icons/fa';
import axios from 'axios';


function SidebarMenu({ collapsed, toggleSidebar }) {
  const token = localStorage.getItem("token");
  const [sideBarDetails, setsideBarDetails] = useState([]);
  const AccountId = localStorage.getItem("AccountId");
    // Fetch all files when the component mounts
    useEffect(() => {
      const fetchSideBarDetails = async () => {
        try {
          const response = await fetch(`https://localhost:7249/api/Accounts/SideBarDetailsById/${AccountId}`,{
            headers: {
                Authorization: `Bearer ${token}`,
            }
          });
          const data = await response.json();
          setsideBarDetails(data); // Update state with fetched files
        } catch (error) {
          console.error("Error fetching SideBar Details:", error);
        }
      };
      fetchSideBarDetails();
    }, []);
  
    // Fetch all files for the given account ID
    
    return (
      <div
        className="sidebar background-radial-gradient"
        style={{
          width: collapsed ? '60px' : '250px', // Sidebar width changes based on collapsed state
          height: '100vh',
          position: 'fixed',
          display: 'flex',
          flexDirection: 'column',
          transition: 'width 0.3s ease', // Smooth transition
          boxShadow: '2px 0 5px rgba(0, 0, 0, 0.2)', // Slight shadow for depth
        }}
      >
        {/* Collapse Button */}
        <button
          onClick={toggleSidebar}
          style={{
            position: 'absolute',
            top: '20px',
            right: '-3px',
            backgroundColor: 'transparent',
            border: 'none',
            color: 'white', // Gold for a luxurious touch
            fontSize: '24px',
            cursor: 'pointer',
            zIndex: 1000, // Ensure hamburger menu is above other elements
          }}
        >
          <FaBars />
        </button>
  
        {/* Profile Section - only show when sidebar is expanded */}
        {!collapsed && (
          <div className="text-center mb-4" style={{ borderBottom: '1px solid white', paddingBottom: '10px' }}>
            <img
              src={sideBarDetails.defaultImage}
              alt="Default Image"
              className="rounded-circle"
              style={{
                width: '100px',
                height: '100px',
                objectFit: 'cover',
                border: '3px solid white', // Gold border around profile picture
              }}
            />
            <h4 className="mt-3" style={{ color: 'white' }}>
            {sideBarDetails.fullName}
            </h4>
            <p style={{ color:"skyblue" }}>Membership : {sideBarDetails.membershipStatus}</p>
            <p style={{ color:"white" }}>End Date : {sideBarDetails.membershipEndDate}</p>
            <button className="btn btn-warning btn-sm">
              Renew/Upgrade
            </button>
            <br/>
          </div>
        )}
        <br />
        <br />
        {/* Menu Items */}
        <ul className="nav flex-column w-100">
          <li className="nav-item" title={collapsed ? 'Dashboard' : ''}>
            <a
              href="/dashboard"
              className="nav-link text-light px-4 py-2 d-flex align-items-center"
              style={{ color: collapsed ? '#FFD700' : 'white', transition: 'color 0.3s' }}
            >
              {collapsed ? <FaTachometerAlt /> : 'Dashboard'}
            </a>
          </li>
          <li className="nav-item" title={collapsed ? 'My Profile' : ''}>
            <a
              href="/profile"
              className="nav-link text-light px-4 py-2 d-flex align-items-center"
              style={{ color: collapsed ? '#FFD700' : 'white', transition: 'color 0.3s' }}
            >
              {collapsed ? <FaUser /> : 'My Profile'}
            </a>
          </li>
          <li className="nav-item" title={collapsed ? 'Messages' : ''}>
            <a
              href="/messages"
              className="nav-link text-light px-4 py-2 d-flex align-items-center"
              style={{ color: collapsed ? '#FFD700' : 'white', transition: 'color 0.3s' }}
            >
              {collapsed ? <FaEnvelope /> : 'Messages'}
            </a>
          </li>
          <li className="nav-item" title={collapsed ? 'Settings' : ''}>
            <a
              href="/settings"
              className="nav-link text-light px-4 py-2 d-flex align-items-center"
              style={{ color: collapsed ? '#FFD700' : 'white', transition: 'color 0.3s' }}
            >
              {collapsed ? <FaCog /> : 'Settings'}
            </a>
          </li>
          <li className="nav-item" title={collapsed ? 'Logout' : ''}>
            <a
              href="/logout"
              className="nav-link text-light px-4 py-2 d-flex align-items-center"
              style={{ color: collapsed ? '#FFD700' : 'white', transition: 'color 0.3s' }}
            >
              {collapsed ? <FaSignOutAlt /> : 'Logout'}
            </a>
          </li>
        </ul>
      </div>
    );
  }
  
  export default SidebarMenu;