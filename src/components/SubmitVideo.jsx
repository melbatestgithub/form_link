import React, { useState, useRef } from 'react';
import { IoIosArrowRoundBack } from "react-icons/io";
import hilton from '../assets/HiltonLogo.png';
import pizza from "../assets/pizza.jpg"
import subtract from "../assets/Subtract.png"
import { FaPlay } from "react-icons/fa";
import { useNavigate ,useLocation} from 'react-router-dom';
import { useTranslation } from "react-i18next";

const SubmitVideo = () => {
   const { t ,i18n} = useTranslation("video");
  const navigate = useNavigate();
  const [videoFeedback,setVideoFeedback]=useState('')
  const location = useLocation();
  const { satisfaction, ambiance, videoUrl } = location.state || {};

  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

   // Extract experienceId from URL query params
   const searchParams = new URLSearchParams(location.search);
   const experienceId = searchParams.get("experienceId");
  const handleBack = () => {
    navigate(`/RecordVideo?experienceId=${experienceId}`);
  };

  const handleNext = () => {
    navigate(`/SubmitEmailVid?experienceId=${experienceId}`,{state:{satisfaction,
      ambiance,
      videoUrl,videoFeedback}})
  };

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play(); // Start the video
      setIsPlaying(true); // Set playing state to true
    }
  };

  return (
    <div className="flex flex-col w-full p-2">
      <div className="flex items-center mb-4 flex-col">
        <button
          onClick={handleBack}
          className="absolute top-4 left-4 bg-transparent border-none text-gray-800 text-2xl"
        >
          <IoIosArrowRoundBack />
        </button>
        <div className="flex flex-col items-center flex-grow">
          <img
            src={hilton}
            alt="Hilton Logo"
            className="w-40 h-24 object-contain"
          />
        </div>
        <p style={{ fontWeight: 700, fontSize: "20px", fontFamily: "Roboto" }}>
         {t("thanksForReview")}.
        </p>
        <div className="bg-white rounded-lg shadow-md p-4 mb-5 mx-auto w-full max-w-md flex flex-col mt-2">
          <div className="flex items-center gap-2">
            <div
              style={{
                width: "380px",
                height: "250px",
                position: "relative",
                borderRadius: "10px",
              }}
            >
              <p
                style={{
                  width: "22.5px",
                  background: "#33363F",
                  height: "22.5px",
                  position: "absolute",
                  color: "#FFFFFF",
                  textAlign: "center",
                  borderRadius: "50%",
                  right: 0,
                  top: "-8px",
                  cursor: "pointer",
                  zIndex: 1,
                }}
              >
                <span className="mb-3">x</span>
              </p>
              {!isPlaying && (
                <p
                  style={{
                    width: "50px",
                    background: "#FFFFFF",
                    height: "50px",
                    position: "absolute",
                    color: "#FFFFFF",
                    textAlign: "center",
                    justifyContent: "center",
                    borderRadius: "50%",
                    right: 140,
                    bottom: 110,
                    cursor: "pointer",
                    zIndex: 100,
                  }}
                  onClick={handlePlay}
                >
                  <FaPlay style={{ color: "#000" }} className="my-4 mx-5" />
                </p>
              )}
              <video
                ref={videoRef}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "10px",
                  opacity: isPlaying ? "1" : "0.6", // Remove opacity when playing
                }}
                controls={isPlaying} // Enable controls only when the video is playing
              >
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
          <p
            style={{
              fontSize: "1rem",
              fontWeight: 700,
              fontFamily: "Roboto",
              lineHeight: "18.75px",
              color: "#333333",
            }}
            className="my-3"
          >
            {t("selectFeedback")}.
          </p>
          <div style={{ borderRadius: "10px", marginTop: "1rem" }}>
            <textarea
            name='videoFeedback'
            value={videoFeedback}
            onChange={(e)=>setVideoFeedback(e.target.value)}
              style={{
                width: "100%",
                height: "100%",
                background: "#F3F3F3",
                padding: "1rem",
                borderRadius: "10px",
              }}
              placeholder={t("enter_comment")}
              className="focus:appearance-none"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <button
          onClick={handleBack}
          className="text-white rounded-full py-3 px-6 w-full max-w-md mx-auto shadow-lg font-medium mt-8"
          style={{ background: "#FFEDD6", color: "#FF9100", fontSize: "20px", fontWeight: 500 }}
        >
        {t("retake_video")}
        </button>
        <button
          onClick={handleNext}
          className="bg-orange-500 text-white rounded-full py-3 px-6 w-full max-w-md mx-auto shadow-lg font-medium "
        >
          {t("next")}
        </button>
      </div>
    </div>
  );  
};

export default SubmitVideo;
