import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate, useLocation } from "react-router-dom";
import hilton from "../assets/HiltonLogo.png";
import reload from "../assets/reload.png";
import light from "../assets/light.png";

const TakePhoto = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const experienceId = searchParams.get("experienceId");

  const { satisfaction, ambiance, photos = [] } = location.state || {};

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // 🔹 State to track whether the front or back camera is in use
  const [useFrontCamera, setUseFrontCamera] = useState(false);
  const [cameraError, setCameraError] = useState(false);

  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, [useFrontCamera]); // 🔹 Restart camera when `useFrontCamera` changes

  const startCamera = async () => {
    stopCamera(); // 🔹 Stop the previous camera before starting a new one
    try {
      const constraints = {
        video: { facingMode: useFrontCamera ? "user" : "environment",width: { ideal: 640 }, // Set width to limit full-screen effect
        height: { ideal: 480 }, },
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Error accessing the camera: ", err);
      setCameraError(true);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const video = videoRef.current;
    const context = canvas.getContext("2d");

    // Use video.clientWidth & clientHeight to match the displayed area
  const videoWidth = video.clientWidth;
  const videoHeight = video.clientHeight;


    canvas.width = videoWidth
    canvas.height = videoHeight
    context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight, 0, 0, videoWidth, videoHeight);

    const capturedImage = canvas.toDataURL("image/png");
    return capturedImage;
  };

  const handleNext = () => {
    const capturedPhoto = capturePhoto();
    if (capturedPhoto) {
      navigate(`/selectedphoto?experienceId=${experienceId}`, {
        state: {
          allPhotos: [...photos, capturedPhoto],
          satisfaction,
          ambiance,
        },
      });
    } else {
      alert("Photo capture failed. Please try again.");
    }
  };

  const handleBack = () => {
    navigate("/picture");
  };

  // 🔹 Function to toggle between front and back camera
  const toggleCamera = () => {
    setUseFrontCamera((prev) => !prev);
  };

  return (
    <div className="flex flex-col w-full p-4">
      <div className="flex items-center mb-4">
        <button onClick={handleBack} className="mr-4">
          <IoIosArrowRoundBack className="text-2xl text-gray-800" />
        </button>
        <div className="flex flex-col items-center flex-grow">
          <p>Max Pictures</p>
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
            {photos.length + 1} of 2
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
        style={{ height: "80vh", border: "1px solid gray" }}
      >
        {cameraError ? (
          <p className="text-red-500 text-center">Camera access denied. Please allow camera permissions.</p>
        ) : (
          <video ref={videoRef} autoPlay muted playsInline className="w-full h-full object-contain" />

        )}
      </div>

      <canvas ref={canvasRef} style={{ display: "none" }} />

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
            style={{
              width: "24px",
              height: "24px",
              position: "absolute",
              top: "10px",
              left: "13px",
            }}
          />
        </div>
        <div
          onClick={handleNext}
          style={{
            width: "100px",
            height: "100px",
            border: "10px solid #FF9100",
            borderRadius: "50%",
            cursor: "pointer",
          }}
        >
          <div
            style={{
              width: "70px",
              height: "70px",
              background: "#FF9100",
              borderRadius: "50%",
              margin: ".3rem",
            }}
          ></div>
        </div>
        {/* 🔹 Clicking this button will switch between front and back camera */}
        <div
          onClick={toggleCamera}
          style={{
            width: "50px",
            height: "50px",
            background: "#FFEDD6",
            borderRadius: "50%",
            display: "flex",
            alignContent: "center",
            position: "relative",
            cursor: "pointer",
          }}
        >
          <img
            src={reload}
            style={{
              width: "24px",
              height: "24px",
              position: "absolute",
              top: "10px",
              left: "13px",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default TakePhoto;
