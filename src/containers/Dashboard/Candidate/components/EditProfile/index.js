import {
  Box,
  CircularProgress,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useContext } from "react";
import { useLayoutEffect } from "react";
import { useRef } from "react";
import { useEffect, useState } from "react";
import IconButton from "../../../../../components/IconButton";
import Loader from "../../../../../components/Loader";
import TextInput from "../../../../../components/TextInput";
import {
  headerColor,
  primaryBorderColor,
  primaryColor,
} from "../../../../../constants/Colors";
import { profile } from "../../../../../constants/Images";
import { AppContext } from "../../../../../context";
import {
  getUser,
  updateUser,
  changePasswordUser,
} from "../../../../../services/UserDashboard";
import useStyles from "../../../../../styles";
import { useSnackbar } from "notistack";

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

const EditProfile = () => {
  useEffect(() => {
    window.scrollTo({ top: 100, behavior: "smooth" });
  }, []);

  const { user, login } = useContext(AppContext);
  const { enqueueSnackbar } = useSnackbar();

  const classes = useStyles();
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);
  const [image, setImage] = useState("");
  const imageRef = useRef(null);

  useLayoutEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setIsLoading(true);
    try {
      let response = await getUser(user._id);
      if (response) {
        setIsLoading(false);
        setInputValues({
          ...inputValues,
          name: response.data.data.name,
          phone: response.data.data.phoneNumber,
          address: response.data.data.address,
          jobDescription: response.data.data.jobDescription,
          country: response.data.data.country,
          state: response.data.data.state,
          city: response.data.data.city,
          email: response.data.data.email,
        });
        setImage(response.data.data.userImage);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  const [inputValues, setInputValues] = useState({
    name: "",
    phone: "",
    address: "",
    jobDescription: "",
    address: "",
    country: "",
    state: "",
    city: "",
    email: "",
    password: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const handleChange = (e) => {
    setInputValues({
      ...inputValues,
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

  const handleUpdateProfile = async () => {
    const {
      name,
      phone,
      jobDescription,
      address,
      country,
      state,
      city,
    } = inputValues;
    let payload = {
      name,
      phone,
      jobDescription,
      address,
      country,
      state,
      city,
      userImage: image,
    };
    if (image == "") {
      enqueueSnackbar("Please upload image", {
        variant: "error",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "right",
        },
      });
    } else if (name == "") {
      enqueueSnackbar("Name can't be empty", {
        variant: "error",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "right",
        },
      });
    } else if (phone == "") {
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
      setLoadingButton(true);
      try {
        let response = await updateUser(user._id, payload);
        if (response.status == 200) {
          setLoadingButton(false);
          enqueueSnackbar(response.data.message, {
            variant: "success",
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "right",
            },
          });
          let newObj = {
            ...response.data.data,
          };
          localStorage.setItem("user", JSON.stringify(newObj));
          window.location.reload();
        } else {
          setLoadingButton(false);
          enqueueSnackbar(response.data.message, {
            variant: "error",
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "right",
            },
          });
        }
      } catch (error) {
        setLoadingButton(false);
        enqueueSnackbar(error.response.data.message, {
          variant: "error",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
        });
      }
    }
  };

  const handleChangePassword = async () => {
    const { password, newPassword, confirmNewPassword } = inputValues;
    if (password == "") {
      enqueueSnackbar("Please enter current password", {
        variant: "error",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "right",
        },
      });
      return;
    } else if (newPassword == "") {
      enqueueSnackbar("Please enter new password", {
        variant: "error",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "right",
        },
      });
      return;
    } else if (confirmNewPassword == "") {
      enqueueSnackbar("Please enter confirm password", {
        variant: "error",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "right",
        },
      });
      return;
    } else if (newPassword != confirmNewPassword) {
      enqueueSnackbar("Password and confirm password not matched", {
        variant: "error",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "right",
        },
      });
      return;
    } else if (newPassword.length < 6) {
      enqueueSnackbar("Password must be 6 characters long", {
        variant: "error",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "right",
        },
      });
      return;
    } else {
      setLoadingButton(true);
      try {
        let payload = {
          email: user.email,
          password,
          newPassword,
        };
        let response = await changePasswordUser(payload);
        if (response.status == 200) {
          setLoadingButton(false);
          enqueueSnackbar(response.data.message, {
            variant: "success",
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "right",
            },
          });
          setInputValues({
            ...inputValues,
            password: "",
            newPassword: "",
            confirmNewPassword: "",
          });
        } else {
          setLoadingButton(false);
          enqueueSnackbar(response.data.message, {
            variant: "error",
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "right",
            },
          });
        }
      } catch (error) {
        setLoadingButton(false);
        enqueueSnackbar(error.response.data.message, {
          variant: "error",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
        });
      }
    }
  };

  return (
    <>
      <Loader isloading={isLoading} />
      <Loader isloading={isLoadingImage} />
      <Box
        component="div"
        sx={{ border: `1px solid ${primaryBorderColor}`, padding: "15px" }}
      >
        <Box component="div" sx={{ display: "flex" }}>
          <img src={image ? image : profile} style={{ width: "15%" }} />
          <Box component="div" ml={2}>
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
        <Box component="div" mt="20px">
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography sx={{ fontSize: "1.1rem" }} variant="h3">
                @Username
              </Typography>
              <Box sx={{ marginTop: "7px" }}>
                <TextInput
                  name="name"
                  value={inputValues.name}
                  onChange={(e) => handleChange(e)}
                  className={classes.heroInput}
                  placeholder="John Doe"
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography sx={{ fontSize: "1.1rem" }} variant="h3">
                Email
              </Typography>
              <Box sx={{ marginTop: "7px" }}>
                <TextInput
                  name="email"
                  value={inputValues.email}
                  onChange={(e) => handleChange(e)}
                  disabled
                  className={classes.heroInput}
                  placeholder="john@gmail.com"
                />
              </Box>
            </Grid>
          </Grid>

          <Grid container spacing={2} mt="10px">
            <Grid item xs={12} md={6}>
              <Typography sx={{ fontSize: "1.1rem" }} variant="h3">
                Job Description
              </Typography>
              <Box sx={{ marginTop: "7px" }}>
                <TextField
                  name="jobDescription"
                  value={inputValues.jobDescription}
                  onChange={(e) => handleChange(e)}
                  isNumber
                  className={classes.heroInput}
                  id="jobDescription"
                  select
                >
                  {jobDescriptionData.map((item) => {
                    return <MenuItem value={item.value}>{item.label}</MenuItem>;
                  })}
                </TextField>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography sx={{ fontSize: "1.1rem" }} variant="h3">
                Phone
              </Typography>
              <Box sx={{ marginTop: "7px" }}>
                <TextInput
                  name="phone"
                  value={inputValues.phone}
                  onChange={(e) => handleChange(e)}
                  isNumber
                  className={classes.heroInput}
                  placeholder="+92 300 3423423"
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography sx={{ fontSize: "1.1rem" }} variant="h3">
                Address
              </Typography>
              <Box sx={{ marginTop: "7px" }}>
                <TextInput
                  name="address"
                  value={inputValues.address}
                  onChange={(e) => handleChange(e)}
                  className={classes.heroInput}
                  placeholder="karachi"
                />
              </Box>
            </Grid> 
            <Grid item xs={12} md={6}>
              <Typography sx={{ fontSize: "1.1rem" }} variant="h3">
                Country
              </Typography>
              <Box sx={{ marginTop: "7px" }}>
                <TextInput
                  name="country"
                  value={inputValues.country}
                  onChange={(e) => handleChange(e)}
                  className={classes.heroInput}
                  placeholder="Pakistan"
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography sx={{ fontSize: "1.1rem" }} variant="h3">
                State
              </Typography>
              <Box sx={{ marginTop: "7px" }}>
                <TextInput
                  name="state"
                  value={inputValues.state}
                  onChange={(e) => handleChange(e)}
                  className={classes.heroInput}
                  placeholder="Sindh"
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography sx={{ fontSize: "1.1rem" }} variant="h3">
                City
              </Typography>
              <Box sx={{ marginTop: "7px" }}>
                <TextInput
                  name="city"
                  value={inputValues.city}
                  onChange={(e) => handleChange(e)}
                  className={classes.heroInput}
                  placeholder="Karachi"
                />
              </Box>
            </Grid>
          </Grid>
          <IconButton className={classes.heroBtn} onClick={handleUpdateProfile}>
            {loadingButton ? (
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
                value={inputValues.password}
                name="password"
                onChange={handleChange}
                className={classes.heroInput}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography sx={{ fontSize: "1.1rem" }} variant="h3">
              New Password
            </Typography>
            <Box sx={{ marginTop: "7px" }}>
              <TextInput
                value={inputValues.newPassword}
                name="newPassword"
                onChange={handleChange}
                isPassword
                className={classes.heroInput}
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
                value={inputValues.confirmNewPassword}
                name="confirmNewPassword"
                onChange={handleChange}
                isPassword
                className={classes.heroInput}
              />
            </Box>
          </Grid>
        </Grid>
        <Box component="div" p="10px">
          <IconButton
            className={classes.heroBtn}
            onClick={handleChangePassword}
          >
            {loadingButton ? (
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
        </Box>
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
