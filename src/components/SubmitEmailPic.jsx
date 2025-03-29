import React, { useState } from 'react';
import { IoIosArrowRoundBack } from "react-icons/io";
import hilton from '../assets/HiltonLogo.png';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';  // Import axios
import { ClipLoader } from 'react-spinners';  // Import a spinner component
import { useTranslation } from "react-i18next";
const SendingEmail = () => {
   const { t ,i18n} = useTranslation("picture");
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [fullname,setFullname]=useState('')
  const [loading, setLoading] = useState(false);  // Add loading state
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const experienceId = searchParams.get('experienceId');
  const { allPhotos, satisfaction, ambiance, commentOne, commentTwo } = location.state || {};

  // Function to convert Base64 to File
  function base64ToFile(base64, filename) {
    const arr = base64.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }

  const handleNext = async (e) => {
    e.preventDefault();

    if (!phone || !email) {
      alert(t("fillAllFields"));
      return;
    }

    const formData = new FormData();
    formData.append("satisfaction", satisfaction);
    formData.append("ambiance", ambiance);
    formData.append("commentOne", commentOne);
    formData.append("commentTwo", commentTwo);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("experienceId", experienceId);
    formData.append("fullname",fullname)

    // Append images correctly
    if (Array.isArray(allPhotos) && allPhotos.length > 0) {
      allPhotos.forEach((photo, index) => {
        if (typeof photo === "string" && photo.startsWith("data:image/")) {
          const file = base64ToFile(photo, `photo-${index}.png`);
          formData.append("pictures", file); // ✅ Matches multer field name
        }
      });
    }

    try {
      setLoading(true);  // Set loading state to true before the request
      const response = await axios.post(
        "http://localhost:5800/pictureFeedback/submit-comment",  // Make sure the URL matches your backend endpoint
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      console.log("Feedback submitted:", response.data);
      navigate(`/ThankYou?experienceId=${experienceId}`);
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert(t("submissionError"));
    } finally {
      setLoading(false);  // Set loading state to false once the request is finished
    }
  };

  const handleBack = () => {
    navigate("/MultiSelectPhoto");
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
        <div className='flex flex-col items-start p-3'>
          <label style={{ fontSize: "14px", fontFamily: "Roboto", fontWeight: 600, color: "#333333" }} className='my-2'> {t("fullName")}</label>
          <input
            name='fullname'
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            className='focus:appearance-none'
            style={{ color: "#000", textAlign: "start", padding: "1rem", width: "100%", height: "50px", background: "#F3F3F3", borderRadius: "10px" }}
            placeholder={t("enterFullName")}
          />
          <label style={{ fontSize: "14px", fontFamily: "Roboto", fontWeight: 600, color: "#333333" }} className='my-2'> {t("phone")}</label>
          <input
            name='phone'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className='focus:appearance-none'
            style={{ color: "#000", textAlign: "start", padding: "1rem", width: "100%", height: "50px", background: "#F3F3F3", borderRadius: "10px" }}
            placeholder={t("enterPhone")}
          />
          <label style={{ fontSize: "14px", fontFamily: "Roboto", fontWeight: 600, color: "#333333" }} className='my-2'>  {t("email")}</label>
          <input
            className='focus:appearance-none'
            style={{ color: "#000", textAlign: "start", padding: "1rem", width: "100%", height: "50px", background: "#F3F3F3", borderRadius: "10px" }}
            placeholder={t("enterEmail")}
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>

      {/* Display the spinner when loading */}
      {loading ? (
        <div className="flex justify-center mt-10">
          <ClipLoader color="#FF7F50" loading={loading} size={50} />
        </div>
      ) : (
        <button
          onClick={handleNext}
          className="bg-orange-500 text-white rounded-full py-3 px-6 w-full max-w-md mx-auto shadow-lg font-medium mt-20"
        >
          {t("submit")}
        </button>
      )}
    </div>
  );
};

export default SendingEmail;
