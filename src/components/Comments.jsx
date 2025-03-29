  import React, { useState } from "react";
  import { useNavigate ,useLocation} from "react-router-dom"; 
  import { IoIosArrowRoundBack } from "react-icons/io";
  import hilton from "../assets/HiltonLogo.png";
  import { CgComment } from "react-icons/cg";
  import { MdPhotoCamera } from "react-icons/md";
  import { RiVideoFill } from "react-icons/ri";
  import { useTranslation } from "react-i18next";

  const Comment = () => {
    const { t, i18n } = useTranslation();
    const [activeSection, setActiveSection] = useState(null);
    const navigate = useNavigate(); 
    const location = useLocation();
    const handleSectionClick = (section) => {
      setActiveSection(section);
    };


  // Function to change language
  const changeLanguage = (event) => {
    const selectedLanguage = event.target.value;
    i18n.changeLanguage(selectedLanguage);
    localStorage.setItem("language", selectedLanguage); // Save language to local storage
  };


  // Extract experienceId from URL query params
  const searchParams = new URLSearchParams(location.search);
  const experienceId = searchParams.get("experienceId");
    const { satisfaction, ambiance } = location.state || {};
    const handleBack = () => {
    
    };

    const getSectionStyle = (section) => ({
      width: "120px",
      height: "115px",
      borderRadius: "10px",
      border: "1px solid #F3F3F3",
      backgroundColor: activeSection === section ? "#FF9100" : "#FFFFFF",
      cursor: "pointer",
      transition: "background-color 0.3s",
    });

    const getIconColor = (section) =>
      activeSection === section ? "#FFFFFF" : "#BDBDBD";


    const feedbackD={
      satisfaction, ambiance
    }
    const handleNext = () => {
      if (!activeSection) {
        alert(t("selectSectionAlert"))
        return;
      }
     
     

      switch (activeSection) {
        case "comments":
          navigate(`/comment2?experienceId=${experienceId}`,{ state: { satisfaction, ambiance } });
          break;
        case "pictures":
          navigate(`/picture?experienceId=${experienceId}`,{ state: { satisfaction, ambiance } });
          break;
         case "videos":
          navigate(`/video?experienceId=${experienceId}`,{ state: { satisfaction, ambiance } });
          break;
        default:
          break;
      }
    };

    return (
      <div className="flex flex-col w-full p-4">
        
        <button
          onClick={handleBack}
          className="absolute top-4 left-4 bg-transparent border-none text-gray-800 text-2xl"
        >
          <IoIosArrowRoundBack />
        </button>

        <div className="flex flex-col items-center mb-4">
          <div className="flex flex-col items-center flex-grow">
            <img
              src={hilton}
              alt="Hilton Logo"
              className="w-40 h-24 object-contain"
            />
            <p className="text-gray-700 font-semibold text-center text-sm">
             {t("feedback")}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 mb-5 mx-auto w-full max-w-md flex flex-col">
          
            <div className="flex flex-wrap justify-between gap-4">
              <div
                style={getSectionStyle("comments")}
                className="flex flex-col items-center justify-center p-3 my-3 w-full sm:w-32 md:w-40"
                onClick={() => handleSectionClick("comments")}
              >
                <CgComment
                  style={{
                    width: "40px",
                    height: "40px",
                    color: getIconColor("comments"),
                  }}
                />
                <p
                  style={{
                    fontSize: "1rem",
                    fontFamily: "Roboto",
                    fontWeight: 500,
                    color: getIconColor("comments"),
                    lineHeight: "16.4px",
                  }}
                  className="my-1"
                >
                  {t("comments")}
                </p>
              </div>
              <div
                style={getSectionStyle("pictures")}
                className="flex flex-col items-center justify-center p-3 my-3 w-full sm:w-32 md:w-40"
                onClick={() => handleSectionClick("pictures")}
              >
                <MdPhotoCamera
                  style={{
                    width: "40px",
                    height: "40px",
                    color: getIconColor("pictures"),
                  }}
                />
                <p
                  style={{
                    fontSize: "1rem",
                    fontFamily: "Roboto",
                    fontWeight: 500,
                    color: getIconColor("pictures"),
                    lineHeight: "16.4px",
                  }}
                  className="my-1"
                >
                  {t("pictures")} 
                </p>
              </div>
              <div
                style={getSectionStyle("videos")}
                className="flex flex-col items-center justify-center p-3 my-3 w-full sm:w-32 md:w-40"
                onClick={() => handleSectionClick("videos")}
              >
                <RiVideoFill
                  style={{
                    width: "40px",
                    height: "40px",
                    color: getIconColor("videos"),
                  }}
                />
                <p
                  style={{
                    fontSize: "1rem",
                    fontFamily: "Roboto",
                    fontWeight: 500,
                    color: getIconColor("videos"),
                    lineHeight: "16.4px",
                  }}
                  className="my-1"
                >
                  {t("videos")} 
                </p>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={handleNext}
          className="bg-orange-500 text-white rounded-full py-3 px-6 w-full max-w-md mx-auto shadow-lg font-medium mt-8"
        >
          {t("next")}
        </button>
        <div className="flex flex-col items-center justify-center my-2 p-3">
        <p className="text-lg font-semibold text-gray-700 mb-2">
   {t("selectLanguage")}
  </p>
  <div style={{width:"200px"}}>
  <select
   value={i18n.language}
   onChange={changeLanguage}
   className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none">
  <option value="en">English</option>
  <option value="fr">Français</option>
  </select>
  </div>
        </div>
      </div>
    );
  };

  export default Comment;
