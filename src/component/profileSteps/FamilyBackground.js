import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import apiClient from '../../services/appClient.js'

function FamilyBackground() {
  const [formData, setFormData] = useState({
    fatherName: '',
    fatherStatus: '',
    fatherContact: '',
    motherName: '',
    motherStatus: '',
    motherContact: '',
    guardianName: '',
    guardianContact: '',
    numberOfBrothers: '',
    numberOfMarriedBrothers: '',
    numberOfSisters: '',
    numberOfMarriedSisters: '',
    religiousValues: '',
    familyType: ''
  });

  const [fatherStatusOptions, setFatherStatusOptions] = useState([]);
  const [motherStatusOptions, setMotherStatusOptions] = useState([]);
  const [religiousValuesOptions, setReligiousValuesOptions] = useState([]);
  const [familyTypeOptions, setFamilyTypeOptions] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchFatherStatus = async () => {
      try{
        const response = await apiClient.get("/LookUpDetails/ByMasterName?name=ParentStatus");
        const data = await response.json();
        setFatherStatusOptions(data.map(option => ({ value: option.name, label: option.displayName })));
      } catch (error) {
        console.error('Error fetching father status options:', error);
      }
    };
    const fetchMotherStatus = async () => {
      try {
        const response = await apiClient.get("/LookUpDetails/ByMasterName?name=ParentStatus");
        const data = await response.json();
        setMotherStatusOptions(data.map(option => ({ value: option.name, label: option.displayName })));
      } catch (error) {
        console.error('Error fetching mother status options:', error);
      }
    };

    const fetchReligiousValues = async () => {
      try {
        const response = await apiClient.get("/LookUpDetails/ByMasterName?name=FamilyReligiousValues");
        const data = await response.json();
        setReligiousValuesOptions(data.map(option => ({ value: option.name, label: option.displayName })));
      } catch (error) {
        console.error('Error fetching religious values options:', error);
      }
    }; 
    const fetchFamilyType = async () => {
      try {
        const response = await apiClient.get("/LookUpDetails/ByMasterName?name=FamilyType");
        const data = await response.json();
        setFamilyTypeOptions(data.map(option => ({ value: option.name, label: option.displayName })));
      } catch (error) {
        console.error('Error fetching family type options:', error);
      }
    };
    fetchFatherStatus();
    fetchMotherStatus();
    fetchReligiousValues();
    fetchFamilyType();
  }, []);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const handleSelectChange = (name) => (selectedOption) => {
    setFormData({
      ...formData,
      [name]: selectedOption ? selectedOption.value : ''
    });
  };

  const handleSubmit = () => {
    console.log('Family Background saved:', formData);
  };

  return (
    <div style={styles.formContainer}>
      <h4 className="text-center mb-4" style={styles.heading}>Family Background</h4>
      <form>
        <div className="row">
          <div className="col-md-3 form-group mb-5">
            <label>Father's Name</label>
            <input
              type="text"
              className="form-control"
              name="fatherName"
              value={formData.fatherName}
              onChange={handleInputChange}
            />
          </div>

          <div className="col-md-3 form-group mb-5">
            <label>Father's Status</label>
            <Select
              options={fatherStatusOptions}
              value={fatherStatusOptions.find(option => option.value === formData.fatherStatus)}
              onChange={handleSelectChange('fatherStatus')}
              placeholder="Select Status"
            />
          </div>

          <div className="col-md-3 form-group mb-5">
            <label>Father's Contact Number</label>
            <input
              type="text"
              className="form-control"
              name="fatherContact"
              value={formData.fatherContact}
              onChange={handleInputChange}
            />
          </div>

          <div className="col-md-3 form-group mb-5">
            <label>Mother's Name</label>
            <input
              type="text"
              className="form-control"
              name="motherName"
              value={formData.motherName}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-3 form-group mb-5">
            <label>Mother's Status</label>
            <Select
              options={motherStatusOptions}
              value={motherStatusOptions.find(option => option.value === formData.motherStatus)}
              onChange={handleSelectChange('motherStatus')}
              placeholder="Select Status"
            />
          </div>

          <div className="col-md-3 form-group mb-5">
            <label>Mother's Contact Number</label>
            <input
              type="text"
              className="form-control"
              name="motherContact"
              value={formData.motherContact}
              onChange={handleInputChange}
            />
          </div>

          <div className="col-md-3 form-group mb-5">
            <label>Guardian's Name</label>
            <input
              type="text"
              className="form-control"
              name="guardianName"
              value={formData.guardianName}
              onChange={handleInputChange}
            />
          </div>

          <div className="col-md-3 form-group mb-5">
            <label>Guardian's Contact Number</label>
            <input
              type="text"
              className="form-control"
              name="guardianContact"
              value={formData.guardianContact}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-3 form-group mb-5">
            <label>Number of Brothers</label>
            <input
              type="number"
              className="form-control"
              name="numberOfBrothers"
              value={formData.numberOfBrothers}
              onChange={handleInputChange}
            />
          </div>

          <div className="col-md-3 form-group mb-5">
            <label>Number of Married Brothers</label>
            <input
              type="number"
              className="form-control"
              name="numberOfMarriedBrothers"
              value={formData.numberOfMarriedBrothers}
              onChange={handleInputChange}
            />
          </div>

          <div className="col-md-3 form-group mb-5">
            <label>Number of Sisters</label>
            <input
              type="number"
              className="form-control"
              name="numberOfSisters"
              value={formData.numberOfSisters}
              onChange={handleInputChange}
            />
          </div>

          <div className="col-md-3 form-group mb-5">
            <label>Number of Married Sisters</label>
            <input
              type="number"
              className="form-control"
              name="numberOfMarriedSisters"
              value={formData.numberOfMarriedSisters}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-3 form-group mb-5">
            <label>Family Religious Values</label>
            <Select
              options={religiousValuesOptions}
              value={religiousValuesOptions.find(option => option.value === formData.religiousValues)}
              onChange={handleSelectChange('religiousValues')}
              placeholder="Select Religious Value"
            />
          </div>

          <div className="col-md-3 form-group mb-5">
            <label>Family Type</label>
            <Select
              options={familyTypeOptions}
              value={familyTypeOptions.find(option => option.value === formData.familyType)}
              onChange={handleSelectChange('familyType')}
              placeholder="Select Family Type"
            />
          </div>
        </div>
        <div className="d-flex justify-content-end" style={styles.saveButtonContainer}>
            <button type="submit" className="btn btn-success" onClick={handleSubmit}>Save Family Background</button>
        </div>
      </form>
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

export default FamilyBackground;
