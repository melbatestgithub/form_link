import React, { useEffect } from 'react';
import { IoIosArrowRoundBack } from "react-icons/io";
import hilton from '../assets/HiltonLogo.png';
import camera from "../assets/camera.png"
import { useNavigate,useLocation } from 'react-router-dom';
import { useTranslation } from "react-i18next";
const Picture = () => {
  const { t ,i18n} = useTranslation("picture");
  const navigate=useNavigate()
  const location=useLocation()
  // Extract experienceId from URL query params
  const searchParams = new URLSearchParams(location.search);
  const experienceId = searchParams.get("experienceId");
  const {satisfaction, ambiance}=location.state || {}
  const data={satisfaction, ambiance}
console.log(data)
  const handleNext=()=>{
    
    navigate(`/TakePhoto?experienceId=${experienceId}`,{ state: { satisfaction, ambiance } })
  }
  const handleBack=()=>{
  navigate("/comment")
  }
  return (
    <div className="flex flex-col w-full p-4">
      <div className="flex items-center mb-4 ">
        <button
        onClick={handleBack}
         className="mr-4">
          <IoIosArrowRoundBack className="text-2xl text-gray-800" />
        </button>
        <div className="flex flex-col items-center flex-grow">
          <img
            src={hilton}
            alt="Hilton Logo"
            className="w-40 h-24 object-contain"
          />
          <p className="text-gray-700 font-semibold text-center text-sm">
        {t("comfortPriority")}
          </p>
        </div>                                    
      </div>

      <div className="bg-white rounded-lg shadow-md p-4 mb-5 mx-auto w-full max-w-md flex flex-col items-center">
        <p className="text-gray-800 text-base font-medium mb-3">
       {t("capturePictures")}
        </p>
        <div style={{display:"flex",alignItems:"center"}}>
         <img  src={camera} style={{width:"160px",height:"160px"}}/>
        </div>
      
      </div>
      <button
      onClick={handleNext}
        className="bg-orange-500 text-white rounded-full py-3 px-6 w-full max-w-md mx-auto shadow-lg font-medium"
      >
        {t("next")}
      </button>
    </div>
  );
};

export default Picture;
