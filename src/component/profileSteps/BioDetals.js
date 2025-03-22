import React, { useState, useEffect } from 'react';
import apiClient from '../../services/appClient.js'
import Popup from "../Popup"; // Assuming you have a Popup component

function BioDetails({ profile, onUpdate }) {
  const [errors, setErrors] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState("");

  useEffect(() => {
    const loadData = async () => {};
    loadData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    onUpdate({ [name]: value });
  };

  const validate = () => {
    const newErrors = {};
    if (!profile.Bio || profile.Bio.trim() === '') {
      newErrors.Bio = 'Bio is required.';
    }
    if (!profile.PartnerBio || profile.PartnerBio.trim() === '') {
      newErrors.PartnerBio = 'Partner Bio is required.';
    }
    return newErrors;
  };

  const handleShowPopup = (message, type) => {
    setPopupMessage(message);
    setPopupType(type);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validate();
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      try {
        const payload = {
          id: localStorage.getItem("AccountId") || 0,
          bio: profile.Bio,
          partnerBio: profile.PartnerBio,
          updatedOn: new Date().toISOString(),
        };

        const response = await apiClient.put("/Accounts/BioDetails",payload);

        if (response.status === 200) {
          handleShowPopup("🎉 Bio Details saved. Congratulations! 10 points Added. 🎉", "info");
          onUpdate({ ...profile }); // Update the profile in the parent
        } else {
          handleShowPopup("⚠️ Failed to save Bio Details.", "error");
        }
      } catch (error) {
        console.error("Error submitting Bio Details:", error);
        handleShowPopup("⚠️ An error occurred while saving Bio Details.", "error");
      }
    }
  };

  return (
    <div>
      <div style={styles.formContainer}>
        <h4 className="text-center mb-4" style={styles.heading}>
          Bio Details
        </h4>
        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col-md-12">
              <div className="mb-3">
                <label htmlFor="Bio" className="form-label">
                  Something about yourself
                </label>
                <textarea
                  className="form-control"
                  id="Bio"
                  name="Bio"
                  rows="5"
                  value={profile.Bio}
                  onChange={handleChange}
                />
                {errors.Bio && <span className="error">{errors.Bio}</span>}
              </div>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-12">
              <div className="mb-3">
                <label htmlFor="PartnerBio" className="form-label">
                  Something you are looking for in your partner
                </label>
                <textarea
                  className="form-control"
                  id="PartnerBio"
                  name="PartnerBio"
                  rows="5"
                  value={profile.PartnerBio}
                  onChange={handleChange}
                />
                {errors.PartnerBio && (
                  <span className="error">{errors.PartnerBio}</span>
                )}
              </div>
            </div>
          </div>

          <div
            className="d-flex justify-content-end"
            style={styles.saveButtonContainer}
          >
            <button
              type="submit"
              className="btn btn-success"
              onClick={handleSubmit}
            >
              Save Bio
            </button>
          </div>
        </form>
      </div>
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
    height: '500px',
  },
  heading: {
    fontWeight: 'bold',
    fontSize: '1.5rem',
    marginBottom: '20px',
    color: '#333',
  },
  saveButtonContainer: {
    marginTop: 'auto',
  },
};

export default BioDetails;