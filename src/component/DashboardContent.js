import React, { useState,useEffect } from 'react';
import SidebarMenu from './SidebarMenu'; // Import SidebarMenu component
import ProfileViewPopup from './ProfileViewPopUp';
import 'bootstrap/dist/css/bootstrap.min.css';
import apiClient from '../services/appClient.js'
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import Popup from "./Popup";

function DashboardContent() {
  const AccountId = localStorage.getItem("AccountId");
  const [dashboardStatDetails, setdashboardStatDetails] = useState([]);
  const [collapsed, setCollapsed] = useState(true);
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedTagIds, setSelectedTagIds] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState(""); // For dynamic styling
  const handleShowPopup = (message, type) => {
    setPopupMessage(message);
    setPopupType(type);
    setShowPopup(true);

    // Automatically hide after 5 seconds
    setTimeout(() => setShowPopup(false), 5000);
  };

  const fetchUserDetails = async (Id) => {
    debugger;
    try {
      const response = await apiClient.get(`/Accounts/DetailsById?Id=${Id}&&AccountId=${AccountId}`);
      const data = await response.data;
      setSelectedUser(data);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };


  const handleSendProposal = async (recipientId) => {
    try {
      const requestBody = {
        SendBy: localStorage.getItem("AccountId"),
        SendTo: recipientId,
      };

      const response = await apiClient.post("/Proposal/Send",requestBody);

      if (response.status === 200) {
        handleShowPopup("Proposal sent successfully!", "info");

        // Optionally, you can refresh the profiles list or perform other actions
      } else {
        alert("Failed to send proposal.");
        handleShowPopup("⚠️ An error occurred while sending proposal.", "error");

      }
    } catch (error) {
      console.error("Error sending proposal:", error);
      handleShowPopup("⚠️ An error occurred while sending proposal.", "error");
    }
  };

   // Fetch all dashboard stats when the component mounts
    useEffect(() => {
         const fetchSideBarDetails = async () => {
           try {
             const response = await apiClient.get(`/Accounts/DashboardStatsById/${AccountId}`);
             const data = await response.data;
             setdashboardStatDetails(data); // Update state with fetched files
           } 
           catch (error) {
             console.error("Error fetching dashboard stats Details:", error);
           }
         };
         fetchSideBarDetails();
    }, [])

  // Dashboard Statistics
  const dashboardStats = [
    {
      id: 1,
      title: 'Profile Completion',
      value: dashboardStatDetails.profileCompletion ? dashboardStatDetails.profileCompletion + " %" : 0 + " %",
      icon: 'bi-person-fill',
      color: 'bg-success',
      link: '/profile', // Example link
    },
    {
      id: 2,
      title: 'Received Proposals',
      value: dashboardStatDetails.totalReceivedProposal ? dashboardStatDetails.totalReceivedProposal : 0,
      icon: 'bi-hourglass-split',
      color: 'bg-warning',
      link: '/received-proposals', // Example link
    },
    {
      id: 3,
      title: 'Sent Proposals',
      value: dashboardStatDetails.totalSentProposal ? dashboardStatDetails.totalSentProposal : 0,
      icon: 'bi-paper-plane-fill',
      color: 'bg-primary',
      link: '/sent-proposals', // Example link
    },
    {
      id: 4,
      title: 'Notifications',
      value: dashboardStatDetails.totalMessages ? dashboardStatDetails.totalMessages : 0,
      icon: 'bi-bell-fill',
      color: 'bg-danger',
      link: '/notifications', // Example link
    },
  ];
     
  // Fetch all profiles for the given account ID
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const requestBody = {
          filter: "",
          skip: 0,
          take: 10,
          accountId: AccountId || 0, // Use provided accountId or default to 0
        };

        const response = await apiClient.post("/Accounts/List",requestBody);

        setProfiles(response.data);
      } catch (error) {
        console.error('Error fetching profiles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, [AccountId]);

  // Function to fetch tags based on search input
  const fetchTags = async (query) => {
    if (!query.trim()) {
        setDropdownOptions([]);
        return;
      }

      try {
        const requestBody = {
          searchText: query
        };

        const response = await apiClient.post("/Filter",requestBody);

        if (response.data && response.data.length) {
          setDropdownOptions(response.data);
        } else {
          setDropdownOptions([]);
        }
      }
      catch (error) {
        console.error("Error fetching tags:", error);
      setDropdownOptions([]);
      } finally {
        
      }
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    fetchTags(value); // Fetch dynamic options from API
  };

  // Add selected tag and fetch filtered results
  const handleAddTag = (option) => {
    if (!tags.some((tag) => tag.id === option.id)) {
      const updatedTags = [...tags, option];
      setTags(updatedTags);
      setSelectedTagIds([...selectedTagIds, option.id]);
      fetchFilteredResults([...selectedTagIds, option.id]); // Fetch list based on tag IDs
    }
    setSearchInput(""); // Clear input
    setDropdownOptions([]); // Hide dropdown
  };

  // Fetch list based on selected tags
  const fetchFilteredResults = async (tagIds) => {
    try {
      const requestBody = {
        filter: tagIds.join(","),
        skip: 0,
        take: 10,
        accountId: AccountId || 0, // Use provided accountId or default to 0
      };

      const response = await apiClient.post("/Accounts/List",requestBody);


      setProfiles(response.data);
    } catch (error) {
      console.error('Error fetching profiles:', error);
    } finally {
      setLoading(false);
    }
  };

 
  // Remove a selected tag
  const handleRemoveTag = (tag) => {
    const updatedTags = tags.filter((t) => t.id !== tag.id);
    const updatedTagIds = selectedTagIds.filter((id) => id !== tag.id);

    setTags(updatedTags);
    setSelectedTagIds(updatedTagIds);
    fetchFilteredResults(updatedTagIds); // Fetch updated list
  };
  
  if (loading) return <p>Loading...</p>;

  return (
<div className="d-flex">
      {/* Sidebar */}
      <SidebarMenu collapsed={collapsed} toggleSidebar={() => setCollapsed(!collapsed)} />
      {/* Main Content */}
      <div
        className="p-3"
        style={{
          marginLeft: collapsed ? '15px' : '200px',
          paddingLeft: collapsed ? '15px' : '30px',
          width: '100%',
          transition: 'margin-left 0.3s ease',
        }}
      >
        <div className="row mb-4">
          {dashboardStats.map((stat) => (
            <div className="col-md-3 mb-3" key={stat.id}>
              <Link to={stat.link} style={{ textDecoration: 'none' }}>
                <div className={`card shadow-sm ${stat.color}`} style={{ borderRadius: '12px', padding: '20px' }}>
                  <div className="d-flex align-items-center">
                    <i className={`bi ${stat.icon} fs-1 me-3`} style={{ color: 'white' }}></i>
                    <div>
                      <h6 className="text-white">{stat.title}</h6>
                      <p className="text-white fs-4">{stat.value}</p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

   <div className="mb-4 p-3 bg-light rounded shadow-sm" style={{ fontSize: "0.9rem" }}>
      <h5 className="mb-2">Filter</h5>

      {/* Selected Tags */}
      <div className="mb-2">
        {tags.map((tag) => (
          <span
            key={tag.id}
            className="badge bg-primary me-2"
            style={{ fontSize: "12px", padding: "5px 10px" }}
          >
            {tag.filterName}
            <button
              onClick={() => handleRemoveTag(tag)}
              type="button"
              className="btn-close btn-close-white ms-2"
              style={{ fontSize: "10px" }}
              aria-label="Close"
            ></button>
          </span>
        ))}
      </div>

   {/* Search Input */}
      <div>
        <input
          type="text"
          value={searchInput}
          onChange={handleSearchChange}
          className="form-control mb-2"
          placeholder="Type and select to apply filters ( For Example - Age / gender / height )"
        />
        {dropdownOptions.length > 0 && (
          <div className="dropdown-menu show">
            {dropdownOptions.map((option) => (
              <div
                key={option.id}
                onClick={() => handleAddTag(option)}
                className="dropdown-item"
                style={{ cursor: "pointer" }}
              >
                {option.filterName}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>

    {/* Matrimony Profiles */}
    <div className="row">
          {profiles.map((profile, index) => (
            <div className="col-md-3 mb-4" key={profile.id}>
              <div className="card shadow-sm" style={{ borderRadius: '12px' }}>
                {/* Profile Image Section */}
                <div
                  className="card-img-top"
                  style={{
                    height: '300px', // Increase the height of the image section
                    backgroundImage: `url(${profile.defaultImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    borderRadius: '12px 12px 0 0', // Rounded top corners
                  }}
                ></div>

                {/* Card Body */}
                <div className="card-body">
                  <h5 className="card-title" style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
                    {profile.fullName}
                  </h5>
                  <p className="card-text" style={{ fontSize: '0.9rem', color: '#555' }}>
                    Age: {profile.age}
                  </p>
                  <p className="card-text" style={{ fontSize: '0.9rem', color: '#555' }}>
                    Height: {profile.age}
                  </p>
                  <div className="d-flex justify-content-between">
                    <button
                      className="btn btn-info btn-sm" onClick={() => fetchUserDetails(profile.id)}
                      style={{ borderRadius: '20px', padding: '5px 10px' }}
                    >
                      View Details
                    </button>
                    <button
                      className="btn btn-success btn-sm" onClick={() => handleSendProposal(profile.id)}
                      style={{ borderRadius: '20px', padding: '5px 10px' }}
                    >
                      Send Proposal
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
    </div>
    <Popup
        message={popupMessage}
        isVisible={showPopup}
        onClose={() => setShowPopup(false)}
        type={popupType}
      />
  </div>
  {selectedUser && (
        <ProfileViewPopup isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)} userData={selectedUser} />
  )}
</div>
);

};


export default DashboardContent;
