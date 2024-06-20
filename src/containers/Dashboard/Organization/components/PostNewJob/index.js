import {
  Box,
  Grid,
  MenuItem,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import IconButton from "../../../../../components/IconButton";
import TextInput from "../../../../../components/TextInput";
import {
  headerColor,
  primaryBorderColor,
  primaryColor,
} from "../../../../../constants/Colors";
import { profile, coverBanner } from "../../../../../constants/Images";
import useStyles from "../../../../../styles";
import { countries } from "../../../../../utils/countries";
import { AppContext } from "../../../../../context";
import React from "react";
import { useSnackbar } from "notistack";
import {
  createJob,
  updateJob,
} from "../../../../../services/OrginizationDashboard";
import { useLayoutEffect } from "react";
import DatePicker from 'react-datepicker';


const PostNewJob = ({ jobData }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { user, login } = React.useContext(AppContext);

  useEffect(() => {
    window.scrollTo({ top: 100, behavior: "smooth" });
  }, []);

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedJob, setSelectedJob] = useState("");
  const [type, setType] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState({
    jobCategory: "",
    jobType: "",
    minSalary: "",
    maxSalary: "",
    experirence: "",
    jobDescripion: "",
    country: "",
    city: "",
    fullAddress: "",
    jobTitle: "",
    isMultipleHirirng: "",
    isUrgentHiring: "",
    requirements: "",
    jobPosition: "",
    lastDate:new Date(),
  });

  const onChangeHandler = (e,dateName) => {
    if (dateName=="lastDate") {
      setInput({
        ...input,
        lastDate:e,
      })
    }else{
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }
  };

  const classes = useStyles();

  const companySize = [
    {
      id: 1,
      label: "1-500",
      value: "1-500",
    },
    {
      id: 2,
      label: "1-200",
      value: "1-200",
    },
    {
      id: 3,
      label: "1-100",
      value: "1-100",
    },
    {
      id: 4,
      label: "1-50",
      value: "1-50",
    },
  ];

  const jobDescriptionData = [
    {
      id: 1,
      label: "It & Computer",
      value: "It & Computer",
    },
    {
      id: 2,
      label: "Marketing",
      value: "Marketing",
    },
    {
      id: 3,
      label: "Mechanical",
      value: "Mechanical",
    },
    {
      id: 4,
      label: "Doctor",
      value: "Doctor",
    },
  ];

  const jobTypeData = [
    {
      id: 1,
      label: "Full Time",
      value: "FullTime",
    },
    {
      id: 2,
      label: "Part Time",
      value: "PartTime",
    },
  ];

  const jobSalaryData = [
    {
      id: 1,
      label: "12k",
      value: "12k",
    },
    {
      id: 2,
      label: "15k",
      value: "15k",
    },
  ];

  const handlePostJob = async () => {
    if (type === "edit") {
      const {
        jobDescripion,
        jobCategory,
        jobType,
        experirence,
        city,
        country,
        minSalary,
        maxSalary,
        fullAddress,
        requirements,
        jobPosition,
        jobTitle,
        isMultipleHirirng,
        isUrgentHiring,
        lastDate,
      } = input;
      let payload = {
        jobPosition,
        jobType,
        jobTitle,
        experienceRequire: experirence,
        requirements,
        description: jobDescripion,
        city,
        category: jobCategory,
        companyId: user?._id,
        minSalary,
        maxSalary,
        country,
        lastDate,
        fullAddress,
        isMultipleHirirng: isMultipleHirirng === "Yes" ? true : false,
        isUrgentHiring: isUrgentHiring === "Yes" ? true : false,
      };
      if (jobTitle == "") {
        enqueueSnackbar("Job title can't be empty", {
          variant: "error",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
        });
      } else if (jobPosition == "") {
        enqueueSnackbar("Job position can't be empty", {
          variant: "error",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
        });
      } else if (jobCategory == "") {
        enqueueSnackbar("Job category can't be empty", {
          variant: "error",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
        });
      } else if (jobType == "") {
        enqueueSnackbar("Job type can't be empty", {
          variant: "error",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
        });
      } else if (minSalary == "") {
        enqueueSnackbar("Minimum Salary can't be empty", {
          variant: "error",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
        });
      } else if (maxSalary == "") {
        enqueueSnackbar("Maximum Salary can't be empty", {
          variant: "error",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
        });
      } else if (experirence == "") {
        enqueueSnackbar("Experience can't be empty", {
          variant: "error",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
        });
      } else if (jobDescripion == "") {
        enqueueSnackbar("Job description can't be empty", {
          variant: "error",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
        });
      } else if (requirements == "") {
        enqueueSnackbar("Job requirements can't be empty", {
          variant: "error",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
        });
      } else if (country == "") {
        enqueueSnackbar("Country can't be empty", {
          variant: "error",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
        });
      } else if (city == "") {
        enqueueSnackbar("City can't be empty", {
          variant: "error",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
        });
      } else if (fullAddress == "") {
        enqueueSnackbar("Full Address can't be empty", {
          variant: "error",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
        });
      } else {
        setIsLoading(true);
        updateJob(jobData?._id, payload)
          .then((response) => {
            setIsLoading(false);
            if (response?.data?.status == "ok") {
              enqueueSnackbar(response?.data?.message, {
                variant: "success",
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "right",
                },
              });
            } else {
              enqueueSnackbar(response?.data?.message, {
                variant: "error",
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "right",
                },
              });
            }
          })
          .catch((error) => {
            setIsLoading(false);
            enqueueSnackbar(error?.message, {
              variant: "error",
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "right",
              },
            });
          });
      }
    } else {
      const {
        jobDescripion,
        jobCategory,
        jobType,
        experirence,
        city,
        country,
        minSalary,
        maxSalary,
        fullAddress,
        requirements,
        jobPosition,
        jobTitle,
        lastDate,
        isMultipleHirirng,
        isUrgentHiring,
      } = input;
      let payload = {
        jobPosition,
        jobType,
        jobTitle,
        experienceRequire: experirence,
        requirements,
        description: jobDescripion,
        city,
        category: jobCategory,
        companyId: user?._id,
        minSalary,
        maxSalary,
        country,
        lastDate,
        fullAddress,
        isMultipleHirirng: isMultipleHirirng === "Yes" ? true : false,
        isUrgentHiring: isUrgentHiring === "Yes" ? true : false,
        compnayDetails: user,
      };
      if (jobTitle == "") {
        enqueueSnackbar("Job title can't be empty", {
          variant: "error",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
        });
      } else if (jobPosition == "") {
        enqueueSnackbar("Job position can't be empty", {
          variant: "error",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
        });
      } else if (jobCategory == "") {
        enqueueSnackbar("Job category can't be empty", {
          variant: "error",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
        });
      } else if (jobType == "") {
        enqueueSnackbar("Job type can't be empty", {
          variant: "error",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
        });
      } else if (minSalary == "") {
        enqueueSnackbar("Minimum Salary can't be empty", {
          variant: "error",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
        });
      } else if (maxSalary == "") {
        enqueueSnackbar("Maximum Salary can't be empty", {
          variant: "error",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
        });
      } else if (experirence == "") {
        enqueueSnackbar("Experience can't be empty", {
          variant: "error",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
        });
      } else if (jobDescripion == "") {
        enqueueSnackbar("Job description can't be empty", {
          variant: "error",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
        });
      } else if (requirements == "") {
        enqueueSnackbar("Job requirements can't be empty", {
          variant: "error",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
        });
      } else if (country == "") {
        enqueueSnackbar("Country can't be empty", {
          variant: "error",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
        });
      } else if (city == "") {
        enqueueSnackbar("City can't be empty", {
          variant: "error",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
        });
      } else if (fullAddress == "") {
        enqueueSnackbar("Full Address can't be empty", {
          variant: "error",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
        });
      } else {
        setIsLoading(true);
        createJob(payload)
          .then((response) => {
            setIsLoading(false);
            if (response?.data?.status == "ok") {
              enqueueSnackbar(response?.data?.message, {
                variant: "success",
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "right",
                },
              });
              setInput({
                jobCategory: "",
                jobType: "",
                minSalary: "",
                maxSalary: "",
                experirence: "",
                jobDescripion: "",
                country: "",
                city: "",
                fullAddress: "",
                jobTitle: "",
                isMultipleHirirng: "",
                isUrgentHiring: "",
                requirements: "",
                lastDate:new Date(),
                jobPosition: "",
              });
            } else {
              enqueueSnackbar(response?.data?.message, {
                variant: "error",
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "right",
                },
              });
            }
          })
          .catch((error) => {
            console.log(error, "eeeeerroooooooooooooooo");
            setIsLoading(false);
          });
      }
    }
  };

  useLayoutEffect(() => {
    if (jobData) {
      setInput({
        ...input,
        jobCategory: jobData?.category,
        jobType: jobData?.jobType,
        minSalary: jobData?.minSalary,
        maxSalary: jobData?.maxSalary,
        experirence: jobData?.experienceRequire,
        jobDescripion: jobData?.description,
        country: jobData?.country,
        city: jobData?.city,
        fullAddress: jobData?.fullAddress,
        jobTitle: jobData?.jobTitle,
        isMultipleHirirng: jobData?.isMultipleHirirng ? "Yes" : "No",
        isUrgentHiring: jobData?.isUrgentHiring ? "Yes" : "No",
        requirements: jobData?.requirements,
        lastDate: new Date(jobData?.lastDate),
        jobPosition: jobData?.jobPosition
      });
      setType("edit");
    }
  }, [jobData]);

  return (
    <>
      <Box component="div" sx={{ border: `1px solid ${primaryBorderColor}` }}>
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
            Post New Job
          </Typography>
        </Box>
        <Box component="div" mt="20px" p={2}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography sx={{ fontSize: "1.1rem" }} variant="h3">
                Job Title
              </Typography>
              <Box sx={{ marginTop: "7px" }}>
                <TextInput
                  className={classes.heroInput}
                  placeholder="Job Title"
                  value={input?.jobTitle}
                  name="jobTitle"
                  onChange={(e) => onChangeHandler(e)}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography sx={{ fontSize: "1.1rem" }} variant="h3">
                Job Position
              </Typography>
              <Box sx={{ marginTop: "7px" }}>
                <TextInput
                  className={classes.heroInput}
                  placeholder="Job Position"
                  value={input?.jobPosition}
                  name="jobPosition"
                  onChange={(e) => onChangeHandler(e)}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography sx={{ fontSize: "1.1rem" }} variant="h3">
                Job Category
              </Typography>
              <Box sx={{ marginTop: "7px" }}>
                <TextField
                  isNumber
                  onChange={(e) => onChangeHandler(e)}
                  className={classes.heroInput}
                  id="jobDescription"
                  value={input?.jobCategory}
                  select
                  name="jobCategory"
                >
                  {jobDescriptionData?.map((item) => {
                    return (
                      <MenuItem value={item?.value}>{item.label}</MenuItem>
                    );
                  })}
                </TextField>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography sx={{ fontSize: "1.1rem" }} variant="h3">
                Job Type
              </Typography>
              <Box sx={{ marginTop: "7px" }}>
                <TextField
                  isNumber
                  onChange={(e) => onChangeHandler(e)}
                  className={classes.heroInput}
                  id="jobDescription"
                  value={input?.jobType}
                  select
                  name="jobType"
                >
                  {jobTypeData?.map((item) => {
                    return (
                      <MenuItem value={item?.value}>{item.label}</MenuItem>
                    );
                  })}
                </TextField>
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={2} mt="10px">
            <Grid item xs={12} md={6}>
              <Typography sx={{ fontSize: "1.1rem" }} variant="h3">
                Min Salary
              </Typography>
              <Box sx={{ marginTop: "7px" }}>
                <TextInput
                  className={classes.heroInput}
                  placeholder="5k "
                  value={input?.minSalary}
                  name="minSalary"
                  onChange={(e) => onChangeHandler(e)}
                  isNumber
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography sx={{ fontSize: "1.1rem" }} variant="h3">
                Max Salary
              </Typography>
              <Box sx={{ marginTop: "7px" }}>
                <TextInput
                  className={classes.heroInput}
                  placeholder="500k "
                  value={input?.maxSalary}
                  name="maxSalary"
                  onChange={(e) => onChangeHandler(e)}
                  isNumber
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography sx={{ fontSize: "1.1rem" }} variant="h3">
                Experience
              </Typography>
              <Box sx={{ marginTop: "7px" }}>
                <TextInput
                  className={classes.heroInput}
                  placeholder="1 Year"
                  value={input?.experirence}
                  name="experirence"
                  onChange={(e) => onChangeHandler(e)}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography sx={{ fontSize: "1.1rem" }} variant="h3">
                Multiple Candidate Hirirng
              </Typography>
              <Box sx={{ marginTop: "7px" }}>
                <TextField
                  isNumber
                  onChange={(e) => onChangeHandler(e)}
                  className={classes.heroInput}
                  id="jobDescription"
                  value={input?.isMultipleHirirng}
                  select
                  name="isMultipleHirirng"
                >
                  <MenuItem value="No">No</MenuItem>;
                  <MenuItem value="Yes">Yes</MenuItem>;
                </TextField>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography sx={{ fontSize: "1.1rem" }} variant="h3">
                Urgent Hirirng
              </Typography>
              <Box sx={{ marginTop: "7px" }}>
                <TextField
                  isNumber
                  onChange={(e) => onChangeHandler(e)}
                  className={classes.heroInput}
                  id="jobDescription"
                  value={input?.isUrgentHiring}
                  select
                  name="isUrgentHiring"
                >
                  <MenuItem value="No">No</MenuItem>;
                  <MenuItem value="Yes">Yes</MenuItem>;
                </TextField>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography sx={{ fontSize: "1.1rem" }} variant="h3">
                Last Date to apply
              </Typography>
              <Box sx={{ marginTop: "7px" }}>
                <DatePicker
                  selected={input.lastDate}
                  onChange={(date) => onChangeHandler(date, "lastDate")}
                  className={classes.heroInput}
                  wrapperClassName="neweducationDatePicker"
                  showYearDropdown
                  scrollableYearDropdown
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Box
        component="div"
        sx={{
          border: `1px solid ${primaryBorderColor}`,
          marginTop: "30px",
        }}
      >
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
            About This Job
          </Typography>
        </Box>
        <Grid container spacing={2} mt="10px" p="10px">
          <Grid item xs={12}>
            <Typography sx={{ fontSize: "1.1rem" }} variant="h3">
              Detailed Description About Job
            </Typography>
            <Box sx={{ marginTop: "7px" }}>
              <TextInput
                multiline
                className={classes.heroInput}
                value={input?.jobDescripion}
                name="jobDescripion"
                onChange={(e) => onChangeHandler(e)}
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Typography sx={{ fontSize: "1.1rem" }} variant="h3">
              Job Requirements
            </Typography>
            <Box sx={{ marginTop: "7px" }}>
              <TextInput
                multiline
                className={classes.heroInput}
                value={input?.requirements}
                name="requirements"
                onChange={(e) => onChangeHandler(e)}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box
        component="div"
        sx={{
          border: `1px solid ${primaryBorderColor}`,
          marginTop: "30px",
        }}
      >
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
            Address / Location
          </Typography>
        </Box>
        <Grid container spacing={2} p={2}>
          <Grid item xs={12} md={6}>
            <Typography sx={{ fontSize: "1.1rem" }} variant="h3">
              Country
            </Typography>
            <Box sx={{ marginTop: "7px" }}>
              <TextField
                isNumber
                className={classes.heroInput}
                select
                id="jobDescription"
                value={input?.country}
                name="country"
                onChange={(e) => onChangeHandler(e)}
              >
                {countries.map((item) => {
                  return <MenuItem value={item.code}>{item.name}</MenuItem>;
                })}
              </TextField>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography sx={{ fontSize: "1.1rem" }} variant="h3">
              City
            </Typography>
            <Box sx={{ marginTop: "7px" }}>
              <TextInput
                className={classes.heroInput}
                placeholder="London"
                value={input?.city}
                name="city"
                onChange={(e) => onChangeHandler(e)}
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Typography sx={{ fontSize: "1.1rem" }} variant="h3">
              Full Address
            </Typography>
            <Box sx={{ marginTop: "7px" }}>
              <TextInput
                className={classes.heroInput}
                placeholder="London UK"
                value={input?.fullAddress}
                name="fullAddress"
                onChange={(e) => onChangeHandler(e)}
              />
            </Box>
            <IconButton className={classes.heroBtn} onClick={handlePostJob}>
              {isLoading ? (
                <CircularProgress
                  size={30}
                  sx={{
                    "& .MuiCircularProgress-svg": {
                      color: "#fff",
                    },
                  }}
                />
              ) : type === "edit" ? (
                "Update Job"
              ) : (
                "Post Job"
              )}
            </IconButton>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default PostNewJob;
