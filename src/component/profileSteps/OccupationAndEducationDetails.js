import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import apiClient from '../../services/appClient.js'

const OccupationAndEducationDetails = () => {
  const token = localStorage.getItem("token");
  const [occupation, setOccupation] = useState('');
  const [annualIncome, setAnnualIncome] = useState('');
  const [highestQualification, setHighestQualification] = useState('');
  const [passingYear, setPassingYear] = useState('');
  const [professions, setProfessions] = useState([]);
  const [qualifications, setQualifications] = useState([]); 
  const [annualIncomes, setAnnualIncomes] = useState([]); 
  const [loading, setLoading] = useState(true);
  
    const fetchProfessions = async () => {
      try {
        const response = await apiClient.get("/LookUpDetails/ByMasterName?name=Profession");
        const data = await response.json();
        setProfessions(data);
      } catch (error) {
        console.error('Error fetching professions:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchQualifications = async () => {
      try {
        const response = await apiClient.get("/LookUpDetails/ByMasterName?name=HighestQualification");
        const data = await response.json();
        setQualifications(data);
      } catch (error) {
        console.error('Error fetching qualifications:', error);
      }
    };

    const fetchAnnualIncomes = async () => {
      try {
        const response = await apiClient.get("/LookUpDetails/ByMasterName?name=AnnualIncome");
        const data = await response.json();
        setAnnualIncomes(data);
      } catch (error) {
        console.error('Error fetching annual income:', error);
      }
    };


    useEffect(() => {
    fetchProfessions();
    fetchQualifications();
    fetchAnnualIncomes();
  }, []);

  


  const handleSubmit = () => {
    console.log('Occupation:', occupation);
    console.log('Annual Income:', annualIncome);
    console.log('Highest Qualification:', highestQualification);
    console.log('Passing Year:', passingYear);
    alert('Details saved successfully!');
  };

  
  const occupationOptions = professions.map((profession) => ({
    value: profession.id,
    label: profession.displayName
  }));

  const qualificationOptions = qualifications.map((qualification) => ({
    value: qualification.id,
    label: qualification.displayName
  }));

  const annualIncomeOptions = annualIncomes.map((annualIncome) => ({
    value: annualIncome.id,
    label: annualIncome.displayName
  }));

  return (
    <div style={styles.formContainer}>
      <h4 className="text-center mb-4" style={styles.heading}>Occupation Details</h4>
      <form style={{ display: 'flex', gap: '16px', marginBottom: '120px' }}>
        <div style={{ flex: 1 }}>
          <label htmlFor="occupation" style={{ display: 'block', marginBottom: '8px' }}>
            Current Profession:
          </label>
          <Select
            id="occupation"
            options={occupationOptions}
            value={occupationOptions.find(option => option.value === occupation)}
            onChange={(e) => setOccupation(e.value)}
            isDisabled={loading}
            placeholder={loading ? 'Loading professions...' : 'Select Profession'}
            styles={customSelectStyles}
          />
        </div>

        <div style={{ flex: 1 }}>
          <label htmlFor="annualIncome" style={{ display: 'block', marginBottom: '8px' }}>
            Annual Income:
          </label>
          <Select
            id="annualIncome"
            options={annualIncomeOptions}
            value={annualIncomeOptions.find(option => option.value === annualIncome)}
            onChange={(e) => setAnnualIncome(e.value)}
            sDisabled={loading}
            placeholder={loading ? 'Loading professions...' : 'Select Profession'}
            styles={customSelectStyles}
          />
        </div>
      </form>
      <h4 className="text-center mb-4" style={styles.heading}>Education Details</h4>
      <form style={{ display: 'flex', gap: '20px',marginBottom: '50px' }}>
        <div style={{ flex: 1 }}>
          <label htmlFor="highestQualification" style={{ display: 'block', marginBottom: '8px' }}>
            Highest Qualification:
          </label>
          <Select
            id="highestQualification"
            options={qualificationOptions}
            value={qualificationOptions.find(option => option.value === highestQualification)}
            onChange={(e) => setHighestQualification(e.value)}
            isDisabled={loading}
            placeholder={loading ? 'Loading qualifications...' : 'Select Qualification'}
            styles={customSelectStyles}
          />
        </div>
        <div style={{ flex: 1 }}>
          <label htmlFor="passingYear" style={{ display: 'block', marginBottom: '8px' }}>
            Passing Year:
          </label>
          <input
            type="number"
            id="passingYear"
            className="form-control"
            value={passingYear}
            onChange={(e) => setPassingYear(e.target.value)}
            placeholder="Enter Passing Year"
            style={{
              width: '100%',
              height: '40px', 
              padding: '0 10px', 
            }}
          />
        </div>
      </form>
      <div className="d-flex justify-content-end" style={styles.saveButtonContainer}>
            <button type="submit" className="btn btn-success" onClick={handleSubmit}>Save Personal Details</button>
      </div>
    </div>
  );
};

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
export default OccupationAndEducationDetails;
