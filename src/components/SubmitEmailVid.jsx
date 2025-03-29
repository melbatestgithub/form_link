import React, { useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { FaSpinner } from "react-icons/fa";
import hilton from "../assets/HiltonLogo.png";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";

const SendingEmail = () => {
  const { t ,i18n} = useTranslation("video");
  const navigate = useNavigate();
  const location = useLocation();
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [fullname,setFullname]=useState("")
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchParams = new URLSearchParams(location.search);
  const experienceId = searchParams.get("experienceId");
  const { satisfaction, ambiance, videoUrl, videoFeedback } = location.state || {};

  const handleNext = async () => {
    try {
      setLoading(true);
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
      formData.append("experienceId", experienceId);
      formData.append("fullname", fullname);

      const response = await axios.post(
        "http://localhost:5800/videoFeedback/submit-form",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      console.log("Video submitted successfully:", response.data);
      navigate(`/ThankYou?experienceId=${experienceId}`);
    } catch (error) {
      console.error("Error submitting video:", error.response?.data || error.message);
      setError(t("submissionError"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full p-4">
      <div className="flex items-center mb-4">
        <button onClick={() => navigate("/SubmitVideo")} className="mr-4">
          <IoIosArrowRoundBack className="text-2xl text-gray-800" />
        </button>
        <div className="flex flex-col items-center flex-grow">
          <img src={hilton} alt="Hilton Logo" className="w-40 h-24 object-contain" />
          <p className="text-gray-700 font-semibold text-center text-sm" style={{ fontSize: "20px", lineHeight: "23.3px", fontFamily: "Roboto" }}>
           {t("thankYou")}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4 mb-5 mx-auto w-full max-w-md">
        <p style={{ fontSize: "1rem", fontWeight: 600, lineHeight: "18.75px", fontFamily: "Roboto", color: "#333333" }}>
        {t("followUp")}
        </p>
        <div className="flex flex-col items-start p-3">
          <label className="my-2 text-sm font-semibold text-gray-700"> {t("fullName")}</label>
          <input
            className="focus:outline-none p-3 w-full h-12 bg-gray-100 rounded-lg"
            placeholder={t("enterFullName")}
            name="fullname"
            onChange={(e) => setFullname(e.target.value)}
            value={fullname}
          />
          <label className="my-2 text-sm font-semibold text-gray-700">{t("phone")}</label>
          <input
            className="focus:outline-none p-3 w-full h-12 bg-gray-100 rounded-lg"
            placeholder={t("enterPhone")}
            name="phone"
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
          />
          <label className="my-2 text-sm font-semibold text-gray-700">{t("email")}</label>
          <input
            className="focus:outline-none p-3 w-full h-12 bg-gray-100 rounded-lg"
            placeholder={t("enterEmail")}
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>

      <button
        onClick={handleNext}
        className={`flex items-center justify-center gap-2 ${
          loading ? "bg-gray-400 cursor-not-allowed" : "bg-orange-500"
        } text-white rounded-full py-3 px-6 w-full max-w-md mx-auto shadow-lg font-medium mt-20`}
        disabled={loading}
      >
        {loading ? <FaSpinner className="animate-spin" /> : `${t("submit")}`}
        {loading && `${t("submitting")}`}
      </button>
    </div>
  );
};

export default SendingEmail;
