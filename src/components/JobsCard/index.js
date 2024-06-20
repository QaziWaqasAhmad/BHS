import { Box, Grid, Typography } from "@mui/material";
import {
  headerColor,
  jobsSalaryColor,
  secondaryColor,
  textColor,
} from "../../constants/Colors";
import useStyles from "../../styles";
import {
  FavoriteBorder,
  Payment,
  WorkOutline,
  PersonAddAlt1,
  AccessTime,
  Favorite,
} from "@mui/icons-material";
import { useState, useEffect, useLayoutEffect, useContext } from "react";
import IconButton from "../IconButton";
import moment from "moment/moment";
import { AppContext } from "../../context";
import { red } from "@mui/material/colors";
const JobsCard = ({
  job,
  handleAddFavourite,
  handleRemoveFavourite,
  handleApplyJob,
}) => {
  const classes = useStyles();
  const { user } = useContext(AppContext);
  const [selectedJob, setSelectedJob] = useState(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  useLayoutEffect(() => {
    setSelectedJob(job[0]);
  }, [job]);

  console.log(scrollPosition, "scrollPosition");
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const openJobDetail = (item) => {
    let mediaQuery = 900;
    let pageWidth = window.innerWidth;
    if (pageWidth >= mediaQuery) {
      setSelectedJob(item);
    } else {
      window.open("/postAJob", "_blank");
    }
  };


  return (
    <Box component="div">
      <Grid container>
        <Grid item xs={12} md={6}>
          {job?.map((item, index) => {
            if (item?.isActive == true) {
              return (
                <Box
                  component="div"
                  className={classes.jobCardContainer}
                  onClick={() => openJobDetail(item)}
                >
                  <Box
                    component="div"
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Box component="div">
                      <Typography
                        sx={{
                          fontSize: "24px !important",
                          fontWeight: "600 !important",
                          textDecoration: "underline",
                        }}
                        variant="h1"
                        className={classes.heroHeading}
                      >
                        {item.jobTitle}
                      </Typography>
                      <Typography
                        sx={{ fontSize: "20px !important", marginTop: "7px" }}
                        variant="h3"
                        className={classes.heroSubHeading}
                      >
                        {item?.companyName}
                      </Typography>
                      <Typography
                        sx={{ fontSize: "20px !important", marginTop: "7px" }}
                        variant="h3"
                        className={classes.heroSubHeading}
                      >
                        {item.fullAddress}
                      </Typography>
                    </Box>
                    {item?.favourite?.includes(user?._id) ? (
                      <Favorite
                        onClick={() => handleRemoveFavourite(item._id)}
                        style={{ fontSize: "30px", color: red[500] }}
                      />
                    ) : (
                      <FavoriteBorder
                        onClick={() => handleAddFavourite(item._id)}
                        style={{ fontSize: "30px" }}
                      />
                    )}
                  </Box>
                  <Box
                    component="div"
                    sx={{ display: "flex", marginTop: "10px" }}
                  >
                    <Box
                      component="div"
                      sx={{
                        background: jobsSalaryColor,
                        padding: "10px",
                        borderRadius: "5px",
                      }}
                    >
                      <Typography
                        variant="h1"
                        sx={{
                          fontSize: "16px !important",
                          fontWeight: "600 !important",
                          display: "flex",
                          alignItems: "center",
                        }}
                        className={classes.heroHeading}
                      >
                        <Payment />{" "}
                        <span style={{ marginLeft: "4px" }}>
                          {item?.minSalary + " To " + item?.maxSalary} a month
                        </span>
                      </Typography>
                    </Box>
                    <Box
                      component="div"
                      sx={{
                        background: jobsSalaryColor,
                        padding: "10px",
                        borderRadius: "5px",
                        marginLeft: "10px",
                      }}
                    >
                      <Typography
                        variant="h1"
                        sx={{
                          fontSize: "16px !important",
                          fontWeight: "600 !important",
                          display: "flex",
                          alignItems: "center",
                        }}
                        className={classes.heroHeading}
                      >
                        <WorkOutline />
                        <span style={{ marginLeft: "4px" }}>
                          {" "}
                          {item.jobType}
                        </span>
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    component="div"
                    sx={{ display: "flex", marginTop: "10px" }}
                  >
                    <Box component="div">
                      {item?.isMultipleHirirng && (
                        <Typography
                          variant="h1"
                          sx={{
                            fontSize: "16px !important",
                            display: "flex",
                            alignItems: "center",
                          }}
                          className={classes.heroHeading}
                        >
                          <PersonAddAlt1 style={{ color: "#b4602b" }} />{" "}
                          <span style={{ marginLeft: "4px" }}>
                            Hiring multiple Candidates
                          </span>
                        </Typography>
                      )}
                    </Box>
                    <Box component="div" sx={{ marginLeft: "10px" }}>
                      {item?.isUrgentHiring && (
                        <Typography
                          variant="h1"
                          sx={{
                            fontSize: "16px !important",
                            display: "flex",
                            alignItems: "center",
                          }}
                          className={classes.heroHeading}
                        >
                          <AccessTime style={{ color: "#c74289" }} />{" "}
                          <span style={{ marginLeft: "4px" }}>
                            Urgently hiring
                          </span>
                        </Typography>
                      )}
                    </Box>
                  </Box>
                  <Box sx={{ marginTop: "10px" }} component="div">
                    <Typography
                      sx={{ fontSize: "16px !important", lineHeight: "18px" }}
                      variant="h3"
                      className={classes.heroSubHeading}
                    >
                      {item.description?.slice(0, 150) + "..."}
                    </Typography>
                  </Box>
                  <Box sx={{ marginTop: "10px" }} component="div">
                    <Typography
                      sx={{ fontSize: "16px !important", lineHeight: "18px" }}
                      variant="h3"
                      className={classes.heroSubHeading}
                    >
                      Posted {moment().diff(item.date, "days")} days ago{" "}
                    </Typography>
                  </Box>
                  <Box sx={{ marginTop: "10px" }} component="div">
                    <Typography
                      sx={{ fontSize: "16px !important", lineHeight: "18px" }}
                      variant="h3"
                      className={classes.heroSubHeading}
                    >
                      Last date to apply {moment(item?.lastDate).format("DD-MMM-YYYY")}
                    </Typography>
                  </Box>
                </Box>
              );
            }
          })}
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{ position: "relative", display: { xs: "none", md: "block" } }}
        >
          <Box
            component="div"
            position={scrollPosition > 300 ? "sticky" : "sticky"}
            top={110}
            width={scrollPosition > 300 ? "100%" : "100%"}
            sx={{
              cursor: "default !important",
              transition: "all 0.3s step-start",
            }}
            className={classes.jobCardContainer}
          >
            <Box
              component="div"
              sx={{
                borderBottom: `3px solid ${textColor}`,
                paddingBottom: "20px",
              }}
            >
              <Box component="div">
                <Typography
                  sx={{
                    fontSize: "24px !important",
                    fontWeight: "600 !important",
                    textDecoration: "underline",
                  }}
                  variant="h1"
                  className={classes.heroHeading}
                >
                  {selectedJob?.jobTitle}
                </Typography>
                <Typography
                  sx={{ fontSize: "20px !important", marginTop: "7px" }}
                  variant="h3"
                  className={classes.heroSubHeading}
                >
                  {selectedJob?.companyName}
                </Typography>
                <Typography
                  sx={{ fontSize: "20px !important", marginTop: "7px" }}
                  variant="h3"
                  className={classes.heroSubHeading}
                >
                  {selectedJob?.fullAddress}
                </Typography>
                <Box
                  component="div"
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <IconButton
                    disabled={
                      selectedJob?.appliedCandidateIds?.includes(user?._id)
                        ? true
                        : false
                    }
                    onClick={() =>
                      handleApplyJob(selectedJob?._id, selectedJob?.companyId)
                    }
                    className={classes.heroBtn}
                    width={"30%"}
                  >
                    {selectedJob?.appliedCandidateIds?.includes(user?._id)
                      ? "Applied"
                      : "Apply now"}
                  </IconButton>
                  <Box
                    component="div"
                    sx={{
                      margin: "10px 0px 0px 10px",
                      background: jobsSalaryColor,
                      padding: "10px",
                      borderRadius: "10px",
                    }}
                  >
                    {selectedJob?.favourite?.includes(user?._id) ? (
                      <Favorite
                        onClick={() => handleRemoveFavourite(selectedJob?._id)}
                        style={{
                          fontSize: "35px",
                          cursor: "pointer",
                          color: red[500],
                        }}
                      />
                    ) : (
                      <FavoriteBorder
                        onClick={() => handleAddFavourite(selectedJob?._id)}
                        style={{ fontSize: "35px", cursor: "pointer" }}
                      />
                    )}
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box
              component="div"
              sx={{ height: "720px", overflowY: "scroll", padding: "20px" }}
            >
              <Box
                component="div"
                sx={{
                  borderBottom: `1px solid ${textColor}`,
                  paddingBottom: "20px",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "22px !important",
                    fontWeight: "600 !important",
                  }}
                  variant="h1"
                  className={classes.heroHeading}
                >
                  Job Details
                </Typography>
                <Typography
                  sx={{
                    fontSize: "18px !important",
                    fontWeight: "600 !important",
                    marginTop: "10px",
                  }}
                  variant="h1"
                  className={classes.heroHeading}
                >
                  Job Type
                </Typography>
                <Typography
                  sx={{ fontSize: "16px !important", marginTop: "10px" }}
                  variant="h1"
                  className={classes.heroHeading}
                >
                  {selectedJob?.jobType}
                </Typography>
              </Box>
              <Box component="div" sx={{ marginTop: "20px" }}>
                <Typography
                  sx={{
                    fontSize: "22px !important",
                    fontWeight: "600 !important",
                  }}
                  variant="h1"
                  className={classes.heroHeading}
                >
                  Full Job Description
                </Typography>
                <Typography
                  sx={{
                    fontSize: "17px !important",
                    lineHeight: "22px",
                    marginTop: "10px",
                  }}
                  variant="h3"
                  className={classes.heroSubHeading}
                >
                  {selectedJob?.description}
                </Typography>
              </Box>
              <Box component="div" sx={{ marginTop: "20px" }}>
                <Typography
                  sx={{
                    fontSize: "22px !important",
                    fontWeight: "600 !important",
                  }}
                  variant="h1"
                  className={classes.heroHeading}
                >
                  Requirements
                </Typography>
                <ul>
                  {selectedJob?.requirements.split(".").map((item, index) => (
                    <li key={index}>{item.trim()}</li>
                  ))}
                </ul>
              </Box>
              {/* <Box component="div" sx={{ marginTop: "20px" }}>
                                <Typography sx={{ fontSize: "22px !important", fontWeight: "600 !important" }} variant="h1" className={classes.heroHeading}>
                                    Skills
                                </Typography>
                                <Typography sx={{ fontSize: "17px !important", lineHeight: "22px", marginTop: "10px" }} variant="h3" className={classes.heroSubHeading}>{selectedJob.skills}</Typography>
                            </Box> */}
              {/* <Box component="div" sx={{ marginTop: "20px" }}>
                                <Typography sx={{ fontSize: "22px !important", fontWeight: "600 !important" }} variant="h1" className={classes.heroHeading}>
                                    Responsibilities
                                </Typography>
                                <Typography sx={{ fontSize: "17px !important", lineHeight: "22px", marginTop: "10px" }} variant="h3" className={classes.heroSubHeading}>{selectedJob.responsibilities}</Typography>
                            </Box> */}
              <Box component="div" sx={{ marginTop: "20px" }}>
                <Typography
                  sx={{
                    fontSize: "22px !important",
                    fontWeight: "600 !important",
                  }}
                  variant="h1"
                  className={classes.heroHeading}
                >
                  Salary
                </Typography>
                <Typography
                  sx={{
                    fontSize: "17px !important",
                    lineHeight: "22px",
                    marginTop: "10px",
                  }}
                  variant="h3"
                  className={classes.heroSubHeading}
                >
                  {selectedJob?.minSalary + " To " + selectedJob?.maxSalary} a
                  month
                </Typography>
              </Box>
              {/* {
                                selectedJob.benefits && <Box component="div" sx={{ marginTop: "20px" }}>
                                    <Typography sx={{ fontSize: "22px !important", fontWeight: "600 !important" }} variant="h1" className={classes.heroHeading}>
                                        Benefits
                                    </Typography>
                                    <Typography sx={{ fontSize: "17px !important", lineHeight: "22px", marginTop: "10px" }} variant="h3" className={classes.heroSubHeading}>{selectedJob.benefits}</Typography>
                                </Box>
                            } */}
              {/* {
                                selectedJob.timing && <Box component="div" sx={{ marginTop: "20px" }}>
                                    <Typography sx={{ fontSize: "22px !important", fontWeight: "600 !important" }} variant="h1" className={classes.heroHeading}>
                                        Timing
                                    </Typography>
                                    <Typography sx={{ fontSize: "17px !important", lineHeight: "22px", marginTop: "10px" }} variant="h3" className={classes.heroSubHeading}>{selectedJob.timing}</Typography>
                                </Box>
                            } */}

              {/* <Box component="div" sx={{ marginTop: "20px" }}>
                                <Typography sx={{ fontSize: "22px !important", fontWeight: "600 !important" }} variant="h1" className={classes.heroHeading}>
                                    Hiring Insights
                                </Typography>
                                <Typography sx={{ fontSize: "17px !important", lineHeight: "22px", marginTop: "10px" }} variant="h3" className={classes.heroSubHeading}>Hiring {selectedJob.candidateCount} candidates for this role</Typography>
                            </Box> */}
              <Box component="div" sx={{ marginTop: "20px" }}>
                <Typography
                  sx={{
                    fontSize: "22px !important",
                    fontWeight: "600 !important",
                  }}
                  variant="h1"
                  className={classes.heroHeading}
                >
                  Job activity
                </Typography>
                <Typography
                  sx={{
                    fontSize: "17px !important",
                    lineHeight: "22px",
                    marginTop: "10px",
                  }}
                  variant="h3"
                  className={classes.heroSubHeading}
                >
                  Posted {moment().diff(selectedJob?.date, "days")} days ago
                </Typography>
                <Typography
                  sx={{
                    fontSize: "17px !important",
                    lineHeight: "22px",
                    marginTop: "10px",
                  }}
                  variant="h3"
                  className={classes.heroSubHeading}
                >
                 Last date to apply {moment(selectedJob?.lastDate).format("DD-MMM-YYYY")}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default JobsCard;
