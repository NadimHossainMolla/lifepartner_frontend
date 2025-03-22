import React, { useState ,useEffect} from 'react';
import SidebarMenu from './SidebarMenu'; // Import SidebarMenu component
import 'bootstrap/dist/css/bootstrap.min.css';


// Simulating API fetch functions for dropdowns
const fetchGenderOptions = async () => {
    // Replace with actual API call
    return [
      { id: 1, name: 'Male' },
      { id: 2, name: 'Female' },
      { id: 3, name: 'Other' },
    ];
  };
  
  const fetchDistrictOptions = async () => {
    // Replace with actual API call
    return [
      { id: 1, name: 'District 1' },
      { id: 2, name: 'District 2' },
      { id: 3, name: 'District 3' },
    ];
  };
  
  const fetchStateOptions = async () => {
    // Replace with actual API call
    return [
      { id: 1, name: 'State 1' },
      { id: 2, name: 'State 2' },
      { id: 3, name: 'State 3' },
    ];
  };
  
  const fetchZipOptions = async () => {
    // Replace with actual API call
    return [
      { id: 1, name: 'Zip 1' },
      { id: 2, name: 'Zip 2' },
      { id: 3, name: 'Zip 3' },
    ];
  };
  
  function ProfileContent() {
    const [collapsed, setCollapsed] = useState(true);
    const [profile, setProfile] = useState({
      FirstName: '',
      MiddleName: '',
      LastName: '',
      Age: null,
      Gender: null,
      Religion: null,
      Email: '',
      MobileNo: '',
      Password: '',
      DOB: '',
      Address: '',
      City: '',
      District: null,
      State: null,
      Zip: '',
      Country: null,
    });
  
    // Dropdown options
    const [genders, setGenders] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [states, setStates] = useState([]);
    const [zips, setZips] = useState([]);
  
    // Fetch dropdown options on mount
    useEffect(() => {
      async function loadData() {
        const genderData = await fetchGenderOptions();
        const districtData = await fetchDistrictOptions();
        const stateData = await fetchStateOptions();
        const zipData = await fetchZipOptions();
  
        setGenders(genderData);
        setDistricts(districtData);
        setStates(stateData);
        setZips(zipData);
      }
  
      loadData();
    }, []);
  
    // Handle form field changes
    const handleChange = (e) => {
      const { name, value } = e.target;
      setProfile((prevProfile) => ({
        ...prevProfile,
        [name]: value,
      }));
    };
  
    // Handle form submission (Save)
    const handleSubmit = async (e) => {
      e.preventDefault();
      // Perform API call to save the profile data
      // Example: await saveProfileData(profile);
  
      console.log('Profile saved', profile);
    };
  
    return (

        <div className="d-flex">
      {/* Sidebar */}
      <SidebarMenu collapsed={collapsed} toggleSidebar={() => setCollapsed(!collapsed)} />
      {/* Main Content */}
      
      <div className="container mt-4">
        <h3>Profile Form</h3>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="FirstName" className="form-label">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="FirstName"
                  name="FirstName"
                  value={profile.FirstName}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="MiddleName" className="form-label">Middle Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="MiddleName"
                  name="MiddleName"
                  value={profile.MiddleName}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="LastName" className="form-label">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="LastName"
                  name="LastName"
                  value={profile.LastName}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="Age" className="form-label">Age</label>
                <input
                  type="number"
                  className="form-control"
                  id="Age"
                  name="Age"
                  value={profile.Age || ''}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
  
          {/* Dropdown for Gender */}
          <div className="mb-3">
            <label htmlFor="Gender" className="form-label">Gender</label>
            <select
              className="form-control"
              id="Gender"
              name="Gender"
              value={profile.Gender || ''}
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              {genders.map((gender) => (
                <option key={gender.id} value={gender.id}>
                  {gender.name}
                </option>
              ))}
            </select>
          </div>
  
          {/* Dropdown for District */}
          <div className="mb-3">
            <label htmlFor="District" className="form-label">District</label>
            <select
              className="form-control"
              id="District"
              name="District"
              value={profile.District || ''}
              onChange={handleChange}
            >
              <option value="">Select District</option>
              {districts.map((district) => (
                <option key={district.id} value={district.id}>
                  {district.name}
                </option>
              ))}
            </select>
          </div>
  
          {/* Dropdown for State */}
          <div className="mb-3">
            <label htmlFor="State" className="form-label">State</label>
            <select
              className="form-control"
              id="State"
              name="State"
              value={profile.State || ''}
              onChange={handleChange}
            >
              <option value="">Select State</option>
              {states.map((state) => (
                <option key={state.id} value={state.id}>
                  {state.name}
                </option>
              ))}
            </select>
          </div>
  
          {/* Dropdown for Zip */}
          <div className="mb-3">
            <label htmlFor="Zip" className="form-label">Zip</label>
            <select
              className="form-control"
              id="Zip"
              name="Zip"
              value={profile.Zip || ''}
              onChange={handleChange}
            >
              <option value="">Select Zip</option>
              {zips.map((zip) => (
                <option key={zip.id} value={zip.id}>
                  {zip.name}
                </option>
              ))}
            </select>
          </div>
  
          <div className="mb-3">
            <button type="submit" className="btn btn-primary">Save</button>
          </div>
        </form>
      </div>
      </div>
    );
  }
export default ProfileContent;
