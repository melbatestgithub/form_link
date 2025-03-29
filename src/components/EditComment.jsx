import React, { useState, useEffect } from 'react';
import { IoIosArrowRoundBack } from "react-icons/io";
import hilton from '../assets/HiltonLogo.png';
import { MdModeEdit } from "react-icons/md";
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from "react-i18next";

const EditComment = () => {
    const { t ,i18n} = useTranslation("comment");
  const location = useLocation();
  const { satisfaction, ambiance,comment } = location.state|| {}; 
  const [ncomment, setComment] = useState(location.state?.comment || ""); 

   // Extract experienceId from URL query params
   const searchParams = new URLSearchParams(location.search);
   const experienceId = searchParams.get("experienceId");
  const navigate=useNavigate()
  const handleNext = () => {
    if (!experienceId) {
      console.error("experienceId is missing");
      return;
    }
    navigate(`/sendingEmail?experienceId=${experienceId}`, { state: { satisfaction, ambiance, comment } });
  };

  const handleBack = () => {
    navigate("/comment2");
  };

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
        <div className="bg-white rounded-lg shadow-md p-4 mb-9 mx-auto w-full max-w-md flex flex-col">
          <div className="relative">
            <textarea
              style={{
                width: "100%",
                height: "150px",
                background: "#F3F3F3",
                padding: "1rem",
                borderRadius: "10px",
                paddingRight: "40px" 
              }}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="focus:appearance-none"
              placeholder="Enter your comment here..."
            />
            {/* Edit Icon */}
            <MdModeEdit
              size={26}
              style={{
                position: "absolute",
                right: "10px", 
                bottom: "10px",
                color: "#00AD34",
                cursor: "pointer",
                border: "2px solid #00AD34",
                borderRadius: "50%", 
                padding:".2rem"
              }}
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

export default EditComment;
