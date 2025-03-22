import React, { useRef, useState, useEffect } from 'react';
import Popup from "../Popup"; // Assuming you have a Popup component
function ProfilePicture() {
  const [category, setCategory] = useState('');
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const AccountId = localStorage.getItem("AccountId");
  const token = localStorage.getItem("token");
  const [errors, setErrors] = useState({}); // Add errors state
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState("");
  useEffect(() => {
    fetchFiles();
  }, []);
  const handleShowPopup = (message, type) => {
    setPopupMessage(message);
    setPopupType(type);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 5000);
  };
  const fetchFiles = async () => {
    try {
      const response = await fetch(`https://localhost:7249/api/Files/ByAccount?AcccountId=${AccountId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setUploadedFiles(data);
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const validate = () => {
    const newErrors = {};
    if (!category) {
      newErrors.category = "Please select a category.";
    }
    if (!file) {
      newErrors.file = "Please select a file.";
    }
    return newErrors;
  };

  const handleUpload = async () => {
    const formErrors = validate();
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("fileType", category);
      formData.append("accountId", AccountId);

      try {
        const response = await fetch('https://localhost:7249/api/Files/', {
          method: 'POST',
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          handleShowPopup("🎉 File Uploaded. Congratulations! 10 points Added. 🎉", "info");
          setCategory('');
          setFile(null);
          fileInputRef.current.value = "";
          fetchFiles();
        } else {
          const errorData = await response.json();
          console.error("Error submitting Bio Details:", errorData.message);
          handleShowPopup("⚠️ An error occurred while uploading File.", "error");
        }
      } catch (error) {
        console.error("Error uploading file:", error);
        handleShowPopup("⚠️ An error occurred while uploading File.", "error")
      }
    }
  };

  const handleDelete = async (fileId) => {
    if (window.confirm('Are you sure you want to delete this file?')) {
      try {
        const response = await fetch(`https://localhost:7249/api/Files/${fileId}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          handleShowPopup("✔️File Deleted.", "success");
          fetchFiles();
        } else {
          const errorData = await response.json();
          console.error("Error submitting Bio Details:", errorData.message);
          handleShowPopup("⚠️ An error occurred while deleting file.", "error");
        }
      } catch (error) {
        handleShowPopup("⚠️ An error occurred while deleting file.", "error");
      }
    }
  };

  const handleSetDefault = async (fileId) => {
    try {
      const response = await fetch(`https://localhost:7249/api/Files/SetAsDefault?Id=${fileId}&accountId=${AccountId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        alert("File set as default!");
        fetchFiles();
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error setting default file:", error);
      alert("Failed to set this file as default. Please try again.");
    }
  };

  return (
    <div style={styles.formContainer}>
      <h4 className="text-center mb-4" style={styles.heading}>Upload File</h4>
      <div className="upload-container">
        <div className="row form-row">
          <div className="col-md-3">
            <div className="form-group">
              <label>File Category:</label>
              <select value={category} onChange={handleCategoryChange}>
                <option value="">Select Category</option>
                <option value="ProfilePic">Profile Picture</option>
                <option value="GovtId">Govt ID Proof</option>
              </select>
              {errors.category && <span className="error">{errors.category}</span>}
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-group">
              <label>Select File:</label>
              <input type="file" onChange={handleFileChange} ref={fileInputRef} />
              {errors.file && <span className="error">{errors.file}</span>}
            </div>
          </div>
          <div className="col-md-3">
            {file && (
              <div className="file-preview">
                <h5>File Preview:</h5>
                {file.type.startsWith("image/") ? (
                  <img src={URL.createObjectURL(file)} alt="Preview" className="image-preview" />
                ) : (
                  <p>{file.name}</p>
                )}
              </div>
            )}
          </div>
          <div className="d-flex justify-content-end" style={styles.saveButtonContainer}>
            <button type="submit" className="btn btn-success" onClick={handleUpload}>
              Upload File
            </button>
          </div>
        </div>
      </div>
      <div className="uploaded-files">
        <div className="files-table">
          {uploadedFiles.length === 0 ? (
            <p>No files uploaded yet.</p>
          ) : (
            <table>
              <thead className="background-radial-gradient" style={{ color: "white" }}>
                <tr>
                  <th>Preview</th>
                  <th>Category</th>
                  <th></th>
                  <th>Uploaded On</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {uploadedFiles.map((uploadedFile) => (
                  <tr key={uploadedFile.id}>
                    <td>
                      <img src={uploadedFile.filePath} alt="Uploaded Preview" className="image-preview-thumbnail" />
                    </td>
                    <td>{uploadedFile.fileType}</td>
                    <td>{uploadedFile.isPrimary === true && (
                      <button className="btn" style={{ backgroundColor: 'rgb(53, 180, 68)', color: 'white', marginRight: '10px' }}>
                        Default
                      </button>
                    )}</td>
                    <td>{uploadedFile.uploadedOn}</td>
                    <td>
                      {uploadedFile.fileType === "ProfilePic" && (
                        <button onClick={() => handleSetDefault(uploadedFile.id)} className="btn" style={{ backgroundColor: 'rgb(223, 236, 29)', color: 'black', marginRight: '10px' }}>
                          Set Default
                        </button>
                      )}
                      <button onClick={() => handleDelete(uploadedFile.id)} className="btn btn-danger ml-2">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
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
    paddingBottom: '10px',
  },
};

export default ProfilePicture;