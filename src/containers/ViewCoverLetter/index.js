import React, { useContext, useEffect, useState } from "react";
// import ResumeTwo from "../../components/ResumeTwo";
import { Box } from "@mui/material";
// import { PDFDownloadLink } from "@react-pdf/renderer";
import { useParams } from "react-router-dom";
// import Resume from "../../components/Resume";
import { getResume } from "../../services/OrginizationDashboard";
// import ResumeThree from "../../components/ResumeThree";
import { AppContext } from "../../context";
import CoverLetter from "../../components/CoverLetter";
import CoverLetterTwo from "../../components/CoverLetterTwo";
import CoverLetterThree from "../../components/CoverLetterThree";
import ResumeFour from "../../components/ResumeFour";
import IconButton from "../../components/IconButton";
import {
  getCoverLetter,
  getCoverLetterById,
} from "../../services/UserDashboard";
import useStyles from "../../styles";
const ViewCoverLetter = ({
  coverLetterId,
  setSelectedPage,
  setSearchParams,
  recentApplications,
  type
}) => {
  const params = useParams();
  const [resume, setResume] = useState();
  const { selectedCoverLetter } = useContext(AppContext);
  const classes = useStyles();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  //   const options = {
  //       orientation: 'portrait',
  //       unit: 'in',
  //       format: [16, 8]
  //   };

  useEffect(() => {
    getCoverLetter(coverLetterId)
      .then((res) => {
        setResume(res?.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(resume, "dkjkdjjdkjdjkdkdjdkjkdjdjdkjdkjdkjd");

  const handleNavigate=()=>{
    if (type && type=="Candidate") {
      setSelectedPage("coverLetter")
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
          onClick={() => handleNavigate()}
          className={classes.heroBtn}
        >
          Back
        </IconButton>
      </Box>
      {selectedCoverLetter === "Template1" && <CoverLetter resume={resume} />}
      {selectedCoverLetter === "Template2" && (
        <CoverLetterTwo resume={resume} />
      )}
      {selectedCoverLetter === "Template3" && (
        <CoverLetterThree resume={resume} />
      )}
    </>
  );
};

export default ViewCoverLetter;
