import React, { useState,useEffect } from 'react';
import BasicDetails from './BasicDetails';
import OccupationAndEducationDetails from './OccupationAndEducationDetails';
import FamilyBackground from './FamilyBackground';
import AddressDetails from './BioDetals';
import ProfilePicture from './ProfilePicture';
import apiClient from '../../services/appClient.js'

function ProfileSteps() {
  const token = localStorage.getItem("token");
  const AccountId = localStorage.getItem("AccountId");
  const [currentStep, setCurrentStep] = useState(1);

  // Shared state for the profile
  const [profile, setProfile] = useState({
    FirstName: '',
    MiddleName: '',
    LastName: '',
    Age: null,
    Gender: null,
    Religion: null,
    Email: '',
    MobileNo: '',
    Address: '',
    City: '',
    District: null,
    State: null,
    Zip: '',
    Country: null,
    Community: null,
    SubCommunity: null,
    MotherTongue: null,
    MatritalStatus: null,
    LivingSituation: null,
    Diet: null,
    Height: '',
    BodyType: null,
    Complexion: null,
    AlcoholDrinker: false,
    Smoker: false,
    Bio:null,
    PartnerBio:null,
    HighestQualification: null,
    Profession: null,
    AnnualIncome: null,
    FatherName: '',
    FatherStatus: null,
    FatherMobileNo: '',
    MotherName: '',
    MotherStatus: null,
    MotherMobileNo: '',
    GurdianName: '',
    GurdianMobileNo: '',
    NoOfBrothers: null,
    NoOfMarriedBrothers: null,
    NoOfSisters: null,
    NoOfMarriedSisters: null,
    FamilyType: null,
    FamilyReligiousValues: null,
  });

  const fetchProfileData = async () => {
    try {
      const response = await apiClient.get("/Accounts/"+AccountId);
      const data = response.data;

      // Set each state field one by one
      if (data.firstName) setProfile((prev) => ({ ...prev, FirstName: data.firstName }));
      if (data.middleName) setProfile((prev) => ({ ...prev, MiddleName: data.middleName }));
      if (data.lastName) setProfile((prev) => ({ ...prev, LastName: data.lastName }));
      if (data.age) setProfile((prev) => ({ ...prev, Age: data.age }));
      if (data.gender) setProfile((prev) => ({ ...prev, Gender: data.gender }));
      if (data.email) setProfile((prev) => ({ ...prev, Email: data.email }));
      if (data.mobileNo) setProfile((prev) => ({ ...prev, MobileNo: data.mobileNo }));
      if (data.address) setProfile((prev) => ({ ...prev, Address: data.address }));
      if (data.city) setProfile((prev) => ({ ...prev, City: data.city }));
      if (data.district) setProfile((prev) => ({ ...prev, District: data.district }));
      if (data.state) setProfile((prev) => ({ ...prev, State: data.state }));
      if (data.zip) setProfile((prev) => ({ ...prev, Zip: data.zip }));
      if (data.country) setProfile((prev) => ({ ...prev, Country: data.country }));
      if (data.religion) setProfile((prev) => ({ ...prev, Religion: data.religion }));
      if (data.community) setProfile((prev) => ({ ...prev, Community: data.community }));
      if (data.subcommunity) setProfile((prev) => ({ ...prev, SubCommunity: data.subcommunity }));
      if (data.bio) setProfile((prev) => ({ ...prev, Bio: data.bio }));
      if (data.partnerBio) setProfile((prev) => ({ ...prev, PartnerBio: data.partnerBio }));
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };

  useEffect(() => {
    debugger;
    fetchProfileData();
  }, []);

  // Handle next and back button functionality
  const handleNext = () => {
    if (currentStep < 5) setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  // Render content based on step
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <BasicDetails
            profile={profile}
            onUpdate={(updatedData) =>
              setProfile((prev) => ({ ...prev, ...updatedData }))
            }
          />
        );
        case 2:
        return (
          <AddressDetails
          profile={profile}
            onUpdate={(updatedData) =>
              setProfile((prev) => ({ ...prev, ...updatedData }))
            }
          />
        );
        case 3:
        return (
          <ProfilePicture
          profile={profile}
            onUpdate={(updatedData) =>
              setProfile((prev) => ({ ...prev, ...updatedData }))
            }
          />
        );
      case 4:
        return (
          <OccupationAndEducationDetails
          profile={profile}
            onUpdate={(updatedData) =>
              setProfile((prev) => ({ ...prev, ...updatedData }))
            }
          />
        );
      case 5:
        return (
          <FamilyBackground
          profile={profile}
            onUpdate={(updatedData) =>
              setProfile((prev) => ({ ...prev, ...updatedData }))
            }
          />
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="container mt-4 d-flex flex-column" style={{ minHeight: 'calc(100vh - 80px)' }}>
      {/* Step Progress */}
      <div className="mb-3">
        <div className="progress" style={{ height: '20px' }}>
          <div
            className="progress-bar bg-success"
            role="progressbar"
            style={{ width: `${(currentStep / 5) * 100}%` }}
            aria-valuenow={currentStep}
            aria-valuemin="1"
            aria-valuemax="5"
          >
            Step {currentStep} of 5
          </div>
        </div>
      </div>

      {/* Step content area */}
      <div className="flex-grow-1 formContainerParent">{renderStepContent()}</div>

      {/* Navigation buttons */}
      <div className="d-flex justify-content-between mt-4">
        <button
          className="btn btn-secondary"
          onClick={handleBack}
          disabled={currentStep === 1}
        >
          Back
        </button>
        <button
          className="btn btn-primary"
          onClick={handleNext}
          disabled={currentStep === 5}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default ProfileSteps;
