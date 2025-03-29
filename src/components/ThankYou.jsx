import React from 'react'
import Hand from "../assets/handshake.png"
import { useNavigate,useLocation } from 'react-router-dom'
import { useTranslation } from "react-i18next";

const ThankYou = () => {
  const { t ,i18n} = useTranslation("comment");
  const navigate = useNavigate()
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const experienceId = searchParams.get('experienceId');
  const handleBack = () => {
    navigate(`/feedback?experienceId=${experienceId}`)
  }

  return (
    <div className="flex flex-col items-center p-4 sm:p-6 md:p-8">
      <p className="text-2xl sm:text-3xl lg:text-4xl text-orange-500 font-semibold font-roboto text-center mt-16 sm:mt-20 lg:mt-24">
       {t("thankY")}
      </p>
      
      <div className="w-64 h-56 sm:w-80 sm:h-64 md:w-96 md:h-72 lg:w-112 lg:h-96 mt-8">
        <img src={Hand} alt="Thank You" className="w-full h-full object-contain" />
      </div>

      <div className="flex flex-col items-center mt-8 sm:mt-10 md:mt-12">
        <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 mb-4">
        {t("dearClient")},
        </p>

        <p className="text-base sm:text-lg lg:text-xl text-gray-500 leading-6 text-center mb-6">
        {t("appreciationMessage")}
        </p>

        <p className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800 text-center my-4">
        {t("teamSignature")}
        </p>
      </div>

      <button
        onClick={handleBack}
        className="bg-orange-500 text-white rounded-full py-3 px-6 w-full sm:w-72 md:w-80 lg:w-96 mx-auto shadow-lg font-medium mt-6 sm:mt-8 md:mt-10"
      >
        {t("backToHome")}
      </button>
    </div>
  )
}

export default ThankYou
