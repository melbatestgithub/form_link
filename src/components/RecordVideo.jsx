import React, { useState, useEffect, useRef } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import hilton from "../assets/HiltonLogo.png";
import pizza from "../assets/pizza.jpg";
import reload from "../assets/reload.png";
import light from "../assets/light.png";
import { useNavigate ,useLocation} from "react-router-dom";


const RecordVideo = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState(3);
  const [isReady, setIsReady] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const recordedChunks = useRef([]);

const [recordingTime, setRecordingTime] = useState(0);
const timerRef = useRef(null);

  const location=useLocation()
  const {satisfaction,ambiance}=location.state || {}

  useEffect(() => {
    if (count > 0 && videoLoaded) {
      const timer = setTimeout(() => setCount(count - 1), 1000); // Countdown every second
      return () => clearTimeout(timer); // Clear timeout on unmount or count change
    } else if (count === 0 && videoLoaded) {
      setIsReady(true); // Allow recording only after countdown and video is ready
    }
  }, [count, videoLoaded]);

  const startVideoFeed = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      videoRef.current.srcObject = stream;
      videoRef.current.onloadedmetadata = () => {
        videoRef.current.play();
        setVideoLoaded(true); // Mark video as loaded
      };
    } catch (error) {
      console.error("Error accessing media devices.", error);
    }
  };

  const startRecording = () => {
    mediaRecorderRef.current = new MediaRecorder(videoRef.current.srcObject);

    recordedChunks.current = []; // Clear previous recordings
    setRecordingTime(0); // Reset timer
    timerRef.current = setInterval(() => {
      setRecordingTime((prev) => prev + 1);
    }, 1000); // Update time every second
    
  
    mediaRecorderRef.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        recordedChunks.current.push(event.data);
      }
    };
    mediaRecorderRef.current.start();
    setIsRecording(true);
  
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setIsRecording(false);
    clearInterval(timerRef.current); 
    // Save the recorded video
    const blob = new Blob(recordedChunks.current, { type: "video/webm" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = "recorded-video.webm";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
     setTimeout(()=>{
      handleNext()
     },2000)
  };

  const handleBack = () => {
    navigate("/video",{state:{ satisfaction,
      ambiance,}});
  };
  const handleNext = () => {
    if (recordedChunks.current.length > 0) {
      const blob = new Blob(recordedChunks.current, { type: "video/webm" });
      const videoUrl = URL.createObjectURL(blob); // Convert blob to URL
      navigate("/SubmitVideo", {
        state: {
          satisfaction,
          ambiance,
          videoUrl, // Pass the video URL
        },
      });
      
    } else {
      alert("Please record a video before proceeding.");
    }
  };
  

  useEffect(() => {
    startVideoFeed(); // Start video feed when the component mounts
  }, []);

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
  {new Date(recordingTime * 1000).toISOString().substr(14, 5)}
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
        <video ref={videoRef} style={{ width: "100%", height: "100%" }} muted />
        {!isReady && (
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
        )}
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
          onClick={isRecording ? stopRecording : startRecording}
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
              background: isRecording ? "red" : "#FF9100",
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
