import { useContext, useState } from "react"
import { Email, Lock } from "@mui/icons-material"
import { Box, CircularProgress, Grid, Typography } from "@mui/material"
import IconButton from "../../components/IconButton"
import TextInput from "../../components/TextInput"
import { primaryColor, textColor } from "../../constants/Colors"
import { loginImage } from "../../constants/Images"
import useStyles from "../../styles"
import AuthWrapper from "../../components/AuthWrapper"
import { useNavigate, Navigate } from "react-router-dom"
import { loginUser } from "../../services/Authentication"
import { useSnackbar } from "notistack"
import { AppContext } from "../../context"


const Login = () => {
    const classes = useStyles()
    const { login, user } = useContext(AppContext);
    const navigate = useNavigate()
    const { enqueueSnackbar } = useSnackbar()
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = async () => {
        if (!email || !password) {
            enqueueSnackbar("Please fill all the fields", {
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
        } else if (password.length < 6) {
            enqueueSnackbar("Password should be atleast 6 characters", {
                variant: "error", anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'right',
                },
            })
        } else {
            try {
                setLoading(true)
                const response = await loginUser({ email, password })
                if (response.status === 200) {
                    setLoading(false)
                    enqueueSnackbar(response.data.message, {
                        variant: "success", anchorOrigin: {
                            vertical: 'bottom',
                            horizontal: 'right',
                        },
                    })
                    let newObj = {
                        ...response.data.data.userDetails,
                    };
                    localStorage.setItem("user_token", response.data.data.token);
                    localStorage.setItem("user", JSON.stringify(newObj));
                    setEmail("");
                    setPassword("");
                    login(response.data.data.userDetails);
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

    if (user) {
        return <Navigate to="/" replace />;
    }

    return (
        <AuthWrapper title="Login">
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
                            Login
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
                        <Box sx={{ marginTop: "20px" }}>
                            <TextInput
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                isPassword
                                type="icon" icon={<Lock sx={{
                                    color: primaryColor,
                                    marginRight: "10px",
                                }} />} className={classes.heroInput} placeholder="Password*" />
                        </Box>

                    </Box>
                    <Box
                        onClick={() => navigate("/resetPassword")}
                    >
                        <Typography variant="h2" sx={{ color: primaryColor, fontSize: "16px", cursor: "pointer" }}>
                            Forgot Password?
                        </Typography>


                    </Box>
                    <IconButton onClick={handleLogin} className={classes.heroBtn} width={"70%"}>
                        {
                            loading ? <CircularProgress size={30} sx={{
                                "& .MuiCircularProgress-svg": {
                                    color: "#fff"
                                }
                            }} /> : "Login"
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

export default Login