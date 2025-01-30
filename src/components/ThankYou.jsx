import React from 'react'
import Hand from "../assets/handshake.png"
import { useNavigate } from 'react-router-dom'

const ThankYou = () => {
  const navigate = useNavigate()

  const handleBack = () => {
    navigate("/feedback")
  }

  return (
    <div className="flex flex-col items-center p-4 sm:p-6 md:p-8">
      <p className="text-2xl sm:text-3xl lg:text-4xl text-orange-500 font-semibold font-roboto text-center mt-16 sm:mt-20 lg:mt-24">
        Thank You for Sharing!
      </p>
      
      <div className="w-64 h-56 sm:w-80 sm:h-64 md:w-96 md:h-72 lg:w-112 lg:h-96 mt-8">
        <img src={Hand} alt="Thank You" className="w-full h-full object-contain" />
      </div>

      <div className="flex flex-col items-center mt-8 sm:mt-10 md:mt-12">
        <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 mb-4">
          Dear Client,
        </p>

        <p className="text-base sm:text-lg lg:text-xl text-gray-500 leading-6 text-center mb-6">
          Thank you for sharing your experience with us. We really appreciate your business. 
          A member of our customer experience team will be following up with you as soon as possible.
        </p>

        <p className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800 text-center my-4">
          Thank you, <br />
          Customer Experience Team <br />
          Hilton Hotel
        </p>
      </div>

      <button
        onClick={handleBack}
        className="bg-orange-500 text-white rounded-full py-3 px-6 w-full sm:w-72 md:w-80 lg:w-96 mx-auto shadow-lg font-medium mt-6 sm:mt-8 md:mt-10"
      >
        Back To Home
      </button>
    </div>
  )
}

export default ThankYou
