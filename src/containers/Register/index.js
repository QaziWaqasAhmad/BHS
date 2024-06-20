import { useState } from "react"
import { useSnackbar } from 'notistack';
import { Email, LocalPhone, Lock, Person } from "@mui/icons-material"
import { Box, CircularProgress, Grid, MenuItem, Select, TextField, Typography } from "@mui/material"
import IconButton from "../../components/IconButton"
import TextInput from "../../components/TextInput"
import { primaryColor, textColor } from "../../constants/Colors"
import { loginImage, registerProfile, registerImage } from "../../constants/Images"
import useStyles from "../../styles"
import AuthWrapper from "../../components/AuthWrapper"
import { useNavigate } from "react-router-dom"
import ImageUploader from "../../components/ImageUploader"
import { sendCode, registerUser } from "../../services/Authentication"
import Swal from "sweetalert2";
import CodeConfirmationModal from "../../components/CodeConfirmationModal";
import { createCoverLetter, createResume } from "../../services/UserDashboard";



const Register = () => {
    const classes = useStyles()
    const navigate = useNavigate()
    const { enqueueSnackbar } = useSnackbar();
    const [image, setImage] = useState(null)
    const [selectedRole, setSelectedRole] = useState("")
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [code, setCode] = useState("");
    const [password, setPassword] = useState("")
    const [openModal, setOpenModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSendCode = async () => {
        if (image == null) {
            enqueueSnackbar(
                'Please select profile image',
                {
                    variant: 'error',
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'right',
                    },
                }
            );
        } else if (fullName == "") {
            enqueueSnackbar('Full name is required', {
                variant: 'error',
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'right',
                },
            })
        } else if (email == "") {
            enqueueSnackbar('Email is required', {
                variant: 'error',
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'right',
                },
            })
        } else if (phone == "") {
            enqueueSnackbar('Phone number is required', {
                variant: 'error',
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'right',
                },
            })
        }
        else if (selectedRole == "") {
            enqueueSnackbar('Role is required', {
                variant: 'error',
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'right',
                },
            })
        } else if (password == "") {
            enqueueSnackbar('Password is required', {
                variant: 'error',
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'right',
                },
            })
        } else if (!email.includes("@")) {
            enqueueSnackbar("Please enter a valid email address", {
                variant: "error", anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'right',
                },
            })
        } else if (password.length < 6) {
            enqueueSnackbar("Password should be atleast 6 characters", {
                variant: "error", anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'right',
                },
            })
        }
        else if (phone.length < 11) {
            enqueueSnackbar("Password enter a valid phone number", {
                variant: "error", anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'right',
                },
            })
        }
        else {
            setLoading(true);
            let payload = {
                email
            }
            try {
                let response = await sendCode(payload)
                if (response.status == 200) {
                    setLoading(false);
                    enqueueSnackbar(response.data.message, {
                        variant: 'success',
                        anchorOrigin: {
                            vertical: 'bottom',
                            horizontal: 'right',
                        },
                    });
                    setOpenModal(true);
                } else {
                    setLoading(false);
                    enqueueSnackbar(response.data.message, {
                        variant: 'error',
                        anchorOrigin: {
                            vertical: 'bottom',
                            horizontal: 'right',
                        },
                    });
                }
            } catch (error) {
                setLoading(false);
                enqueueSnackbar(error.message, {
                    variant: 'error',
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'right',
                    },
                })
            }
        }
    }

    const handleRegister = async () => {
        if (code == "") {
            enqueueSnackbar(
                'Code is required',
                {
                    variant: 'error',
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'right',
                    },
                }
            );
        } else {
            setLoading(true);
            let payload = {
                email,
                password,
                role: selectedRole,
                name: fullName,
                userImage: image,
                phoneNumber: phone,
                code
            }
            try {
                let response = await registerUser(payload)
                if (response.status == 200) {
                    setLoading(false);
                    enqueueSnackbar(response.data.message, {
                        variant: 'success',
                        anchorOrigin: {
                            vertical: 'bottom',
                            horizontal: 'right',
                        },
                    });
                    if (response.data.data.role == "Candidate") {
                        let resumePayload = {
                            userId: response.data.data._id,
                        }
                        let resumeResponse = await createResume(resumePayload)
                        let newResume = await createCoverLetter(resumePayload)
                    }
                    setOpenModal(false);
                    setCode("");
                    setEmail("");
                    setPassword("");
                    setFullName("");
                    setPhone("");
                    setImage(null);
                    setSelectedRole("");
                    navigate("/login")
                } else {
                    setLoading(false);
                    enqueueSnackbar(response.data.message, {
                        variant: 'error',
                        anchorOrigin: {
                            vertical: 'bottom',
                            horizontal: 'right',
                        },
                    });
                }
            } catch (error) {
                setLoading(false);
                enqueueSnackbar(error.message, {
                    variant: 'error',
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'right',
                    },
                })
            }
        }
    }



    return (
        <AuthWrapper title="Register">
            <Grid container>
                <Grid item xs={12} md={6}>
                    <img src={registerImage} style={{ width: "100%" }} />
                </Grid>
                <Grid item xs={12} md={6}
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                    }}
                >
                    <Box component="div" sx={{ padding: "20px", width: "70%" }}>
                        <Typography variant="h1" sx={{ textAlign: "center" }} className={classes.loginFormHeading}>
                            Register
                        </Typography>
                        <Box component="div" mt="20px">

                            <ImageUploader
                                type="profile"
                                image={image}
                                setImage={setImage}
                            />
                        </Box>
                        <Box sx={{ marginTop: "10px" }}>
                            <TextInput
                                onChange={(e) => setFullName(e.target.value)}
                                value={fullName}
                                type="icon" icon={<Person sx={{
                                    color: primaryColor,
                                    marginRight: "10px",
                                }} />} className={classes.heroInput} placeholder="Full Name" />
                        </Box>
                        <Box sx={{ marginTop: "20px" }}>
                            <TextInput
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                type="icon" icon={<Email sx={{
                                    color: primaryColor,
                                    marginRight: "10px",
                                }} />} className={classes.heroInput} placeholder="Email Address*" />
                        </Box>
                        <Box sx={{ marginTop: "20px" }}>
                            <TextInput
                                onChange={(e) => setPhone(e.target.value)}
                                value={phone}
                                isNumber
                                type="icon" icon={<LocalPhone sx={{
                                    color: primaryColor,
                                    marginRight: "10px",
                                }} />} className={classes.heroInput} placeholder="Phone Number*" />
                        </Box>
                        <Box sx={{ marginTop: "20px" }}>
                            <Select displayEmpty onChange={(e) => setSelectedRole(e.target.value)} className={classes.heroInput} value={selectedRole}>
                                <MenuItem disabled value="">Select Role</MenuItem>
                                {
                                    ["Organization", "Candidate"].map((item) => {
                                        return (
                                            <MenuItem value={item}>{item}</MenuItem>
                                        )
                                    })
                                }
                            </Select>
                        </Box>
                        <Box sx={{ marginTop: "20px" }}>
                            <TextInput
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                type="icon" icon={<Lock sx={{
                                    color: primaryColor,
                                    marginRight: "10px",
                                }} />} className={classes.heroInput} placeholder="Password*"
                                isPassword={true}
                            />
                        </Box>

                    </Box>
                    {/* <Box
                        onClick={() => navigate("/resetPassword")}
                    >
                        <Typography variant="h2" sx={{ color: primaryColor, fontSize: "16px", cursor: "pointer" }}>
                            Forgot Password?
                        </Typography>


                    </Box> */}
                    <IconButton onClick={handleSendCode} className={classes.heroBtn} width={"70%"}>
                        {
                            loading ? <CircularProgress size={30} sx={{
                                "& .MuiCircularProgress-svg": {
                                    color: "#fff"
                                }
                            }} /> : "Sign Up"
                        }

                    </IconButton>
                    <Box sx={{ marginTop: "20px" }}>
                        <Typography variant="h2" sx={{ color: textColor, fontSize: "16px" }}>
                            Already have an account? <span onClick={() => navigate("/login")} style={{ color: primaryColor, fontSize: "16px", cursor: "pointer" }}>Login</span>
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
            <CodeConfirmationModal handleRegister={handleRegister} code={code} setCode={setCode} open={openModal} setOpen={setOpenModal} />
        </AuthWrapper>
    )
}

export default Register