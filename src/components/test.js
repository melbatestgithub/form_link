import React, { useState, useEffect } from 'react';
import { IoIosArrowRoundBack } from "react-icons/io";
import hilton from '../assets/HiltonLogo.png';
import pizza from "../assets/pizza.jpg";
import reload from '../assets/reload.png';
import light from "../assets/light.png";
import { useNavigate } from 'react-router-dom';

const RecordVideo = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState(3); 
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (count > 0) {
      const timer = setTimeout(() => setCount(count - 1), 1000); // Countdown every second
      return () => clearTimeout(timer); // Clear timeout on component unmount or count change
    } else {
      setIsReady(true); // When countdown finishes, allow recording
    }
  }, [count]);

  const handleNext = () => {
    if (isReady) {
      navigate("/StartVideo");
    }
  };

  const handleBack = () => {
    navigate("/video");
  };

  return (
    <div className="flex flex-col w-full p-4">
      <div className="flex items-center mb-4">
        <button onClick={handleBack} className="mr-4">
          <IoIosArrowRoundBack className="text-2xl text-gray-800" />
        </button>
        <div className="flex flex-col items-center flex-grow">
          <p>Timer</p>
          <button
            style={{
              width: "90px",
              height: "30px",
              borderRadius: "15px",
              background: "#FFEDD6",
              color: "#FF9100",
              fontWeight: 500,
              fontFamily: "Roboto",
            }}
          >
            15:00
          </button>
        </div>
        <button
          style={{
            width: "90px",
            height: "30px",
            borderRadius: "15px",
            background: "#FFEDD6",
            color: "#FF9100",
            fontWeight: 500,
            fontFamily: "Roboto",
          }}
        >
          i
        </button>
      </div>

      <div
        className="bg-white p-4 mb-5 mx-auto w-full max-w-md flex flex-col items-center"
        style={{
          height: "80vh",
          border: "1px solid gray",
          opacity: isReady ? 1 : 0.6, // Change opacity when ready
          transition: "opacity 0.5s",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", position: "relative" }}>
          <img src={pizza} style={{ width: "100%", height: "100%" }} />
          <span
            style={{
              position: "absolute",
              fontSize: "120px",
              fontWeight: 700,
              color: "#FFFFFF",
              left: 120,
            }}
          >
            {count > 0 ? count : ""}
          </span>
        </div>
      </div>

      <div className="w-full max-w-md mx-auto flex justify-between items-center">
        <div
          style={{
            width: "50px",
            height: "50px",
            background: "#FFEDD6",
            borderRadius: "50%",
            display: "flex",
            alignContent: "center",
            position: "relative",
          }}
        >
          <img
            src={light}
            style={{ width: "24px", height: "24px", position: "absolute", top: "10px", left: "13px" }}
          />
        </div>
        <div
          onClick={handleNext}
          style={{
            width: "100px",
            height: "100px",
            border: "10px solid #FF9100",
            borderRadius: "50%",
            cursor: isReady ? "pointer" : "not-allowed", // Disable button if not ready
          }}
        >
          <div
            style={{
              width: "70px",
              height: "70px",
              background: "#FF9100",
              borderRadius: "50%",
              margin: ".3rem",
              position: "relative",
            }}
          >
            <div
              style={{
                width: "20px",
                height: "20px",
                background: "#FFFFFF",
                borderRadius: "50%",
                position: "absolute",
                top: "22px",
                left: "24px",
              }}
            ></div>
          </div>
        </div>
        <div
          style={{
            width: "50px",
            height: "50px",
            background: "#FFEDD6",
            borderRadius: "50%",
            display: "flex",
            alignContent: "center",
            position: "relative",
          }}
        >
          <img
            src={reload}
            style={{ width: "24px", height: "24px", position: "absolute", top: "10px", left: "13px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default RecordVideo;
