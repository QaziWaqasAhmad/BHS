import { Box } from "@mui/material";
import { useEffect } from "react";
import useStyles from "../../../../../styles";
import BasicInfo from "./BasicInfo";
import About from "./About";
import EducationBackground from "./EducationBackground";
import WorkExperience from "./WorkExperience";
import Skills from "./Skills";
import IconButton from "../../../../../components/IconButton";
import {
  getCoverLetter, getCoverLetterById, updateCoverLetter,
} from "../../../../../services/UserDashboard";
import { useLayoutEffect } from "react";
import { useContext } from "react";
import { AppContext } from "../../../../../context";
import { useState } from "react";
import Portfolio from "./Portfolio";
import { useNavigate } from "react-router-dom";
import { template1, template2, template3,cover,cover2
,cover3 } from "../../../../../constants/Images";
import { primaryColor } from "../../../../../constants/Colors";

const CoverLetterComponent = ({ setProfileScore,setSelectedPage, setCoverLetterId }) => {
  const { user, selectedTemplate, handleSelecteTemplate,handleSelectCoverLetter,selectedCoverLetter } =
    useContext(AppContext);
  const navigate = useNavigate();
  const [resume, setResume] = useState();

  useEffect(() => {
    window.scrollTo({ top: 100, behavior: "smooth" });
  }, []);

  const classes = useStyles();

  const basicInfoData = [
    {
      id: 1,
      title: "Job Description:",
      description: "Graphic Designer",
      icon: "content_paste_go",
    },
    {
      id: 2,
      title: "Email:",
      description: "digital@example.com",
      icon: "email",
    },
    {
      id: 3,
      title: "Location:",
      description: "Los Angeles Califonia PO",
      icon: "location_on",
    },
    {
      id: 4,
      title: "Phone :",
      description: "0145636941",
      icon: "phone",
    },
  ];

  const educationInfoData = [
    {
      id: 1,
      institute: "St.Thomas School",
      education: "Metric",
      icon: "school",
      startYear: "2014",
      endYear: "2016",
    },
    {
      id: 2,
      institute: "St.Thomas School",
      education: "Intermediate",
      icon: "school",
      startYear: "2016",
      endYear: "2018",
    },
    {
      id: 3,
      institute: "RK University",
      education: "Bachelor Of Arts",
      icon: "school",
      startYear: "2018",
      endYear: "Present",
    },
  ];

  const workExperienceData = [
    {
      id: 1,
      company: "Digiworld",
      designation: "Computer Operator/Programmer",
      icon: "work",
      startYear: "2016",
      endYear: "2018",
    },
    {
      id: 2,
      company: "Webstrot",
      designation: "Lead UI/UX, Web Design, Interaction Design",
      icon: "work",
      startYear: "2018",
      endYear: "Present",
    },
  ];

  const specialQualificationData = [
    {
      id: 1,
      qualification: "5 years+ experience designing and building products.",
      isQualified: true,
    },
    {
      id: 2,
      qualification: "Skilled at any Kind Design Tools.",
      isQualified: true,
    },
    {
      id: 3,
      qualification: "Passion for people-centered design, solid intuition.",
      isQualified: true,
    },
    {
      id: 4,
      qualification: "Hard Worker & Quick Lerner.",
      isQualified: true,
    },
  ];

  useLayoutEffect(() => {
    getUserCoverLetter(user._id);
  }, []);

  const getUserCoverLetter = async (userId) => {
    try {
      const response = await getCoverLetterById(userId)
      if (response.data.data?.selectedTemplate) {
        localStorage.setItem("selectedCoverLetter", JSON.stringify(response?.data?.data?.selectedTemplate));
        handleSelectCoverLetter(response?.data?.data?.selectedTemplate);
      }
          setResume(response.data.data);
      
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectResume = async(data) => {
    localStorage.setItem("selectedCoverLetter", JSON.stringify(data));
    handleSelectCoverLetter(data);
    let payload = {
      selectedTemplate:data
  }
    const response = await updateCoverLetter(resume._id, payload)
  };

  const handleNavigate=()=>{
   
    if (selectedCoverLetter !== null) {
      setSelectedPage("viewCoverLetter")
      setCoverLetterId(resume?._id)
    }else{
      alert("Please select template")
    }
  }
 

  
  return (
    <Box component="div">
      <Box
        onClick={() =>handleNavigate()}
        component="div"
        sx={{ marginTop: "20px" }}
      >
        <IconButton className={classes.heroBtn}>View Cover Letter</IconButton>
      </Box>
      
        <div style={{display:"flex",flexDirection:"row",gap:"20px"}}>
          <div style={{padding:"5px",border:selectedCoverLetter == "Template1" ? `2px solid ${primaryColor}` :  "0px solid green"}} onClick={()=>handleSelectResume("Template1")}>
          <img src={cover} style={{height:"250px",width:"200px"}}/>
          </div>
          <div  style={{padding:"5px",border:selectedCoverLetter == "Template2" ? `2px solid ${primaryColor}` :  "0px solid green"}} onClick={()=>handleSelectResume("Template2")}>
          <img src={cover2} style={{height:"250px",width:"200px"}}/>
          </div>
          <div style={{padding:"5px",border:selectedCoverLetter == "Template3" ? `2px solid ${primaryColor}` :  "0px solid green"}} onClick={()=>handleSelectResume("Template3")}>
          <img src={cover3} style={{height:"250px",width:"200px"}}/>
          </div>
         
        </div>
      
      <BasicInfo
        getUserResume={getUserCoverLetter}
        resume={resume}
        basicInfo={basicInfoData}
      />
      <About
        getUserResume={getUserCoverLetter}
        resume={resume}
        about="BHS provides a platform for both job seekers and organizations to fulfill their needs. The portal provides employment opportunities to the job seekers and reduces the effort of searching job of desired position. It facilitates the organization by filtering all the appropriate resumes according to the job description which eventually minimizes human resource work and screening process."
      />
      {/* <EducationBackground
        getUserResume={getUserResume}
        resume={resume}
        educationInfo={educationInfoData}
      /> */}
      {/* <WorkExperience
        getUserResume={getUserResume}
        resume={resume}
        workInfo={workExperienceData}
      /> */}
      {/* <Skills
        getUserResume={getUserResume}
        resume={resume}
        specialQualification={specialQualificationData}
      /> */}
      {/* <Portfolio
        getUserResume={getUserResume}
        resume={resume}
        specialQualification={specialQualificationData}
      /> */}
    </Box>
  );
};

export default CoverLetterComponent;
