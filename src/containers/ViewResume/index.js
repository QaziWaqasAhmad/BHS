import React,{useContext, useEffect,useState} from "react";
import ResumeTwo from "../../components/ResumeTwo";
// import { PDFDownloadLink } from "@react-pdf/renderer";
import { useParams } from "react-router-dom";
import Resume from "../../components/Resume";
import { getResume } from "../../services/OrginizationDashboard";
import ResumeThree from "../../components/ResumeThree";
import { AppContext } from "../../context";
import IconButton from "../../components/IconButton";
import { Box } from "@mui/material";
import { Link, useSearchParams } from "react-router-dom";
import useStyles from "../../styles";
import { useNavigate } from "react-router-dom";

const ViewResume = ({resumeId,setSelectedPage,setSearchParam,recentApplications,type}) => {
    const params=useParams();
    const navigation=useNavigate()
    const [searchParams, setSearchParams] = useSearchParams();
    const [resume, setResume] = useState();
    const { selectedTemplate } =useContext(AppContext);
    const classes=useStyles();
  useEffect(() => {
      window.scrollTo(0, 0);
  }, []);
//   const options = {
//       orientation: 'portrait',
//       unit: 'in',
//       format: [16, 8]
//   };

  useEffect(() => {
      getResume(resumeId).then((res) => {
          setResume(res?.data?.data);
      }).catch((err) => {
          console.log(err);
      })
  }, []);


  const handleNavigate=()=>{
    if (type && type ==="Candidate") {
      setSelectedPage("resume")
    }else{
    if (recentApplications===true) {
      setSelectedPage("recentApplications");
    setSearchParams({ page: "recentApplications" });
    }else{
      setSelectedPage("manageJobs");
    setSearchParams({ page: "applications" });
    }
  }
  }

  return (
    <>
     <Box component="div" mt="5px">
              <IconButton
                onClick={() =>handleNavigate()}
                className={classes.heroBtn}
              >
               Back
              </IconButton>
            </Box>
    {selectedTemplate === "Template1" && <ResumeThree resume={resume}/>}
    {selectedTemplate === "Template2" && <ResumeTwo resume={resume}/>}
    {selectedTemplate === "Template3" && <Resume resume={resume}/>}
 
   
    </>
  );
};

export default ViewResume;
