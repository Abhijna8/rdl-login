import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [step, setStep] = useState(1);
  const [visitor, setVisitor] = useState({
    fullName: "",
    companyName: "",
    phone: "",
    profilePhoto: null,
    department: "",
    purpose: "",
    hostName: "",
    duration: "",
    idType: "",
    idNumber: "",
    vehicleType: "",
    vehicleCategory: "",
    vehicleName: "",
    vehicleRegNumber: "",
  });

  const [submitted, setSubmitted] = useState(false);

  // Load visitor details from local storage on component mount
  useEffect(() => {
    const savedVisitor = localStorage.getItem("visitorData");
    if (savedVisitor) {
      setVisitor(JSON.parse(savedVisitor));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVisitor((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    setVisitor((prev) => ({ ...prev, profilePhoto: URL.createObjectURL(file) }));
  };

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simulate API request (mock API connectivity)
    try {
      const response = await fakeApiRequest(visitor);
      console.log("API Response:", response);
    } catch (error) {
      console.error("API Error:", error);
    }

    // Save visitor details to local storage
    localStorage.setItem("visitorData", JSON.stringify(visitor));
    setSubmitted(true);
    setStep(6); // Navigate to confirmation screen
  };

  // Mock API function to simulate API connectivity
  const fakeApiRequest = (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ status: "success", message: "Visitor data received", data });
      }, 1000);
    });
  };

  return (
    <div className="container">
      <h1 className="title">Visitor Management System</h1>

      {step === 1 && (
        <div className="section">
          <h2 className="section-title">Visitor Registration</h2>
          <input className="input" type="text" name="fullName" placeholder="Full Name" onChange={handleChange} required />
          <input className="input" type="text" name="companyName" placeholder="Company Name" onChange={handleChange} />
          <input className="input" type="text" name="phone" placeholder="Phone Number" onChange={handleChange} required />
          <input className="input" type="file" accept="image/*" onChange={handlePhotoUpload} />
          <button className="button" onClick={handleNext}>Next</button>
        </div>
      )}

      {step === 2 && (
        <div className="section">
          <h2 className="section-title">Visit Details</h2>
          <input className="input" type="text" name="department" placeholder="Department" onChange={handleChange} required />
          <input className="input" type="text" name="purpose" placeholder="Purpose of Visit" onChange={handleChange} required />
          <input className="input" type="text" name="hostName" placeholder="Host Name" onChange={handleChange} required />
          <input className="input" type="text" name="duration" placeholder="Expected Duration" onChange={handleChange} required />
          <button className="button" onClick={handleBack}>Back</button>
          <button className="button" onClick={handleNext}>Next</button>
        </div>
      )}

      {step === 3 && (
        <div className="section">
          <h2 className="section-title">Identity Verification</h2>
          <select className="input" name="idType" onChange={handleChange} required>
            <option value="">Select ID Type</option>
            <option value="Aadhaar">Aadhaar</option>
            <option value="Passport">Passport</option>
            <option value="Driving License">Driving License</option>
          </select>
          <input className="input" type="text" name="idNumber" placeholder="ID Number" onChange={handleChange} required />
          <button className="button" onClick={handleBack}>Back</button>
          <button className="button" onClick={handleNext}>Next</button>
        </div>
      )}

      {step === 4 && (
        <div className="section">
          <h2 className="section-title">Vehicle Information</h2>
          <select className="input" name="vehicleType" onChange={handleChange}>
            <option value="">Select Vehicle Type</option>
            <option value="Private">Private</option>
            <option value="Commercial">Commercial</option>
          </select>
          <select className="input" name="vehicleCategory" onChange={handleChange}>
            <option value="">Select Category</option>
            <option value="Two-wheeler">Two-wheeler</option>
            <option value="Four-wheeler">Four-wheeler</option>
          </select>
          <input className="input" type="text" name="vehicleName" placeholder="Vehicle Name" onChange={handleChange} />
          <input className="input" type="text" name="vehicleRegNumber" placeholder="Registration Number" onChange={handleChange} />
          <button className="button" onClick={handleBack}>Back</button>
          <button className="button" onClick={handleNext}>Next</button>
        </div>
      )}

      {step === 5 && (
        <div className="section">
          <h2 className="section-title">Check-in Confirmation</h2>
          <p>Please review your details before submitting.</p>
          <button className="button" onClick={handleBack}>Back</button>
          <button className="button" onClick={handleSubmit}>Submit</button>
        </div>
      )}

      {step === 6 && submitted && (
        <div className="section">
          <h2 className="section-title">Visitor Entry Confirmed</h2>
          {visitor.profilePhoto && <img src={visitor.profilePhoto} alt="Profile" className="profile-image" />}
          <p><strong>Name:</strong> {visitor.fullName}</p>
          <p><strong>Company:</strong> {visitor.companyName}</p>
          <p><strong>Phone:</strong> {visitor.phone}</p>
          <p><strong>Department:</strong> {visitor.department}</p>
          <p><strong>Purpose:</strong> {visitor.purpose}</p>
          <p><strong>Host:</strong> {visitor.hostName}</p>
          <p><strong>Duration:</strong> {visitor.duration}</p>
        </div>
      )}
    </div>
  );
};

export default App;
