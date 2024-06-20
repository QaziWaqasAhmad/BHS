import {
  AccountBalance,
  Adb,
  CalendarMonth,
  Delete,
  Edit,
  FavoriteBorder,
  LocationOn,
  Money,
  RemoveRedEye,
} from "@mui/icons-material";
import { Box, FormControlLabel, Grid, Switch, Typography } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import IconButton from "../../../../../components/IconButton";
import {
  headerColor,
  primaryBorderColor,
  primaryColor,
  textColor,
  textSecondaryColor,
} from "../../../../../constants/Colors";
import { profile } from "../../../../../constants/Images";
import {
  deleteJob,
  getJobsById,
  updateJob,
} from "../../../../../services/OrginizationDashboard";
import useStyles from "../../../../../styles";
import { AppContext } from "../../../../../context";
import React from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import Loader from "../../../../../components/Loader";

const ManageJobs = ({
  setSelectedPage,
  setJobData,
  setApplicationData,
  setSearchParams,
  jobDetails,
  setJobDetails
}) => {
  const { user, login,handleSelectApplicantsData } = React.useContext(AppContext);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    window.scrollTo({ top: 100, behavior: "smooth" });
    handleGetJobs();
  }, []);

  const classes = useStyles();
  const [jobs, setJobs] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const jobData = [
    {
      id: 1,
      jobTitle: "General Ledger Accountant",
      datePosted: "02 Oct 2017",
      status: "Active",
      applicationCount: 6,
    },
    {
      id: 2,
      jobTitle: "General Ledger Accountant",
      datePosted: "02 Oct 2017",
      status: "Pending",
      applicationCount: 12,
    },
    {
      id: 3,
      jobTitle: "General Ledger Accountant",
      datePosted: "02 Oct 2017",
      status: "Expired",
      applicationCount: 7,
    },
  ];

  const handleGetJobs = () => {
    setIsLoading(true);
    getJobsById(user?._id)
      .then((response) => {
        setIsLoading(false);
        if (response?.data?.status == "ok") {
          setJobs(response?.data?.data);
        } else {
          console.log(response?.data, "datttttttttttttaaaaa");
        }
      })
      .catch((error) => {
        console.log(error, "errorrrrrrrrrrrrr");
      });
  };

  const handleDeletJob = (id) => {
    deleteJob(id)
      .then((response) => {
        console.log(response?.data, "responseresponseresponseresponse");
        if (response?.data?.status == "ok") {
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        } else {
          Swal.fire("OOPs!", "something went wrong.", "error");
        }
      })
      .catch((error) => {
        console.log(error, "errorrr");
      });
  };

  const showAlert = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeletJob(id);
      }
    });
  };

  const handleEditJob = (data) => {
    setSelectedPage("postNewJob");
    setSearchParams({ page: "postNewJob" });
    setJobData(data);
  };

  const handleViewJob = (data,item) => {
    setSelectedPage("manageJobs");
    setSearchParams({ page: "applications" });
    setJobDetails(item?.jobTitle)
    handleSelectApplicantsData(data)
  };

  const handleUpdateStatus = (e,item) =>{
    let payload = {
        isActive:!item.isActive,
        companyId: user?._id,
    }
    setIsLoading(true);
    updateJob(item?._id, payload).then((res)=>{
        setIsLoading(false)
        if (res?.data?.status == "ok") {
            enqueueSnackbar(res?.data?.message, {
              variant: "success",
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "right",
              },
            });
            handleGetJobs()
          } else {
            enqueueSnackbar(res?.data?.message, {
              variant: "error",
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "right",
              },
            });
          }
    }).catch((err)=>{
        setIsLoading(false)
        enqueueSnackbar(err?.message, {
            variant: "error",
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "right",
            },
          });
        console.log(err,"errerrerrerrerr")
    })

  }

  return (
    <>
    <Loader isloading={isloading}/>
    <Box component="div">
      <Box
        component="div"
        sx={{
          background: primaryColor,
          padding: "20px",
        }}
      >
        <Grid container>
          <Grid item xs={12} md={4}>
            <Typography
              variant="h1"
              sx={{
                fontSize: "18px !important",
                fontWeight: "400 !important",
                color: headerColor,
              }}
            >
              Job Title
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            md={8}
            display="flex"
            gap="100px"
            justifyContent="center"
          >
            <Typography
              variant="h1"
              sx={{
                fontSize: "18px !important",
                fontWeight: "400 !important",
                color: headerColor,
              }}
            >
              Applications
            </Typography>
            <Typography
              variant="h1"
              sx={{
                fontSize: "18px !important",
                fontWeight: "400 !important",
                color: headerColor,
              }}
            >
              Status
            </Typography>
            <Typography
              variant="h1"
              sx={{
                fontSize: "18px !important",
                fontWeight: "400 !important",
                color: headerColor,
              }}
            >
              Action
            </Typography>
          </Grid>
        </Grid>
      </Box>
      {jobs.map((item) => {
        return (
          <Box
            component="div"
            sx={{
              border: `1px solid ${primaryBorderColor}`,
              padding: "20px",
              marginTop: "20px",
            }}
          >
            <Grid container>
              <Grid item xs={12} md={4}>
                <Box
                  component="div"
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Box component="div">
                    <Typography
                      variant="h3"
                      sx={{
                        fontSize: "18px !important",
                        fontWeight: "400 !important",
                      }}
                    >
                      {item.jobTitle}
                    </Typography>
                    <Box
                      mt={1}
                      component="div"
                      display="flex"
                      alignItems="center"
                    >
                      <CalendarMonth sx={{ color: primaryColor }} />
                      <Typography
                        variant="h3"
                        sx={{
                          fontSize: "18px !important",
                          fontWeight: "400 !important",
                          color: textSecondaryColor,
                        }}
                      >
                        Date Posted: {item.date}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
                md={8}
                display="flex"
                gap="70px"
                justifyContent="center"
                alignItems="center"
              >
                <Typography
                  variant="h3"
                  sx={{
                    fontSize: "18px !important",
                    fontWeight: "400 !important",
                    color: primaryColor,
                  }}
                >
                  {item.appliedCandidate.length} Applications
                </Typography>
                <Box sx={{
                    display:"flex",
                    alignItems:"center",
                    gap:"10px"
                }}>
                <Typography
                  variant="h3"
                  sx={{
                    fontSize: "18px !important",
                    fontWeight: "400 !important",
                    color:
                      item.status === "Active"
                        ? "green"
                        : item.status === "Pending"
                        ? "burlywood"
                        : item.status === "Expired"
                        ? "red"
                        : "",
                  }}
                >
                  {item?.isActive ? "Active" : "In-Active"}
                </Typography>
                <FormControlLabel
                sx={{
                    "&.MuiFormControlLabel-root .MuiSwitch-root .MuiSwitch-track": {
                        backgroundColor: primaryColor,
                      },
                      "&.MuiFormControlLabel-root .MuiSwitch-root .MuiSwitch-switchBase": {
                        color: primaryColor,
                      },
                      "&.MuiFormControlLabel-root": {
                        // marginTop: "15px",
                        // marginLeft: "13px",
                      },
                }}
                  control={
                    <Switch
                      size="small"
                      checked={item?.isActive}
                      onClick={(e) => handleUpdateStatus(e, item)}
                    />
                  }
                  
                />
                </Box>
                <Box
                  component="div"
                  display="flex"
                  gap="10px"
                  alignItems="center"
                >
                  <RemoveRedEye
                    onClick={() => handleViewJob(item?.appliedCandidate,item)}
                    sx={{ fontSize: "20px", cursor: "pointer" }}
                  />
                  <Edit
                    onClick={() => handleEditJob(item)}
                    sx={{ fontSize: "20px", cursor: "pointer" }}
                  />
                  {/* <Delete sx={{ fontSize: "20px", cursor: "pointer" }} onClick={() => showAlert(item?._id)} /> */}
                </Box>
              </Grid>
            </Grid>
          </Box>
        );
      })}
    </Box>
    </>
  );
};

export default ManageJobs;
