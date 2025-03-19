import React, { useState } from 'react'; 
import { IoIosArrowRoundBack } from "react-icons/io";
import hilton from '../assets/HiltonLogo.png';
import { useNavigate, useLocation } from "react-router-dom";

const Rate = () => {
  const [satisfaction, setSatisfaction] = useState(null);
  const [ambiance, setAmbiance] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Extract experienceId from URL query params
  const searchParams = new URLSearchParams(location.search);
  const experienceId = searchParams.get("experienceId");

  const handleNext = () => {
    if (satisfaction === null || ambiance === null) {
      alert("Please select an option for both questions.");
      return;
    }

    navigate(`/comment?experienceId=${experienceId}`, { state: { satisfaction, ambiance } });
  };

  return (
    <div className="flex flex-col w-full p-4">
      <div className="flex items-center mb-4">
        <button className="mr-4">
          <IoIosArrowRoundBack className="text-2xl text-gray-800" />
        </button>
        <div className="flex flex-col items-center flex-grow">
          <img src={hilton} alt="Hilton Logo" className="w-40 h-24 object-contain" />
          <p className="text-gray-700 font-semibold text-center text-sm">
            We are eager to hear from you
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4 mb-5 mx-auto w-full max-w-md">
        <p className="text-gray-800 text-base font-medium mb-3">
          How satisfied were you with the overall dining experience?
        </p>
        <div className="flex flex-col space-y-3">
          {['Very Satisfied', 'Satisfied', 'Neutral', 'Dissatisfied', 'Very Dissatisfied'].map((label, index) => (
            <div key={index} className="flex items-center gap-4">
              <input
                type="radio"
                name="satisfaction"
                value={label}
                checked={satisfaction === label}
                onChange={() => setSatisfaction(label)}
                className="w-6 h-6 rounded-full border-2 border-gray-400 bg-white focus:ring-2 focus:ring-orange-500 appearance-none checked:bg-orange-500"
              />
              <label>{label}</label>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4 mb-5 mx-auto w-full max-w-md">
        <p className="text-gray-800 text-base font-medium mb-3">
          How would you rate the ambiance of the restaurant?
        </p>
        <div className="flex flex-col space-y-3">
          {[1, 2, 3, 4, 5].map((label) => (
            <div key={label} className="flex items-center gap-4">
              <label className="text-gray-600">{label}</label>
              <input
                type="radio"
                name="ambiance"
                value={label}
                checked={ambiance === label}
                onChange={() => setAmbiance(label)}
                className="w-6 h-6 rounded-full border-2 border-gray-400 bg-white focus:ring-2 focus:ring-orange-500 appearance-none checked:bg-orange-500"
              />
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={handleNext}
        className="bg-orange-500 text-white rounded-full py-3 px-6 w-full max-w-md mx-auto shadow-lg font-medium"
      >
        Next
      </button>
    </div>
  );
};

export default Rate;
