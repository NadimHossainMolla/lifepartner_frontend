import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import apiClient from '../services/appClient.js'

const ProfileViewPopup = ({ isOpen, onClose, userData }) => {
  // Define state hooks at the top
  const [uploadedFiles, setUploadedFiles] = useState([]);

  useEffect(() => {
    if (!userData || !userData.id) return; // Ensure userData is available

    const fetchFiles = async () => {
      try {
        const response = await apiClient.get(`Files/ByAccount?AcccountId=${userData.id}`);
        const data = await response.data;
        setUploadedFiles(data);
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };

    fetchFiles();
  }, [userData]); // Run only when userData changes

  // Prevent rendering if modal is not open
  if (!isOpen || !userData) return null;

  return (
    <div
      className={`modal fade ${isOpen ? "show d-block" : ""}`}
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Profile View</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            {/* Tabs */}
            <ul className="nav nav-tabs">
              <li className="nav-item">
                <button className="nav-link active text-dark" data-bs-toggle="tab" data-bs-target="#personalTab">
                  Personal Details
                </button>
              </li>
              <li className="nav-item">
                <button className="nav-link text-dark" data-bs-toggle="tab" data-bs-target="#galleryTab">
                  Gallery
                </button>
              </li>
              <li className="nav-item">
                <button className="nav-link text-dark" data-bs-toggle="tab" data-bs-target="#bioTab">
                  Bio
                </button>
              </li>
              <li className="nav-item">
                <button className="nav-link text-dark" data-bs-toggle="tab" data-bs-target="#professionTab">
                  Profession & Education
                </button>
              </li>
              <li className="nav-item">
                <button className="nav-link text-dark" data-bs-toggle="tab" data-bs-target="#familyTab">
                  Family Details
                </button>
              </li>
            </ul>

            <div className="tab-content mt-3">
              {/* Personal Tab */}
              <div className="tab-pane fade show active" id="personalTab">
                <div className="row">
                  <div className="col-md-6">
                    <p><strong>Name: </strong> {userData.fullName}</p>
                    <p><strong>Contact: </strong> {userData.mobileNo}</p>
                    <p><strong>Address: </strong> {userData.address}</p>
                    <p><strong>Zip: </strong> {userData.zip}</p>
                    <p><strong>City: </strong> {userData.city}</p>
                    <p><strong>District: </strong> {userData.district}</p>
                    <p><strong>State: </strong> {userData.state}</p>
                    <p><strong>Country: </strong> {userData.country}</p>
                  </div>
                  <div className="col-md-6">
                    <p><strong>Age: </strong> {userData.age}</p>
                    <p><strong>Gender: </strong> {userData.gender}</p>
                    <p><strong>Community: </strong> {userData.community}</p>
                    <p><strong>Sub-Community :</strong> {userData.subcommunity}</p>
                    <p><strong>Mother Tongue: </strong> {userData.motherTongue}</p>
                    <p><strong>Marital Status: </strong> {userData.matritalStatus}</p>
                    <p><strong>Height: </strong> {userData.height}</p>
                    <p><strong>Body Type: </strong> {userData.bodyType}</p>
                    <p><strong>Complexion: </strong> {userData.complexion}</p>
                  </div>
                </div>
              </div>

              {/* Gallery Tab */}
              <div className="tab-pane fade" id="galleryTab">
                {uploadedFiles.length > 0 ? (
                  uploadedFiles.map((uploadedFile) => (
                    <img
                      key={uploadedFile.id}
                      src={uploadedFile.filePath}
                      alt="Uploaded Preview"
                      className="image-preview-gallery"
                    />
                  ))
                ) : (
                  <p>No images uploaded.</p>
                )}
              </div>

              {/* Bio Tab */}
              <div className="tab-pane fade" id="bioTab">
                <p><strong>About him/her: </strong> {userData.bio}</p><br/>
                <p><strong>About Partner, he/she is looking for: </strong> {userData.partnerBio}</p>
              </div>
              

              {/* Profession Tab */}
              <div className="tab-pane fade" id="professionTab">
                <div className="row">
                  <div className="col-md-6">
                    <p><strong>Occupation: </strong> {userData.profession}</p>
                    <p><strong>Annual Income: </strong> {userData.annualIncome}</p>
                  </div>
                  <div className="col-md-6">
                    <p><strong>Highest Qualification: </strong> {userData.highestQualification}</p>
                    <p><strong>PassOut Year: </strong> {userData.passOutYear}</p>
                  </div>
                </div>
              </div>

              {/* Family Tab */}
              <div className="tab-pane fade" id="familyTab">
                <div className="row">
                  <div className="col-md-6">
                    <p><strong>Father's Name: </strong> {userData.fatherName}</p>
                    <p><strong>Father's Status: </strong> {userData.fatherStatus}</p>
                    <p><strong>Father's Mobile No: </strong> {userData.fatherMobileNo}</p>
                    
                    <p><strong>Mother's Name: </strong> {userData.motherName}</p>
                    <p><strong>Mother's Status: </strong> {userData.motherStatus}</p>
                    <p><strong>Mother's Mobile No: </strong> {userData.motherMobileNo}</p>
                    
                    <p><strong>Guardian's Name: </strong> {userData.gurdianName}</p>
                    <p><strong>Guardian's Mobile No: </strong> {userData.gurdianMobileNo}</p>
                  </div>
                  <div className="col-md-6">
                    <p><strong>No. of Brothers: </strong> {userData.noOfBrothers}</p>
                    <p><strong>No. of Married Brothers: </strong> {userData.noOfMarriedBrothers}</p>

                    <p><strong>No. of Sisters: </strong> {userData.noOfSisters}</p>
                    <p><strong>No. of Married Sisters: </strong> {userData.noOfMarriedSisters}</p>

                    <p><strong>Family Type: </strong> {userData.familyType}</p>
                    <p><strong>Family Religious Values: </strong> {userData.familyReligiousValues}</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileViewPopup;
