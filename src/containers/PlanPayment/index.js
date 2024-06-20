import { CameraAlt } from "@mui/icons-material"
import { Box, CircularProgress, Container, Grid, Typography } from "@mui/material"
import axios from "axios"
import { useState } from "react"
import { useRef } from "react"
import { useContext } from "react"
import { Navigate } from "react-router-dom"
import IconButton from "../../components/IconButton"
import Loader from "../../components/Loader"
import { priceColor, primaryColor } from "../../constants/Colors"
import { AppContext } from "../../context"
import useStyles from "../../styles"
import { useLocation } from "react-router-dom"
import { buyPlan } from "../../services/Plans"
import { useSnackbar } from "notistack"
import { useNavigate } from "react-router-dom"

const PlanPayment = () => {
    const location = useLocation();
    const navigate = useNavigate()
    const { enqueueSnackbar } = useSnackbar()
    let { plan } = location?.state
    const classes = useStyles()
    const { user } = useContext(AppContext)
    const [loading, setIsLoading] = useState(false)
    const [isLoadingImage, setIsLoadingImage] = useState(false);
    const [image, setImage] = useState("");
    const imageRef = useRef(null);


    if (!user) {
        return <Navigate to="/login" replace />;
    }

    const handleImage = async (e) => {
        setIsLoadingImage(true);
        const form = new FormData();
        form.append("image", e.target.files[0]);
        try {
            let res = await axios.post("https://amberstore.pk/upload.php", form);
            if (res) {
                setIsLoadingImage(false);
                setImage(res.data.url);
            }
        } catch (error) {
            setIsLoadingImage(false);
        }
    };

    const handleSubmitProof = async () => {
        if (!image) {
            enqueueSnackbar("Please upload proof", {
                variant: "error", anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'right',
                },
            })
        } else {
            setIsLoading(true)
            try {
                let payload = {
                    organizationId: user._id,
                    image: image,
                    purchasedPlan: plan?.title
                }
                let response = await buyPlan(payload)
                if (response.data.status === "ok") {
                    enqueueSnackbar(response?.data?.message, {
                        variant: "success",
                        anchorOrigin: {
                            vertical: "bottom",
                            horizontal: "right",
                        },
                    });
                    setIsLoading(false)
                    setImage(null)
                    navigate("/dashboard")
                } else {
                    enqueueSnackbar(response?.data?.message, {
                        variant: "error",
                        anchorOrigin: {
                            vertical: "bottom",
                            horizontal: "right",
                        },
                    });
                    setIsLoading(false)
                }

            } catch (error) {
                setIsLoading(false)
                enqueueSnackbar(error?.message, {
                    variant: "error",
                    anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "right",
                    },
                });
            }
        }

    }


    return (
        <>
            <Loader isloading={isLoadingImage} />
            <Box>
                <Box
                    component="div"
                    sx={{
                        background: primaryColor,
                        padding: "20px",
                    }}
                >
                    <Container>
                        <Typography variant="h1" className={classes.loginHeading}>
                            Plan Checkout
                        </Typography>
                    </Container>
                </Box>
                <Container>
                    <Box component="div" mt={4}>
                        <Typography variant="h1" className={classes.loginFormHeading}>
                            Pay with your bank account
                        </Typography>
                        <Typography variant="h3" sx={{
                            fontSize: "18px !important",
                            marginTop: "10px"
                        }} className={classes.loginFormHeading}>
                            Account title: <span style={{ color: priceColor }}>BHS</span>
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: "18px !important",
                                marginTop: "5px"

                            }}
                            variant="h3" className={classes.loginFormHeading}>
                            Account number: <span style={{ color: priceColor }}>3325556178546</span>
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: "18px !important",
                                marginTop: "5px"
                            }}
                            variant="h3" className={classes.loginFormHeading}>
                            Bank name: <span style={{ color: priceColor }}>Bank AlHabib</span>
                        </Typography>
                    </Box>
                    <Box component="div" mt={2}>
                        <Typography variant="h3" sx={{
                            fontSize: "18px !important",
                            fontWeight: "bold !important",
                        }}>
                            Your plan will be activated within 24 hours
                        </Typography>

                        <Box component="div" sx={{
                            marginTop: "20px",
                            marginLeft: "20px",
                        }}>
                            <Typography variant="h3" sx={{
                                fontSize: "18px !important",
                                fontWeight: "bold !important",
                            }}>
                                Plan Details
                            </Typography>
                            <Typography variant="h3" sx={{
                                fontSize: "18px !important",
                                marginTop: "5px"

                            }}>
                                Plan Name: <span style={{ color: priceColor }}>{plan?.title}</span>
                            </Typography>
                            <Typography variant="h3" sx={{
                                fontSize: "18px !important",
                                marginTop: "10px"
                            }}>
                                Plan Price: <span style={{ color: priceColor }}>{plan?.price}</span>
                            </Typography>
                            <Typography variant="h3" sx={{
                                fontSize: "18px !important",
                                marginTop: "10px"
                            }}>
                                Plan Duration: <span style={{ color: priceColor }}>{plan?.duration} Days</span>
                            </Typography>

                        </Box>
                        <Typography variant="h3" sx={{
                            fontSize: "18px !important",
                            fontWeight: "bold !important",
                            marginTop: "20px"
                        }} className={classes.loginFormHeading}>
                            Please upload screenshot of your payment
                        </Typography>
                        <Grid container spacing={2} >
                            <Grid item xs={12} md={6}>

                                <Box sx={{
                                    display: "flex",
                                    alignItems: "center",
                                }} component="div">

                                    <Box component="div" mt={2}
                                        sx={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            border: "1px dashed #000",
                                            width: "100%",
                                            height: "300px",
                                            cursor: "pointer",
                                        }}
                                        onClick={() => imageRef.current.click()}
                                    >
                                        {
                                            image ? (
                                                <img src={image} style={{
                                                    width: "100%",
                                                    height: "100%",
                                                }} />
                                            )
                                                : (
                                                    <CameraAlt sx={{ fontSize: "50px" }} />
                                                )
                                        }

                                    </Box>
                                    <Box component="div" sx={{
                                        marginLeft: "20px",
                                    }}>
                                        <IconButton
                                            onClick={handleSubmitProof}
                                            className={classes.heroBtn}>
                                            {
                                                loading ? <CircularProgress size={30} sx={{
                                                    "& .MuiCircularProgress-svg": {
                                                        color: "#fff"
                                                    }
                                                }} /> : "Submit"
                                            }

                                        </IconButton>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>


                    </Box>
                </Container>

            </Box>
            <input
                accept="image/png, image/gif, image/jpeg"
                type="file"
                ref={imageRef}
                style={{ visibility: "hidden", height: "0" }}
                onChange={handleImage}
            />
        </>

    )
}

export default PlanPayment