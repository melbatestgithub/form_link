import React, { useState } from 'react';
import { IoIosArrowRoundBack } from "react-icons/io";
import hilton from '../assets/HiltonLogo.png';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const SendingEmail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const experienceId = searchParams.get('experienceId'); // Extract experienceId from URL

  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const { satisfaction, ambiance, comment } = location.state || {};

  const handleNext = async (e) => {
    e.preventDefault();

    if (!phone || !email) {
      alert("Please fill in both fields!");
      return;
    }

    const feedbackData = {
      satisfaction,
      ambiance,
      comment,
      phone,
      email,
      experienceId // Now correctly extracted from query params
    };

    try {
      const response = await axios.post('http://localhost:5800/comments/create', feedbackData);
      console.log('Feedback submitted:', response.data);

      // Navigate to the next page
      navigate(`/ThankYou?experienceId=${experienceId}`); 
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('An error occurred while submitting your feedback. Please try again.');
    }
  };

  const handleBack = () => {
    navigate("/editcomment");
  };

  return (
    <div className="flex flex-col w-full p-4">
      <div className="flex items-center mb-4">
        <button onClick={handleBack} className="mr-4">
          <IoIosArrowRoundBack className="text-2xl text-gray-800" />
        </button>
        <div className="flex flex-col items-center flex-grow">
          <img
            src={hilton}
            alt="Hilton Logo"
            className="w-40 h-24 object-contain"
          />
          <p className="text-gray-700 font-semibold text-center text-sm" style={{ fontSize: "20px", lineHeight: "23.3px", fontFamily: "Roboto" }}>
            Thank you for giving us the opportunity to improve our service
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4 mb-5 mx-auto w-full max-w-md">
        <p style={{ fontSize: "1rem", fontWeight: 600, lineHeight: "18.75px", fontFamily: "Roboto", color: "#333333" }}>
          We would love to follow up with you about your experience.
        </p>
        <form className="flex flex-col items-start p-3" onSubmit={handleNext}>
          <label className="my-2" style={{ fontSize: "14px", fontFamily: "Roboto", fontWeight: 600, color: "#333333" }}>
            Your Phone
          </label>
          <input
            className="focus:appearance-none"
            style={{ textAlign: "start", padding: "1rem", width: "100%", height: "50px", background: "#F3F3F3", borderRadius: "10px" }}
            placeholder="Enter your number..."
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            name="phone"
          />
          <label className="my-2" style={{ fontSize: "14px", fontFamily: "Roboto", fontWeight: 600, color: "#333333" }}>
            Your Email
          </label>
          <input
            className="focus:appearance-none"
            style={{ textAlign: "start", padding: "1rem", width: "100%", height: "50px", background: "#F3F3F3", borderRadius: "10px" }}
            placeholder="Enter your Email Address..."
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
          />
          <button
            type="submit"
            className="bg-orange-500 text-white rounded-full py-3 px-6 w-full max-w-md mx-auto shadow-lg font-medium mt-8"
          >
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
};

export default SendingEmail;
