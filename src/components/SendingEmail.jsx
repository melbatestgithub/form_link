import React, { useState } from 'react';
import { IoIosArrowRoundBack } from "react-icons/io";
import hilton from '../assets/HiltonLogo.png';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from "react-i18next";

const SendingEmail = () => {
  const { t ,i18n} = useTranslation("comment");
  const [error,setError]=useState("")
  const [submissionError,setSubmissionError]=useState("")
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const experienceId = searchParams.get('experienceId'); // Extract experienceId from URL

  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [fullname, setFullname] = useState('');
  const { satisfaction, ambiance, comment } = location.state || {};

  const handleNext = async (e) => {
    e.preventDefault();

    if (!phone || !email || !fullname) {
      setError(t("fillAllFields"));
      return;
    }

    const feedbackData = {
      satisfaction,
      ambiance,
      comment,
      phone,
      email,
      fullname,
      experienceId // Now correctly extracted from query params
    };

    try {
      const response = await axios.post('http://localhost:5800/comments/create', feedbackData);
      console.log('Feedback submitted:', response.data);

      // Navigate to the next page
      navigate(`/ThankYou?experienceId=${experienceId}`); 
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setSubmissionError(t("submissionError"));
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
          {t("thankYou")}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4 mb-5 mx-auto w-full max-w-md">
        <p style={{ fontSize: "1rem", fontWeight: 600, lineHeight: "18.75px", fontFamily: "Roboto", color: "#333333" }}>
        {t("followUp")}
        </p>
        <form className="flex flex-col items-start p-3" onSubmit={handleNext}>
          <label className="my-2" style={{ fontSize: "14px", fontFamily: "Roboto", fontWeight: 600, color: "#333333" }}>
          {t("fullName")}
          </label>
          <input
            className="focus:appearance-none"
            style={{ textAlign: "start", padding: "1rem", width: "100%", height: "50px", background: "#F3F3F3", borderRadius: "10px" }}
            placeholder={t("enterFullName")}
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            name="fullname"
          />
          <label className="my-2" style={{ fontSize: "14px", fontFamily: "Roboto", fontWeight: 600, color: "#333333" }}>
          {t("phone")}
          </label>
          <input
            className="focus:appearance-none"
            style={{ textAlign: "start", padding: "1rem", width: "100%", height: "50px", background: "#F3F3F3", borderRadius: "10px" }}
            placeholder={t("enterPhone")}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            name="phone"
          />
          <label className="my-2" style={{ fontSize: "14px", fontFamily: "Roboto", fontWeight: 600, color: "#333333" }}>
          {t("email")}
          </label>
          <input
            className="focus:appearance-none"
            style={{ textAlign: "start", padding: "1rem", width: "100%", height: "50px", background: "#F3F3F3", borderRadius: "10px" }}
            placeholder={t("enterEmail")}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
          />
           <p className="text-red-600 font-serif font-medium">{error}</p>
           <p className="text-red-600 font-serif font-medium">{submissionError}</p>
          <button
            type="submit"
            className="bg-orange-500 text-white rounded-full py-3 px-6 w-full max-w-md mx-auto shadow-lg font-medium mt-8"
          >
           {t("submit")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SendingEmail;
