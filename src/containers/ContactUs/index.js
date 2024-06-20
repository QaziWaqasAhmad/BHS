import { ChatBubble, Email, Person } from "@mui/icons-material";
import { Box, Container, Grid, Typography, Icon, ListItemIcon, CircularProgress } from "@mui/material"
import TextInput from "../../components/TextInput";
import { priceColor, primaryColor, headerColor } from "../../constants/Colors"
import useStyles from "../../styles"
import { sendSupportMail } from "../../services/UserDashboard";
import { useSnackbar } from "notistack";
import IconButton from "../../components/IconButton";
import { useState } from "react";

const ContactUs = () => {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    const [loading, setLoading] = useState(false);
    const [inputValues, setInputValues] = useState({
        name: "",
        email: "",
        message: "",
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputValues({
            ...inputValues,
            [name]: value
        })
    }

    const contactInfo = [
        {
            id: 1,
            title: "Location",
            description: "Block 2, Gulshan-e-Iqbal",
            icon: "room",
        },
        {
            id: 2,
            title: "Email",
            description: "bhsjobportal@gmail.com",
            icon: "mail_outline",
        },
        {
            id: 3,
            title: "Contact Us",
            description: "0321-2451995",
            icon: "phone_enabled",
        }

    ]

    const handleSendMail = async () => {
        const { name, email, message } = inputValues;
        try {
            setLoading(true)
            if (name && email && message) {
                const response = await sendSupportMail({ name, email, message });
                if (response.status === 200) {
                    enqueueSnackbar("Mail sent successfully", {
                        variant: "success",
                    })
                    setLoading(false)
                    setInputValues({
                        name: "",
                        email: "",
                        message: "",
                    })
                } else {
                    enqueueSnackbar("Something went wrong", {
                        variant: "error",
                    })
                    setLoading(false)
                }
            } else {
                enqueueSnackbar("Please fill all fields", {
                    variant: "error",
                })
                setLoading(false)
            }
        } catch (error) {
            enqueueSnackbar("Something went wrong", {
                variant: "error",
            })
            setLoading(false)
        }

    }

    return (
        <Box component="div">
            <Box component="div" sx={{
                background: primaryColor,
                padding: "20px",
            }}>
                <Container >
                    <Typography variant="h1" className={classes.loginHeading}>
                        Contact
                    </Typography>
                </Container>

            </Box>
            <Container >
                <Box sx={{ marginTop: "40px" }} component="div">

                    <Box component="div" sx={{ textAlign: "center" }}>
                        <Typography variant="h1" className={classes.heroHeading} sx={{ fontSize: "40px !important" }}>
                            Contact With Us
                        </Typography>
                        <Typography variant="h2" className={classes.heroHeading} sx={{ fontSize: "17px !important", marginTop: "10px" }}>
                            Get in touch with us. Drop us a line or give us a call and we will get back to you as soon as possible!
                        </Typography>
                    </Box>
                    <Grid container marginTop={2} spacing={2}>
                        {
                            contactInfo.map((item) => {
                                return (
                                    <Grid item xs={12} md={4}>
                                        <Box component="div"
                                            sx={{
                                                textAlign: "center",
                                                padding: "20px 10px",
                                                background: "#fff",
                                                marginTop: "20px",
                                                border: "1px solid #e9ecef"
                                            }}>
                                            <Typography variant="h2" sx={{ fontSize: "30px !important", marginTop: "10px", color: primaryColor }} className={classes.heroHeading}>
                                                {item.title}
                                            </Typography>
                                            <Box component="div" sx={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "10px", background: primaryColor, padding: "60px" }}>
                                                <Icon sx={{ fontSize: "40px", color: headerColor, border: `2px solid ${headerColor}`, padding: "20px" }}>{item.icon}</Icon>
                                            </Box>
                                            <Typography variant="h2" sx={{ fontSize: "18px !important", marginTop: "40px" }} className={classes.heroSubHeading}>
                                                {item.description}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                )
                            })
                        }

                    </Grid>
                    <Grid container spacing={2} marginTop={2} justifyContent="center">
                        <Grid item xs={12} md={6}>
                            <Typography variant="h2" sx={{ fontSize: "40px !important", marginTop: "40px" }} className={classes.heroHeading}>
                                Get in touch
                            </Typography>
                            <Typography variant="h2" sx={{ fontSize: "16px !important", marginTop: "10px" }} className={classes.heroSubHeading}>
                                Drop us Message for any Query
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <Box sx={{ marginTop: "20px" }}>
                                        <TextInput
                                            value={inputValues.name}
                                            onChange={(e) => handleInputChange(e)}
                                            name="name"
                                            type="icon" icon={<Person sx={{
                                                color: primaryColor,
                                                marginRight: "10px",
                                            }} />} className={classes.heroInput} placeholder="Name*" />
                                    </Box>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Box sx={{ marginTop: "20px" }}>
                                        <TextInput
                                            value={inputValues.email}
                                            onChange={(e) => handleInputChange(e)}
                                            name="email"
                                            type="icon" icon={<Email sx={{
                                                color: primaryColor,
                                                marginRight: "10px",
                                            }} />} className={classes.heroInput} placeholder="Email Address*" />
                                    </Box>
                                </Grid>
                                <Grid item xs={12}>
                                    <Box sx={{ marginTop: "20px" }}>
                                        <TextInput
                                            value={inputValues.message}
                                            onChange={(e) => handleInputChange(e)}
                                            name="message"
                                            type="icon"
                                            sx={{
                                                "& .MuiInputBase-root": {
                                                    "& .MuiInputBase-input": {
                                                        padding: "20px"
                                                    }
                                                }
                                            }}
                                            icon={<ChatBubble sx={{
                                                color: primaryColor,
                                                marginRight: "10px",
                                            }} />} className={classes.heroInput} multiline placeholder="Message" />
                                    </Box>
                                    <Box component="div" sx={{ textAlign: "center" }}>
                                        <IconButton onClick={handleSendMail} className={classes.heroBtn} width={"70%"}>
                                            {
                                                loading ? <CircularProgress size={30} sx={{
                                                    "& .MuiCircularProgress-svg": {
                                                        color: "#fff"
                                                    }
                                                }} /> : "Submit"
                                            }
                                        </IconButton>
                                    </Box>

                                </Grid>
                            </Grid>

                        </Grid>
                    </Grid>
                </Box>

            </Container>

        </Box>
    )
}

export default ContactUs