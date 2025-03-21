import React, { useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import hilton from "../assets/HiltonLogo.png";
import { useNavigate, useLocation } from "react-router-dom";

const MultiSelectPhoto = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // Extract experienceId from URL query params
 const searchParams = new URLSearchParams(location.search);
 const experienceId = searchParams.get("experienceId");
  const allPhotos = location.state?.photos || []; // Default to an empty array if photos are not provided
  const [commentTwo,setCommentTwo]=useState('')
  const {satisfaction, ambiance,commentOne}=location.state || {}

  const handleNext = () => {
    navigate(`/SubmitEmailPic?experienceId=${experienceId}`,{state:{allPhotos, satisfaction, ambiance,commentOne,commentTwo }});
  };

  const handleBack = () => {
    navigate("/selectedphoto");
  };

  const handleTakePhoto = () => {
    navigate("/TakePhoto");
  };

  return (
    <div className="flex flex-col w-full p-2">
      <div className="flex items-center mb-4 flex-col">
        <button onClick={handleBack} className="mr-4">
          <IoIosArrowRoundBack className="text-2xl text-gray-800" />
        </button>
        <div className="flex flex-col items-center flex-grow">
          <img
            src={hilton}
            alt="Hilton Logo"
            className="w-40 h-24 object-contain"
          />
        </div>
        <p style={{ fontWeight: 700, fontSize: "20px", fontFamily: "Roboto" }}>
          Thanks for Reviewing it.
        </p>
        <div className="bg-white rounded-lg shadow-md p-4 mb-5 mx-auto w-full max-w-md flex flex-col mt-2">
          <div className="flex flex-wrap gap-2">
            {allPhotos.map((photo, index) => (
              <div
                key={index}
                  style={{
                  width: "180px",
                  height: "227px",
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
                  }}
                >
                  <span className="mb-3">x</span>
                </p>
                <img
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "10px",
                  }}
                  src={photo}
                  alt={`Photo ${index + 1}`}
                />
              </div>
            ))}
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
            Please select the type of feedback you would like to share.
          </p>
          <div style={{ borderRadius: "10px", marginTop: "1rem" }}>
            <textarea
              style={{
                width: "100%",
                height: "100%",
                background: "#F3F3F3",
                padding: "1rem",
                borderRadius: "10px",
              }}
              placeholder="Enter your comment here..."
              className="focus:appearance-none"
              name="commentTwo"
              value={commentTwo}
              onChange={(e)=>setCommentTwo(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <button
          onClick={handleTakePhoto}
          className="text-white rounded-full py-3 px-6 w-full max-w-md mx-auto shadow-lg font-medium mt-8"
          style={{
            background: "#FFEDD6",
            color: "#FF9100",
            fontSize: "20px",
            fontWeight: 500,
          }}
        >
          Retake Picture
        </button>
        <button
          onClick={handleNext}
          className="bg-orange-500 text-white rounded-full py-3 px-6 w-full max-w-md mx-auto shadow-lg font-medium"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MultiSelectPhoto;
