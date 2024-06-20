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
import { AppContext } from "../../../../../context";
import React from "react";
import {
  changePasswordOrginization,
  updateOrginizationProfile,
} from "../../../../../services/OrginizationDashboard";
import { useSnackbar } from "notistack";
import { updateUser } from "../../../../../services/UserDashboard";
import { useRef } from "react";
import axios from "axios";
import Loader from "../../../../../components/Loader";

const EditProfile = () => {
  const { user, login } = React.useContext(AppContext);
  const { enqueueSnackbar } = useSnackbar();
  const imageRef = useRef(null);

  useEffect(() => {
    window.scrollTo({ top: 100, behavior: "smooth" });
  }, []);

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedJob, setSelectedJob] = useState("");
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState("");

  const [input, setInput] = useState({
    name: user?.name,
    email: user?.email,
    phoneNumber: user?.phoneNumber,
    address: user?.address ? user?.address : "",
    companySize: user?.companySize ? user?.companySize : "",
    jobDescription: user?.jobDescription ? user?.jobDescription : "",
    country: user?.country ? user?.country : "",
    state: user?.state ? user?.state : "",
    city: user?.city ? user?.city : "",
    password: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const onChangeHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleImage = async (e) => {
    setIsLoadingImage(true);
    const form = new FormData();
    form.append("image", e.target.files[0]);
    try {
      let res = await axios.post("https://amberstore.pk/upload.php", form);
      if (res) {
        setImage(res.data.url);
        let payload = {
          userImage: res.data.url,
        };
        let response = await updateUser(user._id, payload);
        let newObj = {
          ...user,
          userImage: response.data.data.userImage,
        };
        localStorage.setItem("user", JSON.stringify(newObj));
        window.location.reload();
        setIsLoadingImage(false);
      }
    } catch (error) {
        setIsLoadingImage(false);
    }
  };

  const handleUpdateProfile = () => {
    const {
      name,
      phoneNumber,
      address,
      companySize,
      jobDescription,
      country,
      state,
      city,
    } = input;
    const payload = {
      name,
      phoneNumber,
      address,
      companySize,
      jobDescription,
      country,
      state,
      city,
    };
    if (name == "") {
      enqueueSnackbar("Name can't be empty", {
        variant: "error",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "right",
        },
      });
    } else if (phoneNumber == "") {
      enqueueSnackbar("Phone can't be empty", {
        variant: "error",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "right",
        },
      });
    } else if (address == "") {
      enqueueSnackbar("Address can't be empty", {
        variant: "error",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "right",
        },
      });
    } else if (companySize == "") {
      enqueueSnackbar("Company Size can't be empty", {
        variant: "error",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "right",
        },
      });
    } else if (jobDescription == "") {
      enqueueSnackbar("Job Description can't be empty", {
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
    } else if (state == "") {
      enqueueSnackbar("State can't be empty", {
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
    } else {
      setIsLoading(true);
      updateOrginizationProfile(user?._id, payload)
        .then((response) => {
          setIsLoading(false);
          console.log(
            response?.data,
            "response?.dataresponse?.dataresponse?.data"
          );
          if (response?.data?.status == "ok") {
            let data = response?.data?.data;
            localStorage.setItem("user", JSON.stringify(data));
            enqueueSnackbar(response.data.message, {
              variant: "success",
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "right",
              },
            });
          } else {
            enqueueSnackbar(response.data.message, {
              variant: "error",
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "right",
              },
            });
          }
        })
        .catch((error) => {
          console.log(error, "erooor=========>");
        });
    }
  };

  const handleChangePassword = () => {
    const { email, password, newPassword, confirmNewPassword } = input;
    let payload = {
      email,
      password,
      newPassword,
    };
    if (password === "") {
      enqueueSnackbar("Password  is required", {
        variant: "error",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "right",
        },
      });
    } else if (newPassword === "") {
      enqueueSnackbar("New Password is required", {
        variant: "error",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "right",
        },
      });
    } else if (confirmNewPassword === "") {
      enqueueSnackbar("New Password is required", {
        variant: "error",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "right",
        },
      });
    } else if (confirmNewPassword !== newPassword) {
      enqueueSnackbar("Password does not match", {
        variant: "error",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "right",
        },
      });
    } else {
      changePasswordOrginization(payload)
        .then((response) => {
          if (response?.data?.status === "ok") {
            enqueueSnackbar(response?.data?.message, {
              variant: "success",
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "right",
              },
            });
            setInput({
              ...input,
              password: "",
              newPassword: "",
              confirmNewPassword: "",
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
          console.log(error, "errooooooooooo");
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
  return (
    <>
    <Loader isloading={isLoadingImage}/>
      <Box
        component="div"
        sx={{ border: `1px solid ${primaryBorderColor}`, padding: "15px" }}
      >
        <Box
          component="div"
          sx={{
            display: "flex",
            borderBottom: `1px solid ${primaryBorderColor}`,
          }}
        >
          <img src={image ? image : user?.userImage} style={{ width: "15%" }} />
          <Box component="div" ml="10px">
            <Typography mt="5px" sx={{ fontSize: "1rem" }} variant="h3">
              JPEG Or PNG 500x500px Thumbnail
            </Typography>
            <Box component="div" mt="5px">
              <IconButton
                onClick={() => imageRef.current.click()}
                className={classes.heroBtn}
              >
                Browse Image
              </IconButton>
            </Box>
          </Box>
        </Box>
        {/* <Box component="div" sx={{ display: "flex", borderBottom: `1px solid ${primaryBorderColor}`, marginTop: "10px" }}>
                    <img src={coverBanner} style={{ width: "40%" }} />
                    <Box component="div" ml={1} pb={2}>
                        <Typography mt="5px" sx={{ fontSize: "1rem" }} variant="h3">
                            JPEG Or PNG 1920x300px Cover Image
                        </Typography>
                        <Box component="div" mt="5px">
                            <IconButton className={classes.heroBtn}>
                                Browse Image
                            </IconButton>
                        </Box>
                    </Box>
                </Box> */}
        <Box component="div" mt="20px">
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography sx={{ fontSize: "1.1rem" }} variant="h3">
                Organization Name
              </Typography>
              <Box sx={{ marginTop: "7px" }}>
                <TextInput
                  className={classes.heroInput}
                  placeholder="Orginization Name"
                  value={input?.name}
                  onChange={(e) => onChangeHandler(e)}
                  name="name"
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography sx={{ fontSize: "1.1rem" }} variant="h3">
                Email
              </Typography>
              <Box sx={{ marginTop: "7px" }}>
                <TextInput
                  className={classes.heroInput}
                  placeholder="Email"
                  value={input?.email}
                  onChange={(e) => onChangeHandler(e)}
                  name="email"
                  disabled={true}
                />
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={2} mt="10px">
            <Grid item xs={12} md={6}>
              <Typography sx={{ fontSize: "1.1rem" }} variant="h3">
                Phone
              </Typography>
              <Box sx={{ marginTop: "7px" }}>
                <TextInput
                  isNumber
                  className={classes.heroInput}
                  placeholder="Phone Number"
                  name="phoneNumber"
                  onChange={(e) => onChangeHandler(e)}
                  value={input?.phoneNumber}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography sx={{ fontSize: "1.1rem" }} variant="h3">
                Address
              </Typography>
              <Box sx={{ marginTop: "7px" }}>
                <TextInput
                  className={classes.heroInput}
                  placeholder="Address"
                  name="address"
                  value={input?.address}
                  onChange={(e) => onChangeHandler(e)}
                />
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={2} mt="10px">
            <Grid item xs={12} md={6}>
              <Typography sx={{ fontSize: "1.1rem" }} variant="h3">
                Company Size
              </Typography>
              <Box sx={{ marginTop: "7px" }}>
                <TextField
                  isNumber
                  onChange={(e) => onChangeHandler(e)}
                  className={classes.heroInput}
                  id="companySize"
                  value={input?.companySize}
                  select
                  name="companySize"
                >
                  {companySize.map((item) => {
                    return <MenuItem value={item.value}>{item.label}</MenuItem>;
                  })}
                </TextField>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography sx={{ fontSize: "1.1rem" }} variant="h3">
                Job Description
              </Typography>
              <Box sx={{ marginTop: "7px" }}>
                <TextField
                  isNumber
                  onChange={(e) => onChangeHandler(e)}
                  className={classes.heroInput}
                  id="jobDescription"
                  value={input.jobDescription}
                  select
                  name="jobDescription"
                >
                  {jobDescriptionData.map((item) => {
                    return <MenuItem value={item.value}>{item.label}</MenuItem>;
                  })}
                </TextField>
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={2} mt="10px">
            <Grid item xs={12} md={6}>
              <Typography sx={{ fontSize: "1.1rem" }} variant="h3">
                Country
              </Typography>
              <Box sx={{ marginTop: "7px" }}>
                <TextInput
                  className={classes.heroInput}
                  placeholder="Country"
                  value={input?.country}
                  name="country"
                  onChange={(e) => onChangeHandler(e)}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography sx={{ fontSize: "1.1rem" }} variant="h3">
                State
              </Typography>
              <Box sx={{ marginTop: "7px" }}>
                <TextInput
                  className={classes.heroInput}
                  placeholder="State"
                  onChange={(e) => onChangeHandler(e)}
                  value={input?.state}
                  name="state"
                />
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={2} mt="10px">
            <Grid item xs={12}>
              <Typography sx={{ fontSize: "1.1rem" }} variant="h3">
                City
              </Typography>
              <Box sx={{ marginTop: "7px" }}>
                <TextInput
                  className={classes.heroInput}
                  placeholder="City"
                  onChange={(e) => onChangeHandler(e)}
                  value={input?.city}
                  name="city"
                />
              </Box>
              <IconButton
                onClick={handleUpdateProfile}
                className={classes.heroBtn}
              >
                {isLoading ? (
                  <CircularProgress
                    size={30}
                    sx={{
                      "& .MuiCircularProgress-svg": {
                        color: "#fff",
                      },
                    }}
                  />
                ) : (
                  "Update Profile"
                )}
              </IconButton>
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
            Password & Security
          </Typography>
        </Box>
        <Grid container spacing={2} mt="10px" p="10px">
          <Grid item xs={12} md={6}>
            <Typography sx={{ fontSize: "1.1rem" }} variant="h3">
              Current Password
            </Typography>
            <Box sx={{ marginTop: "7px" }}>
              <TextInput
                isPassword
                className={classes.heroInput}
                onChange={(e) => onChangeHandler(e)}
                value={input?.password}
                name="password"
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography sx={{ fontSize: "1.1rem" }} variant="h3">
              New Password
            </Typography>
            <Box sx={{ marginTop: "7px" }}>
              <TextInput
                isPassword
                className={classes.heroInput}
                onChange={(e) => onChangeHandler(e)}
                value={input?.newPassword}
                name="newPassword"
              />
            </Box>
          </Grid>
        </Grid>
        <Grid container spacing={2} mt="10px" p="10px">
          <Grid item xs={12}>
            <Typography sx={{ fontSize: "1.1rem" }} variant="h3">
              Repeat New Password
            </Typography>
            <Box sx={{ marginTop: "7px" }}>
              <TextInput
                isPassword
                className={classes.heroInput}
                onChange={(e) => onChangeHandler(e)}
                value={input?.confirmNewPassword}
                name="confirmNewPassword"
              />
            </Box>
            <IconButton
              onClick={handleChangePassword}
              className={classes.heroBtn}
            >
              {isLoading ? (
                <CircularProgress
                  size={30}
                  sx={{
                    "& .MuiCircularProgress-svg": {
                      color: "#fff",
                    },
                  }}
                />
              ) : (
                "Change Password"
              )}
            </IconButton>
          </Grid>
        </Grid>
      </Box>
      <input
        accept="image/png, image/gif, image/jpeg"
        type="file"
        ref={imageRef}
        style={{ visibility: "hidden", height: "0" }}
        onChange={handleImage}
      />
    </>
  );
};

export default EditProfile;
