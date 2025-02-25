import {
  AccountBalance,
  Adb,
  CloudDownload,
  Email,
  FavoriteBorder,
  LocationOn,
  Money,
  PanoramaFishEye,
  RemoveRedEye,
  Work,
} from "@mui/icons-material";
import { Box, Button, Grid, Typography } from "@mui/material";
import { createRef, useState } from "react";
import { useContext } from "react";
import { useLayoutEffect } from "react";
import { useEffect } from "react";
import IconButton from "../../../../../components/IconButton";
import {
  headerColor,
  primaryBorderColor,
  primaryColor,
  textColor,
} from "../../../../../constants/Colors";
import { profile } from "../../../../../constants/Images";
import { AppContext } from "../../../../../context";
import { getAppliedJobsById } from "../../../../../services/Jobs";
import useStyles from "../../../../../styles";
// import ReactToPdf from "react-to-pdf"
import Resume from "../../../../../components/Resume";
import { useNavigate } from "react-router-dom";

const Applications = ({jobDetails,setResumeId,setSelectedPage,setSearchParams,setCoverLetterId,setRecentApplications}) => {
  const { user,handleSelecteTemplate,handleSelectCoverLetter,applicationData,handleResumeData } = useContext(AppContext);
  const navigate = useNavigate();
  const [appliedJobs, setAppliedJobs] = useState([]);
  useEffect(() => {
    window.scrollTo({ top: 100, behavior: "smooth" });
  }, []);

  const classes = useStyles();

  const favoriteJob = [
    {
      id: 1,
      jobTitle: "Application Developer",
      company: "Google",
      salary: "12000",
      location: "Los Angeles, Calefornia",
      jobType: "Part Time",
      isApplied: true,
      userName: "luca wallace",
    },
    {
      id: 2,
      jobTitle: "Web Developer",
      company: "Google",
      salary: "20000",
      location: "Los Angeles, Calefornia",
      jobType: "Full Time",
      isApplied: true,
      userName: "lumi simon",
    },
  ];

  useLayoutEffect(() => {
    if (applicationData) {
      setAppliedJobs(applicationData);
    }
  }, [applicationData]);

  // useLayoutEffect(() => {
  //   if (
  //     !applicationData?.length === 0 ||
  //     applicationData?.length === undefined
  //   ) {
  //     getAppliedJobsData();
  //   }
  // }, []);

  // const getAppliedJobsData = async () => {
  //   try {
  //     const response = await getAppliedJobsById({ companyId: user._id });
  //     let temp;
  //     response.data.data.map((item) => {
  //       temp = item?.appliedCandidate;
  //     });
  //     handleSelectApplicantsData(temp);
  //     setAppliedJobs(temp);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleNavigate = (id,data) => {
    // console.log(id,data,"Resummmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm");
    setSelectedPage("viewResume");
    setSearchParams({ page: "viewResume" });
    localStorage.setItem("selectedTemplate", JSON.stringify(data));
    handleSelecteTemplate(data);
    setResumeId(id)
    setRecentApplications(false)
    // navigate(`/dashboard/resume/${id}`);

  };

  const handleNavigateToCoverLetter = (id,data) => {
    localStorage.setItem("selectedCoverLetter", JSON.stringify(data));
    handleSelectCoverLetter(data);
    setSelectedPage("viewCoverLetter");
    setSearchParams({ page: "viewCoverLetter" });
    setCoverLetterId(id)
    setRecentApplications(false)

  };
  console.log(appliedJobs, "compnayDetailscompnayDetails");

  return (
    <Box component="div">
      <Box
        component="div"
        sx={{
          background: primaryColor,
          padding: "20px",
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: "18px !important",
            fontWeight: "400 !important",
            color: headerColor,
          }}
        >
          {jobDetails} Applications
        </Typography>
      </Box>
      {appliedJobs?.map((item, index) => {
        return (
          <Box
            key={index}
            component="div"
            sx={{
              border: `1px solid ${primaryBorderColor}`,
              padding: "25px",
              marginTop: "20px",
            }}
          >
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item xs={12} md={4}>
                <Box
                  component="div"
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Box component="div" sx={{ textAlign: "center" }}>
                    <img
                      src={item?.userDetails?.userImage}
                      style={{ width: "80px" }}
                    />
                  </Box>
                  <Box component="div" ml="5px">
                    <Typography
                      variant="h3"
                      sx={{
                        fontSize: "18px !important",
                        fontWeight: "600 !important",
                      }}
                    >
                      {item?.userDetails?.name}
                    </Typography>
                    <Box
                      component="div"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        width: "22rem",
                        gap: "10px",
                        marginTop: "10px",
                      }}
                    >
                      <Box
                        component="div"
                        sx={{ display: "flex", alignItems: "center" }}
                      >
                        <Work sx={{ color: primaryColor }} />
                        <Typography
                          variant="h3"
                          sx={{
                            fontSize: "14px !important",
                            fontWeight: "400 !important",
                            color: textColor,
                          }}
                        >
                          {item?.resume?.jobDescription}
                        </Typography>
                      </Box>
                      <Box
                        component="div"
                        sx={{ display: "flex", alignItems: "center" }}
                      >
                        <LocationOn sx={{ color: primaryColor }} />
                        <Typography
                          variant="h3"
                          sx={{
                            fontSize: "14px !important",
                            fontWeight: "400 !important",
                            color: textColor,
                          }}
                        >
                          {item?.resume?.location}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={5} display="flex" justifyContent="center">
                <Box
                  component="div"
                  sx={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <Box
                    sx={{
                      cursor: "pointer",
                      border: `1px solid ${primaryBorderColor}`,
                      gap: "10px",
                      fontSize: "14px",
                      padding: "7px",
                      marginTop: "10px",
                      "&:hover": {
                        background: primaryColor,
                        color: headerColor,
                        transition: "all 0.3s ease-in-out",
                      },
                    }}
                    display="flex"
                    alignItems="center"
                    p={2}
                    component="div"
                    onClick={() => handleNavigate(item?.resume?._id,item?.resume?.selectedTemplate)}
                  >
                    <RemoveRedEye />
                    View Resume
                  </Box>
                  <Box
                    sx={{
                      cursor: "pointer",
                      border: `1px solid ${primaryBorderColor}`,
                      gap: "10px",
                      fontSize: "14px",
                      padding: "7px",
                      marginTop: "10px",
                      "&:hover": {
                        background: primaryColor,
                        color: headerColor,
                        transition: "all 0.3s ease-in-out",
                      },
                    }}
                    display="flex"
                    alignItems="center"
                    p={2}
                    component="div"
                    onClick={() => handleNavigateToCoverLetter(item?.coverLetter?._id,item?.coverLetter?.selectedTemplate)}
                  >
                    <RemoveRedEye />
                    View Cover Letter
                  </Box>
                  <Typography
                      variant="h3"
                      sx={{
                        fontSize: "18px !important",
                        fontWeight: "600 !important",
                        textAlign:"center",
                        marginTop:"10px"
                      }}
                    >
                      {item?.score}
                    </Typography>
                </Box>
              </Grid>
             
            </Grid>
          </Box>
        );
      })}
    </Box>
  );
};

export default Applications;
