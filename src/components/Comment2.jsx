import React, { useState,useEffect } from 'react';
import { IoIosArrowRoundBack } from "react-icons/io";
import hilton from '../assets/HiltonLogo.png';
import { useNavigate,useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Comment = () => {
  const { t ,i18n} = useTranslation("comment");
  const [comment, setComment] = useState(""); 
  const navigate = useNavigate();
  const location = useLocation();

   // Extract experienceId from URL query params
   const searchParams = new URLSearchParams(location.search);
   const experienceId = searchParams.get("experienceId");
  const { satisfaction, ambiance } = location.state || {};
  const handleNext = () => {
    if (comment.trim() === "") {
      alert(t("commentAlert"));
      return;
    }
    
    navigate(`/editcomment?experienceId=${experienceId}`, { state: { satisfaction, ambiance, comment } });
  };

  const handleBack=()=>{
    navigate("/comment")
  }

  useEffect(() => {
    i18n.changeLanguage(localStorage.getItem("language") || "en");
  }, [i18n.language]); // Trigger re-render on language change


  return (
    <div className="flex flex-col w-full p-4">
      <div className="flex items-center mb-4 flex-col">
         <button
                onClick={handleBack}
                className="absolute top-4 left-4 bg-transparent border-none text-gray-800 text-2xl"
              >
                <IoIosArrowRoundBack />
              </button>
        <div className="flex flex-col items-center flex-grow">
          <img src={hilton} alt="Hilton Logo" className="w-40 h-24 object-contain" />
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 mb-5 mx-auto w-full max-w-md flex flex-col">
          <p style={{ fontFamily: "Roboto", fontWeight: 500, fontSize: "1rem" }} className="my-3">
          {t("commentPrompt")} 
          </p>
          <div style={{ borderRadius: "10px" }}>
            <textarea
              style={{ width: "100%", height: "100%", background: "#F3F3F3", padding: "1rem", borderRadius: "10px" }}
              placeholder={t("enterComment")}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="focus:appearance-none"
              name="comment"
            />
          </div>
        </div>  
      </div>
      <button
        onClick={handleNext}
        className="bg-orange-500 text-white rounded-full py-3 px-6 w-full max-w-md mx-auto shadow-lg font-medium mt-8"
      >
         {t("next")}
      </button>
    </div>
  );
};

export default Comment;
