import React, { useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import hilton from "../assets/HiltonLogo.png";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const SendingEmail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { satisfaction, ambiance, videoUrl,videoFeedback } = location.state || {};

  const handleNext = async () => {
    try {
      const file = await fetch(videoUrl) 
        .then((res) => res.blob())
        .then((blob) =>
          new File([blob], `recorded-video-${Date.now()}.mp4`, {
            type: "video/mp4", 
          })
        );
  
      const formData = new FormData();
      formData.append("satisfaction", satisfaction);
      formData.append("ambiance", ambiance);
      formData.append("videoFeedback", videoFeedback);
      formData.append("phone", phone);
      formData.append("email", email);
      formData.append("video", file); 
  
      setLoading(true);
  
     
      const response = await axios.post(
        "http://localhost:5800/videoFeedback/submit-form",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
  
      console.log("Video submitted successfully:", response.data);
      navigate("/ThankYou");
    } catch (error) {
      console.error("Error submitting video:", error.response?.data || error.message);
      setError("An error occurred while uploading. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  

  const handleBack = () => {
    navigate("/SubmitVideo");
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
          <p
            className="text-gray-700 font-semibold text-center text-sm"
            style={{
              fontSize: "20px",
              lineHeight: "23.3px",
              fontFamily: "Roboto",
            }}
          >
            Thank you for giving us the opportunity to improve our service
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4 mb-5 mx-auto w-full max-w-md ">
        <p
          style={{
            fontSize: "1rem",
            fontWeight: 600,
            lineHeight: "18.75px",
            fontFamily: "Roboto",
            color: "#333333",
          }}
        >
          We would love to follow up with you about your experience.
        </p>
        <div className="flex flex-col items-start p-3">
          <label
            style={{
              fontSize: "14px",
              fontFamily: "Roboto",
              fontWeight: 600,
              color: "#333333",
            }}
            className="my-2"
          >
            Your Phone
          </label>
          <input
            className="focus:appearance-none"
            style={{
              color: "#333333",
              textAlign: "start",
              padding: "1rem",
              width: "100%",
              height: "50px",
              background: "#F3F3F3",
              borderRadius: "10px",
            }}
            placeholder="Enter your number..."
            name="phone"
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
          />
          <label
            style={{
              fontSize: "14px",
              fontFamily: "Roboto",
              fontWeight: 600,
              color: "#333333",
            }}
            className="my-2"
          >
            Your Email
          </label>
          <input
            className="focus:appearance-none"
            style={{
              color: "#333333",
              textAlign: "start",
              padding: "1rem",
              width: "100%",
              height: "50px",
              background: "#F3F3F3",
              borderRadius: "10px",
            }}
            placeholder="Enter your Email Address..."
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>

      <button
        onClick={handleNext}
        className={`${
          loading ? "bg-gray-400 cursor-not-allowed" : "bg-orange-500"
        } text-white rounded-full py-3 px-6 w-full max-w-md mx-auto shadow-lg font-medium mt-20`}
        disabled={loading}
      >
        {loading ? "Submitting..." : "Next"}
      </button>
    </div>
  );
};

export default SendingEmail;
