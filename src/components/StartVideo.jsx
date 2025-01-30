import React from 'react';
import { IoIosArrowRoundBack } from "react-icons/io";
import hilton from '../assets/HiltonLogo.png';
import pizza from "../assets/pizza.jpg"
import reload from '../assets/reload.png'
import light from "../assets/light.png"
import { IoIosPause } from "react-icons/io";
import { IoReloadOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
const StartVideo = () => {
  const navigate=useNavigate()
  const handleNext=()=>{
    navigate("/SubmitVideo")
  }
  const handleBack=()=>{
    navigate("/RecordVideo")
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
          <p>Timer</p>
          <button  style={{width:"90px",height:"30px",borderRadius:"15px",background:"#FFEDD6",color:"#FF9100",fontWeight:500,fontFamily:"Roboto"}}>
          12:43
          </button>
        </div>
       <button style={{width:"90px",height:"30px",borderRadius:"15px",background:"#FFEDD6",color:"#FF9100",fontWeight:500,fontFamily:"Roboto"}}>i</button>
      </div>

      <div className="bg-white p-4 mb-5 mx-auto w-full max-w-md flex flex-col items-center" style={{height:"80vh",border:"1px solid gray"}}>
        <div style={{display:"flex",alignItems:"center",position:"relative"}}>
         <img  src={pizza} style={{width:"100%",height:"100%"}} />
        </div>
      </div>

      <div
        className=" w-full max-w-md mx-auto flex justify-between items-center gap-2 "
      >
        <div style={{width:"50px",height:"50px",background:"#FFEDD6",borderRadius:"50%", display:"flex",alignContent:"center",position:"relative"}}><img src={light} style={{width:"24px",height:"24px",position:"absolute",top:"10px",left:"13px"}}/></div>
        <div style={{width:"80px",height:"70px",background:"#FFEDD6",borderRadius:"50%", display:"flex",alignContent:"center",justifyContent:"center"}}><IoIosPause size={22} style={{marginTop:"1.7rem ",color:"#FF9100"}}/></div>
        <div
        onClick={handleNext}
         style={{width:"90px",height:"90px",border:"10px solid #FF9100",borderRadius:"50%"}}>
          <div style={{width:"60px",height:"60px",background:"#FF9100",borderRadius:"50%",margin:".3rem",position:"relative"}}>
            <div style={{width:"10px",height:"10px",background:"#FFFFFF",position:"absolute",top:"22px",left:"24px"}}></div>
          </div>
          
        </div>
        <div style={{width:"80px",height:"70px",background:"#FFEDD6",borderRadius:"50%", display:"flex",alignContent:"center",justifyContent:"center"}}><IoReloadOutline size={22} style={{marginTop:"1.8rem",color:"#FF9100"}}/></div>
        <div style={{width:"50px",height:"50px",background:"#FFEDD6",borderRadius:"50%", display:"flex",alignContent:"center",position:"relative"}}><img src={reload} style={{width:"24px",height:"24px",position:"absolute",top:"10px",left:"13px"}}/></div>
      </div>
    </div>
  );
};

export default StartVideo;
