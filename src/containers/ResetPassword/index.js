import { useState } from "react"
import { Email, Lock, VpnKey } from "@mui/icons-material"
import { Box, CircularProgress, Grid, Typography } from "@mui/material"
import IconButton from "../../components/IconButton"
import TextInput from "../../components/TextInput"
import { primaryColor, textColor } from "../../constants/Colors"
import { loginImage } from "../../constants/Images"
import useStyles from "../../styles"
import AuthWrapper from "../../components/AuthWrapper"
import { useNavigate, Navigate } from "react-router-dom"
import { sendCode, resetPasswordUser } from "../../services/Authentication"
import { useSnackbar } from "notistack"


const ResetPassword = () => {
    const classes = useStyles()
    const navigate = useNavigate()
    const { enqueueSnackbar } = useSnackbar()
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [code, setCode] = useState("")
    const [visible, setVisible] = useState(false)

    const handleSendCode = async () => {
        if (!email) {
            enqueueSnackbar("Please enter email address", {
                variant: "error", anchorOrigin: {
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
        } else {
            try {
                setLoading(true)
                const response = await sendCode({ email })
                if (response.status === 200) {
                    setLoading(false)
                    enqueueSnackbar(response.data.message, {
                        variant: "success", anchorOrigin: {
                            vertical: 'bottom',
                            horizontal: 'right',
                        },
                    })
                    setVisible(true)
                } else {
                    setLoading(false)
                    enqueueSnackbar(response.data.message, {
                        variant: 'error',
                        anchorOrigin: {
                            vertical: 'bottom',
                            horizontal: 'right',
                        },
                    });
                }
            } catch (error) {
                setLoading(false)
                enqueueSnackbar(error.message, {
                    variant: 'error',
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'right',
                    },
                });

            }

        }
    }

    const handleResetPassword = async () => {
        if (!email) {
            enqueueSnackbar("Please enter email address", {
                variant: "error", anchorOrigin: {
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
        } else if (!code) {
            enqueueSnackbar("Please enter code", {
                variant: "error", anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'right',
                },
            })
        } else if (!password) {
            enqueueSnackbar("Please enter password", {
                variant: "error", anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'right',
                },
            })
        }
        else if (password.length < 6) {
            enqueueSnackbar("Password must be at least 6 characters", {
                variant: "error", anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'right',
                },
            })
        } else {
            let payload = {
                email,
                password,
                otp: code
            }
            try {
                setLoading(true)
                const response = await resetPasswordUser(payload)
                if (response.status === 200) {
                    setLoading(false)
                    enqueueSnackbar(response.data.message, {
                        variant: "success", anchorOrigin: {
                            vertical: 'bottom',
                            horizontal: 'right',
                        },
                    })
                    setVisible(false)
                    navigate("/login")
                } else {
                    setLoading(false)
                    enqueueSnackbar(response.data.message, {
                        variant: 'error',
                        anchorOrigin: {
                            vertical: 'bottom',
                            horizontal: 'right',
                        },
                    });
                }
            } catch (error) {
                setLoading(false)
                enqueueSnackbar(error.message, {
                    variant: 'error',
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'right',
                    },
                });

            }

        }
    }


    return (
        <AuthWrapper title="Reset Password">
            <Grid container>
                <Grid item xs={12} md={6}>
                    <img src={loginImage} style={{ width: "100%" }} />
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
                            Reset Password
                        </Typography>
                        <Box sx={{ marginTop: "20px" }}>
                            <TextInput
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="icon" icon={<Email sx={{
                                    color: primaryColor,
                                    marginRight: "10px",
                                }} />} className={classes.heroInput} placeholder="Email Address*" />
                        </Box>
                        {
                            visible ? <>
                                <Box sx={{ marginTop: "20px" }}>
                                    <TextInput
                                        value={code}
                                        onChange={(e) => setCode(e.target.value)}
                                        type="icon" icon={<VpnKey sx={{
                                            color: primaryColor,
                                            marginRight: "10px",
                                        }} />} className={classes.heroInput} placeholder="Code*" />
                                </Box>
                                <Box sx={{ marginTop: "20px" }}>
                                    <TextInput
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        type="icon" icon={<Lock sx={{
                                            color: primaryColor,
                                            marginRight: "10px",
                                        }} />} className={classes.heroInput} placeholder="Password*" />
                                </Box>
                            </>
                                : null
                        }
                        {
                            visible ? <Box sx={{ marginTop: "20px" }}>
                                <Typography variant="h2" sx={{ color: textColor, fontSize: "16px" }}>
                                    Send again? <span onClick={() => {
                                        setEmail("")
                                        setCode("")
                                        setPassword("")
                                        setVisible(false)
                                    }} style={{ color: primaryColor, fontSize: "16px", cursor: "pointer" }}>Click here</span>
                                </Typography>
                            </Box>
                                : null
                        }

                    </Box>


                    <IconButton onClick={visible ? handleResetPassword : handleSendCode} className={classes.heroBtn} width={"70%"}>
                        {
                            loading ? <CircularProgress size={30} sx={{
                                "& .MuiCircularProgress-svg": {
                                    color: "#fff"
                                }
                            }} /> : visible ? "Reset Password" : "Confirm Email"
                        }
                    </IconButton>

                    <Box sx={{ marginTop: "20px" }}>
                        <Typography variant="h2" sx={{ color: textColor, fontSize: "16px" }}>
                            Don't have an account? <span onClick={() => navigate("/register")} style={{ color: primaryColor, fontSize: "16px", cursor: "pointer" }}>Register</span>
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </AuthWrapper>
    )
}

export default ResetPassword