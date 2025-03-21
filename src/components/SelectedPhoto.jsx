import React, { useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import hilton from "../assets/HiltonLogo.png";
import subtract from "../assets/Subtract.png";
import { useNavigate, useLocation, data } from "react-router-dom";

const SelectedPhoto = () => {
  const navigate = useNavigate();
  const location = useLocation();
 // const initPhoto = location.state?.photos; // Extract the initial photo from state
//  const { allPhotos = [] } = location.state || {};
//  console.log("Photos in SelectedPhoto:", allPhotos);
//   const { satisfaction, ambiance } = location.state || {};
//   const [photos, setPhotos] = useState(allPhotos ? [allPhotos] : []); // Manage multiple photos
 // Extract experienceId from URL query params
 const searchParams = new URLSearchParams(location.search);
 const experienceId = searchParams.get("experienceId");
const { allPhotos = [], satisfaction, ambiance } = location.state || {};
const [photos, setPhotos] = useState(Array.isArray(allPhotos) ? allPhotos : []);

  const [commentOne, setCommentOne] = useState("");

  const handleNext = () => {
    navigate(`/MultiSelectPhoto?experienceId=${experienceId}`, {
      state: { photos, satisfaction, ambiance, commentOne },
    });
    const data={
      photos, satisfaction, ambiance, commentOne
    }
    console.log(data)
  };

  const handleBack = () => {
    navigate(`/TakePhoto/experienceId=${experienceId}`);
  };

  const handleRemovePhoto = (index) => {
    setPhotos((prevPhotos) => prevPhotos.filter((_, i) => i !== index));
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
          Thanks for Reviewing it.
        </p>
        <div className="bg-white rounded-lg shadow-md p-4 mb-5 mx-auto w-full max-w-md flex flex-col mt-2">
          <div className="flex flex-wrap gap-2">
            {photos.map((photo, index) => (
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
                  onClick={() => handleRemovePhoto(index)}
                >
                  <span className="mb-3">x</span>
                </p>
                <img
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "10px",
                  }}
                  src={photo} // The `photo` here is the object URL
                  alt={`Captured ${index}`}
                />
              </div>
            ))}
            <div
              style={{
                width: "176px",
                height: "227px",
                border: "1px dashed #FF9100",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                cursor: "pointer",
              }}
              onClick={() =>
                navigate(`/TakePhoto/experienceId=${experienceId}`, { state: { photos, satisfaction, ambiance } })
              }
            >
              <img src={subtract} alt="Add Icon" />
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
                border: "1px solid #ccc", // Adds clarity
                zIndex: 1, // Ensures it is above overlapping elements
              }}
              placeholder="Enter your comment here..."
              type="text"
              value={commentOne}
              onChange={(e) => setCommentOne(e.target.value)}
              name="commentOne"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <button
          onClick={handleBack}
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

export default SelectedPhoto;
