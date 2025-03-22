import React, { useState } from 'react';
import SidebarMenu from './SidebarMenu';
import DashboardContent from './DashboardContent';
import Footer from './Footer';

function Dashboard() {
  const [collapsed, setCollapsed] = useState(true); // Track sidebar collapse state

  // Toggle sidebar when hamburger menu is clicked
  const toggleSidebar = () => {
    setCollapsed((prevState) => !prevState);
  };
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      <SidebarMenu collapsed={collapsed} toggleSidebar={toggleSidebar} />
      
      {/* Main Content */}
      <div
        style={{
          marginLeft: collapsed ? '60px' : '250px',  // Adjust margin dynamically
          width: '100%',
          overflowX: 'hidden', // Prevent horizontal scrolling if content overflows
          transition: 'margin-left 0.3s ease', // Smooth transition
        }}
      >
        {/* Dashboard Content */}
        <DashboardContent collapsed={collapsed} />
        <Footer />
      </div>
    </div>
  );
}

export default Dashboard;
