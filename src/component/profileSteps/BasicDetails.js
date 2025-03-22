import React, { useState, useEffect } from 'react';
import Popup from "../Popup";
import Select from 'react-select';
import apiClient from '../../services/appClient.js'

function BasicDetails({ profile, onUpdate }) {
  debugger;
  
  // Dropdown options
  const [genders, setGenders] = useState([]);
  const [bodytypes, setBodyTypes] = useState([]);
  const [diets, setDiet] = useState([]);
  const [complexions, setComplexion] = useState([]);
  const [religions, setReligions] = useState([]);
  const [communities, setCommunities] = useState([]);
  const [subcommunities, setSubCommunities] = useState([]);
  const [mothertongues, setMotherTongue] = useState([]);
  const [maritalstatuses, setMaritalStatus] = useState([]);
  const [livingsituations, setlivingSituations] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [states, setStates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingStates, setLoadingStates] = useState(true);
  const [formData, setFormData] = useState({
    FirstName: '',
    MiddleName: '',
    LastName: '',
    Age: '',
    Gender: '',
    Religion: '',
    Community: '',
    SubCommunity: '',
    MotherTongue: '',
    Height: '',
    BodyType: '',
    Diet: '',
    Complexion: '',
    MaritalStatus: '',
    LivingSituation: '',
    Address: '',
    State: '',
    District: '',
    Zip: ''
  });
  const [errors, setErrors] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState(""); // For dynamic styling
  
  // Fetch static dropdown options on mount
  useEffect(() => {
      const loadData = async () => {
      const genderData = await fetchGenderOptions();
      const bodytypeData = await fetchBodyTypeOptions();
      const dietData = await fetchDietOptions();
      const complexionData = await fetchComplexionOptions();
      const religionData = await fetchReligionOptions();
      const mothertongueData = await fetchMotherTongueOptions();
      const maritalstatusData = await fetchMaritalStatusOptions();
      const livingsituationData = await fetchLivingSituationOptions();
      const stateData = await fetchStateOptions();
      
  
      setGenders(genderData);
      setBodyTypes(bodytypeData);
      setDiet(dietData);
      setComplexion(complexionData);
      setReligions(religionData);
      setMotherTongue(mothertongueData);
      setMaritalStatus(maritalstatusData);
      setlivingSituations(livingsituationData);
      setStates(stateData.map(option => ({ value: option.id, label: option.name })));
      setLoadingStates(false);
    };
    loadData();
  }, []);
    
  // Use a separate useEffect for profile changes
  useEffect(() => {
    const setBasicDetailsData = () => {
      setFormData((prev) => ({ ...prev, 
        FirstName: profile.FirstName?.trim() || '',
        MiddleName: profile.MiddleName?.trim() || '',
        LastName: profile.LastName?.trim() || '',
        Age: profile.Age || '',
        Gender: profile.Gender || '',
        Religion: profile.Religion || '',
        Community: profile.Community || '',
        SubCommunity: profile.SubCommunity || '',
        MotherTongue: profile.MotherTongue || '',
        Height: profile.Height || '',
        BodyType: profile.BodyType || '',
        Diet: profile.Diet || '',
        Complexion: profile.Complexion || '',
        MaritalStatus: profile.MaritalStatus || '',
        LivingSituation: profile.LivingSituation || '',
        Address: profile.Address || '',
        State: profile.State || '',
        District: profile.District || '',
        Zip: profile.Zip || ''
      }));
    };

    setBasicDetailsData();
  }, [profile]); // Runs whenever `profile` changes

  // Fetch functions
  const fetchGenderOptions = async () => {
    try {
      const response = await apiClient.get("/LookUpDetails/ByMasterName?name=Gender");
      return response.data.map((gender) => ({
        id: gender.id,
        name: gender.displayName,
      }));
    } catch (error) {
      console.error('Error fetching gender options:', error);
      return [];
    }
  };

  const fetchBodyTypeOptions = async () => {
    try {
      const response = await apiClient.get("/LookUpDetails/ByMasterName?name=BodyType");
      return response.data.map((bodytype) => ({
        id: bodytype.id,
        name: bodytype.displayName,
      }));
    } catch (error) {
      console.error('Error fetching body type options:', error);
      return [];
    }
  };

  const fetchDietOptions = async () => {
    try {
      const response = await apiClient.get("/LookUpDetails/ByMasterName?name=Diet");
      return response.data.map((diet) => ({
        id: diet.id,
        name: diet.displayName,
      }));
    } catch (error) {
      console.error('Error fetching diet options:', error);
      return [];
    }
  };

  const fetchComplexionOptions = async () => {
    try {
      const response = await apiClient.get("/LookUpDetails/ByMasterName?name=Complexion");
      return response.data.map((complexion) => ({
        id: complexion.id,
        name: complexion.displayName,
      }));
    } catch (error) {
      console.error('Error fetching complexion options:', error);
      return [];
    }
  };

  const fetchReligionOptions = async () => {
    try {
      const response = await apiClient.get("/LookUpDetails/ByMasterName?name=Religion");
      return response.data.map((religion) => ({
        id: religion.id,
        name: religion.displayName,
      }));
    } catch (error) {
      console.error('Error fetching religion options:', error);
      return [];
    }
  };

  const fetchCommunityOptions = async (religionId) => {
    try {
      const response = await apiClient.get(`/LookUpDetails/ByParentId?ParentId=${religionId}`);
      return response.data.map((community) => ({
        id: community.id,
        name: community.displayName,
      }));
    } catch (error) {
      console.error('Error fetching community options:', error);
      return [];
    }
  };

  const fetchSubCommunityOptions = async (communityId) => {
    try {
      const response = await apiClient.get(`/LookUpDetails/ByParentId?ParentId=${communityId}`);
      return response.data.map((subcommunity) => ({
        id: subcommunity.id,
        name: subcommunity.displayName,
      }));
    } catch (error) {
      console.error('Error fetching sub community options:', error);
      return [];
    }
  };

  const fetchMotherTongueOptions = async () => {
    try {
      const response = await apiClient.get("/LookUpDetails/ByMasterName?name=MotherTongue");
      return response.data.map((mothertongue) => ({
        id: mothertongue.id,
        name: mothertongue.displayName,
      }));
    } catch (error) {
      console.error('Error fetching mother tongue options:', error);
      return [];
    }
  };

  const fetchMaritalStatusOptions = async () => {
    try {
      const response = await apiClient.get("/LookUpDetails/ByMasterName?name=MatritalStatus");
      return response.data.map((maritalstatus) => ({
        id: maritalstatus.id,
        name: maritalstatus.displayName,
      }));
    } catch (error) {
      console.error('Error fetching mother marital status options:', error);
      return [];
    }
  };

  const fetchLivingSituationOptions = async () => {
    try {
      const response = await apiClient.get("/LookUpDetails/ByMasterName?name=LivingSituation");
      return response.data.map((livingsituation) => ({
        id: livingsituation.id,
        name: livingsituation.displayName,
      }));
    } catch (error) {
      console.error('Error fetching mother living situation options:', error);
      return [];
    }
  };

  const fetchStateOptions = async () => {
    debugger;
    try {
      const response = await apiClient.get("/LookUpDetails/ByMasterName?name=State");
      return response.data.map((state) => ({
        id: state.id,
        name: state.displayName,
      }));
    } catch (error) {
      console.error('Error fetching state options:', error);
      return [];
    }
  };

  const fetchDistrictOptions = async (stateId) => {
    debugger;
    try {
      const response = await apiClient.get(`/LookUpDetails/ByParentId?ParentId=${stateId}`);
      return response.data.map((district) => ({
        id: district.id,
        name: district.displayName,
      }));
    } catch (error) {
      console.error('Error fetching district options:', error);
      return [];
    }
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (profile.State !== null && profile.State !== 0) {
      (async () => {
        const districtData = await fetchDistrictOptions(profile.State);
        setDistricts(districtData.map(option => ({ value: option.id, label: option.name })));
      })();
    } else {
      setDistricts([]); // Clear districts if state is null or 0
    }
  }, [profile.State]);

  useEffect(() => {
    if (profile.Religion !== null && profile.Religion !== 0) {
      (async () => {
        const communityData = await fetchCommunityOptions(profile.Religion);
        setCommunities(communityData); // Ensure the resolved data is stored
      })();
    }
  }, [profile.Religion]); // This effect runs when profile.Religion changes

  useEffect(() => {
    if (profile.Community !== null && profile.Community !== 0) {
      (async () => {
        const subcommunityData = await fetchSubCommunityOptions(profile.Community);
        setSubCommunities(subcommunityData); // Ensure the resolved data is stored
      })();
    }
  }, [profile.Community]); // This effect runs when profile.Community changes

  // Handle form field changes
  const handleChange = (e) => {
    debugger;
    const { name, value } = e.target;
    onUpdate({ [name]: value }); // Update only the changed field
  };

  const handleReactSelectChange = (selectedOption, actionMeta) => {
    const name = actionMeta.name; // Extract the name from actionMeta
    const value = selectedOption ? selectedOption.value : null; // Get the selected value
    
    onUpdate({ [name]: value }); // Update the state with the name and value
  };

  const handleShowPopup = (message, type) => {
    setPopupMessage(message);
    setPopupType(type);
    setShowPopup(true);

    // Automatically hide after 5 seconds
    setTimeout(() => setShowPopup(false), 5000);
  };

   // Validate form fields
   const validate = () => {
    const newErrors = {};
    debugger;
    if (formData.FirstName.trim()=="") {
      newErrors.FirstName = "First Name is required.";
    }
    // if (!formData.MiddleName.trim()) {
    //   newErrors.MiddleName = "Middle Name is required.";
    // }
    if (!formData.LastName.trim()) {
      newErrors.LastName = "Last Name is required.";
    }
    if (!formData.Age) {
      newErrors.Age = "Age is required.";
    }
    if (!formData.Gender) {
      newErrors.Gender = "Gender is required.";
    }
    // if (!formData.Religion) {
    //   newErrors.Religion = "Religion is required.";
    // }
    // if (!formData.Community) {
    //   newErrors.Community = "Community is required.";
    // }
    // if (!formData.SubCommunity) {
    //   newErrors.SubCommunity = "Sub Community is required.";
    // }
    // if (!formData.MotherTongue) {
    //   newErrors.MotherTongue = "Mother Tongue is required.";
    // }
    if (!formData.Height) {
      newErrors.Height = "Height is required.";
    }
    // if (!formData.BodyType) {
    //   newErrors.BodyType = "Body Type is required.";
    // }
    // if (!formData.Diet) {
    //   newErrors.Diet = "Diet is required.";
    // }
    // if (!formData.Complexion) {
    //   newErrors.Complexion = "Complexion is required.";
    // }
    if (!formData.MaritalStatus) {
      newErrors.MaritalStatus = "Marital Status is required.";
    }
    // if (!formData.LivingSituation) {
    //   newErrors.LivingSituation  = "Living Situation is required.";
    // }
    if (!formData.Address) {
      newErrors.Address  = "Address is required.";
    }
    if (!formData.State) {
      newErrors.State  = "State is required.";
    }
    if (!formData.District) {
      newErrors.District  = "District is required.";
    }
    if (!formData.Zip) {
      newErrors.Zip  = "Zip is required.";
    }
    // if (!formData.email.trim()) {
    //   newErrors.email = "Email is required.";
    // } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    //   newErrors.email = "Email address is invalid.";
    // }
    // if (!formData.password) {
    //   newErrors.password = "Password is required.";
    // } else if (formData.password.length < 6) {
    //   newErrors.password = "Password must be at least 6 characters.";
    // }
    return newErrors;
  };

     const handleSubmit = async (e) => {
    e.preventDefault();
    debugger;
    const formErrors = validate();
    if (Object.keys(formErrors).length === 0) {
      try {
        const payload = {
          id: localStorage.getItem("AccountId") || 0, // Assuming profile.id exists, otherwise default to 0
          firstName: formData.FirstName,
          middleName: formData.MiddleName,
          lastName: formData.LastName,
          age: parseInt(formData.Age) || 0,
          gender: parseInt(formData.Gender) || 0,
          religion: parseInt(formData.Religion) || 0,
          email: profile.Email || "string", // Use profile.Email or a default
          mobileNo: profile.MobileNo || "string", // Use profile.MobileNo or a default
          address: formData.Address,
          city: profile.City || "string", // Use profile.City or a default
          district: parseInt(formData.District) || 0,
          state: parseInt(formData.State) || 0,
          zip: formData.Zip,
          country: profile.Country || 0, // Use profile.Country or a default
          community: parseInt(formData.Community) || 0,
          subCommunity: parseInt(formData.SubCommunity) || 0,
          motherTongue: parseInt(formData.MotherTongue) || 0,
          matritalStatus: parseInt(formData.MaritalStatus) || 0,
          livingSituation: parseInt(formData.LivingSituation) || 0,
          diet: parseInt(formData.Diet) || 0,
          height: parseInt(formData.Height) || 0,
          bodyType: parseInt(formData.BodyType) || 0,
          complexion: parseInt(formData.Complexion) || 0,
          alcoholDrinker: profile.AlcoholDrinker || true, // Use profile.AlcoholDrinker or a default
          smoker: profile.Smoker || true, // Use profile.Smoker or a default
          updatedOn: new Date().toISOString()
        };

        const response = await apiClient.put("/Accounts/PersonalInfo",payload);

        if (response.status === 200) {
          handleShowPopup("🎉 Personal Details Saved.Congratulations! 20 points added. 🎉", "info");
          // Optionally, update the profile state in the parent component
          onUpdate({ ...formData, id: profile.id }); // Assuming you want to update all form fields
        } else {
          handleShowPopup("⚠️ Failed to save data.", "error");
        }
      } catch (error) {
        console.error("Error submitting form data:", error);
        handleShowPopup("⚠️ An error occurred while saving.", "error");
      }
      //handleShowPopup("✔️Data saved successfully.","success");
      
    } 
    setErrors(formErrors);
  };


  return (
    <div style={styles.formContainer}>
        <h4 className="text-center mb-4" style={styles.heading}>Personal Details</h4>
        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            {/* First Name */}
            <div className="col-md-3">
              <div className="mb-3">
                <label htmlFor="FirstName" className="form-label">First Name<span style={{ color: "red" }}>*</span></label>
                <input
                  type="text"
                  className="form-control"
                  id="FirstName"
                  name="FirstName"
                  value={profile.FirstName}
                  onChange={handleChange}
                />
                {errors.FirstName!="" && <span className="error">{errors.FirstName}</span>}
              </div>
            </div>

            {/* Middle Name */}
            <div className="col-md-3">
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
                {errors.MiddleName!="" && <span className="error">{errors.MiddleName}</span>}
              </div>
            </div>

            {/* Last Name */}
            <div className="col-md-3">
              <div className="mb-3">
                <label htmlFor="LastName" className="form-label">Last Name<span style={{ color: "red" }}>*</span></label>
                <input
                  type="text"
                  className="form-control"
                  id="LastName"
                  name="LastName"
                  value={profile.LastName}
                  onChange={handleChange}
                />
                {errors.LastName!="" && <span className="error">{errors.LastName}</span>}
              </div>
            </div>

            {/* Age */}
            <div className="col-md-3">
              <div className="mb-3">
                <label htmlFor="Age" className="form-label">Age<span style={{ color: "red" }}>*</span></label>
                <input
                  type="number"
                  className="form-control"
                  id="Age"
                  name="Age"
                  value={profile.Age || ''}
                  onChange={handleChange}
                />
                {errors.Age!="" && <span className="error">{errors.Age}</span>}
              </div>
            </div>
          </div>

          <div className="row mb-3">
            {/* Gender Dropdown */}
            <div className="col-md-3">
              <div className="mb-3">
                <label htmlFor="Gender" className="form-label">Gender<span style={{ color: "red" }}>*</span></label>
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
                {errors.Gender!="" && <span className="error">{errors.Gender}</span>}
              </div>
            </div>


              {/* Religion Dropdown */}
              <div className="col-md-3">
              <div className="mb-3">
                <label htmlFor="Religion" className="form-label">Religion</label>
                <select
                  className="form-control"
                  id="Religion"
                  name="Religion"
                  value={profile.Religion || ''}
                  onChange={handleChange}
                >
                  <option value="">Select Religion</option>
                  {religions.map((Religion) => (
                    <option key={Religion.id} value={Religion.id}>
                      {Religion.name}
                    </option>
                  ))}
                </select>
                {errors.Religion!="" && <span className="error">{errors.Religion}</span>}
              </div>
            </div>

              {/* Community Dropdown */}
              <div className="col-md-3">
              <div className="mb-3">
                <label htmlFor="Community" className="form-label">Community</label>
                <select
                  className="form-control"
                  id="Community"
                  name="Community"
                  value={profile.Community || ''}
                  onChange={handleChange}
                >
                  <option value="">Select Community</option>
                  {communities.map((community) => (
                    <option key={community.id} value={community.id}>
                      {community.name}
                    </option>
                  ))}
                </select>
                {errors.Community!="" && <span className="error">{errors.Community}</span>}
              </div>
            </div>

             

            {/* Sub Community Dropdown */}
            <div className="col-md-3">
              <div className="mb-3">
                <label htmlFor="SubCommunity" className="form-label">Sub Community</label>
                <select
                  className="form-control"
                  id="SubCommunity"
                  name="SubCommunity"
                  value={profile.SubCommunity || ''}
                  onChange={handleChange}
                >
                  <option value="">Select Sub Community</option>
                  {subcommunities.map((SubCommunity) => (
                    <option key={SubCommunity.id} value={SubCommunity.id}>
                      {SubCommunity.name}
                    </option>
                  ))}
                </select>
                {errors.SubCommunity!="" && <span className="error">{errors.SubCommunity}</span>}
              </div>
            </div>

              
          </div>
          <div className="row mb-3">

            {/* Mother Tongue Dropdown */}
            <div className="col-md-3">
              <div className="mb-3">
                <label htmlFor="MotherTongue" className="form-label">Mother Tongue</label>
                <select
                  className="form-control"
                  id="MotherTongue"
                  name="MotherTongue"
                  value={profile.MotherTongue || ''}
                  onChange={handleChange}
                >
                  <option value="">Select Mother Tongue</option>
                  {mothertongues.map((mothertongue) => (
                    <option key={mothertongue.id} value={mothertongue.id}>
                      {mothertongue.name}
                    </option>
                  ))}
                </select>
                {errors.MotherTongue!="" && <span className="error">{errors.MotherTongue}</span>}
              </div>
            </div>

              {/* Height */}
              <div className="col-md-3">
              <div className="mb-3">
                <label htmlFor="Height" className="form-label">Height(cm)<span style={{ color: "red" }}>*</span></label>
                <input
                  type="text"
                  className="form-control"
                  id="Height"
                  name="Height"
                  value={profile.Height}
                  onChange={handleChange}
                />
                {errors.Height!="" && <span className="error">{errors.Height}</span>}
              </div>
              </div>

              {/* Body Type Dropdown */}
              <div className="col-md-3">
              <div className="mb-3">
                <label htmlFor="BodyType" className="form-label">Body Type</label>
                <select
                  className="form-control"
                  id="BodyType"
                  name="BodyType"
                  value={profile.BodyType || ''}
                  onChange={handleChange}
                >
                  <option value="">Select Body Type</option>
                  {bodytypes.map((bodytype) => (
                    <option key={bodytype.id} value={bodytype.id}>
                      {bodytype.name}
                    </option>
                  ))}
                </select>
                {errors.BodyType!="" && <span className="error">{errors.BodyType}</span>}
              </div>
            </div>

            {/* Diet Dropdown */}
            <div className="col-md-3">
              <div className="mb-3">
                <label htmlFor="Diet" className="form-label">Diet</label>
                <select
                  className="form-control"
                  id="Diet"
                  name="Diet"
                  value={profile.Diet || ''}
                  onChange={handleChange}
                >
                  <option value="">Select Diet</option>
                  {diets.map((diet) => (
                    <option key={diet.id} value={diet.id}>
                      {diet.name}
                    </option>
                  ))}
                </select>
                {errors.Diet!="" && <span className="error">{errors.Diet}</span>}
              </div>
            </div>

          </div>

          <div className="row mb-3">

              {/* Complexion Dropdown */}
              <div className="col-md-3">
                  <div className="mb-3">
                      <label htmlFor="Complexion" className="form-label">Complexion</label>
                      <select
                        className="form-control"
                        id="Complexion"
                        name="Complexion"
                        value={profile.Complexion || ''}
                        onChange={handleChange}
                      >
                        <option value="">Select Complexion</option>
                        {complexions.map((complexion) => (
                          <option key={complexion.id} value={complexion.id}>
                            {complexion.name}
                          </option>
                        ))}
                      </select>
                      {errors.Complexion!="" && <span className="error">{errors.Complexion}</span>}
                    </div>
                  </div>
              {/* Marital Status Dropdown */}
              <div className="col-md-3">
              <div className="mb-3">
                <label htmlFor="MaritalStatus" className="form-label">Marital Status<span style={{ color: "red" }}>*</span></label>
                <select
                  className="form-control"
                  id="MaritalStatus"
                  name="MaritalStatus"
                  value={profile.MaritalStatus || ''}
                  onChange={handleChange}
                >
                  <option value="">Select Marital Status</option>
                  {maritalstatuses.map((maritalstatus) => (
                    <option key={maritalstatus.id} value={maritalstatus.id}>
                      {maritalstatus.name}
                    </option>
                  ))}
                </select>
                {errors.MaritalStatus!="" && <span className="error">{errors.MaritalStatus}</span>}
              </div>
              </div>

              {/* Marital Status Dropdown */}
              <div className="col-md-3">
              <div className="mb-3">
                <label htmlFor="LivingSituation" className="form-label">Living Situation</label>
                <select
                  className="form-control"
                  id="LivingSituation"
                  name="LivingSituation"
                  value={profile.LivingSituation || ''}
                  onChange={handleChange}
                >
                  <option value="">Select Living Situation</option>
                  {livingsituations.map((livingsituation) => (
                    <option key={livingsituation.id} value={livingsituation.id}>
                      {livingsituation.name}
                    </option>
                  ))}
                </select>
                {errors.LivingSituation!="" && <span className="error">{errors.LivingSituation}</span>}
              </div>
            </div>

            {/* Address textbox */}
          <div className="col-md-3">
                    <div className="mb-3">
                    <label htmlFor="Address" className="form-label">Address<span style={{ color: "red" }}>*</span></label>
                    <input
                        type="text"
                        className="form-control"
                        id="Address"
                        name="Address"
                        value={profile.Address}
                        onChange={handleChange}
                    />
                    {errors.Address!="" && <span className="error">{errors.Address}</span>}
                    </div>
                </div>

          </div>
          <div className="row mb-3">
            <div className="col-md-3">
              <div className="mb-3">
                <label htmlFor="State" className="form-label">State<span style={{ color: "red" }}>*</span></label>
                <Select
                  id="State"
                  name="State"
                  options={states}
                  value={profile.State ? states.find(option => option.value.toString() === profile.State.toString()) : null}
                  onChange={handleReactSelectChange}
                  isDisabled={loadingStates} // Use loadingStates here
                  placeholder={loadingStates ? 'Loading States...' : 'Select State'}
                  styles={customSelectStyles}
                />
                {errors.State!="" && <span className="error">{errors.State}</span>}
              </div>
            </div>

            {/* District Dropdown */}
            <div className="col-md-3">
              <div className="mb-3">
                <label htmlFor="District" className="form-label">District<span style={{ color: "red" }}>*</span></label>
                <Select
                  id="District"
                  name="District"
                  options={districts}
                  value={districts.find(option => option.value.toString() === profile.District?.toString())}
                  onChange={handleReactSelectChange}
                  isDisabled={loading}
                  placeholder={loading ? 'Loading Districts...' : 'Select District'}
                  styles={customSelectStyles}
                />
                {errors.District!="" && <span className="error">{errors.District}</span>}
              </div>
            </div>
          
            {/* Zip Code */}
            <div className="col-md-3">
              <div className="mb-3">
                <label htmlFor="Zip" className="form-label">Pin Code<span style={{ color: "red" }}>*</span></label>
                <input
                  type="text"
                  className="form-control"
                  id="Zip"
                  name="Zip"
                  value={profile.Zip}
                  onChange={handleChange}
                />
                {errors.Zip!="" && <span className="error">{errors.Zip}</span>}
              </div>
            </div>
          </div>
          
          <div className="d-flex justify-content-end" style={styles.saveButtonContainer}>
            <button type="submit" className="btn btn-success" onClick={handleSubmit}>Save Personal Details</button>
          </div>

        </form>
        <Popup
        message={popupMessage}
        isVisible={showPopup}
        onClose={() => setShowPopup(false)}
        type={popupType}
      />
    </div>
    
  );
}

const styles = {
  formContainer: {
    height: '500px'
  },
  heading: {
    fontWeight: 'bold',
    fontSize: '1.5rem',
    marginBottom: '20px',
    color: '#333',
  },
  saveButtonContainer: {
    marginTop: 'auto',
    paddingBottom: '10px', 
  }
};

export default BasicDetails;

const customSelectStyles = {
  control: (provided) => ({
    ...provided,
    width: '100%',
    height: '40px', 
    borderRadius: '4px', 
    padding: '0 10px', 
  }),
  menuList: (provided) => ({
    ...provided,
    padding: 0, 
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    padding: '0 10px', 
  }),
};