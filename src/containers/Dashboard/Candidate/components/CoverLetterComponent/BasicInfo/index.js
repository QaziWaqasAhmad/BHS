import { AppRegistration, ContentPasteGo, Email, LocationOn, Phone } from "@mui/icons-material"
import { Box, Grid, Icon, Typography } from "@mui/material"
import { useState } from "react"
import { headerColor, primaryBorderColor, primaryColor, textSecondaryColor } from "../../../../../../constants/Colors"
import useStyles from "../../../../../../styles"
import BasicInfoModal from "../Components/BasicInfoModal"
import { updateCoverLetter, updateResume } from "../../../../../../services/UserDashboard"
import { useSnackbar } from "notistack"
import { useContext } from "react"
import { AppContext } from "../../../../../../context"
import { useLayoutEffect } from "react"

const BasicInfo = ({ resume, getUserResume }) => {
    const classes = useStyles()
    const { enqueueSnackbar } = useSnackbar()
    const { user } = useContext(AppContext)
    const [open, setOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [inputValues, setInputValues] = useState({
        jobDescription: "",
        email: "",
        phone: "",
        location: "",
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setInputValues({
            ...inputValues,
            [name]: value
        })
    }

    const handleUpdateBasicInfo = async () => {
        const { jobDescription, email, phone, location } = inputValues
        try {
            let payload = {
                jobDescription,
                email,
                phone,
                location
            }
            if (jobDescription == "") {
                enqueueSnackbar("Job description can't be empty", {
                    variant: "error", anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'right',
                    },
                })
            } else if (email == "") {
                enqueueSnackbar("Email can't be empty", {
                    variant: "error", anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'right',
                    },
                })
            } else if (location == "") {
                enqueueSnackbar("Location can't be empty", {
                    variant: "error", anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'right',
                    },
                })
            } else if (phone == "") {
                enqueueSnackbar("Phone can't be empty", {
                    variant: "error", anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'right',
                    },
                })
            } else {
                setIsLoading(true)
                const response = await updateCoverLetter(resume._id, payload)
                if (response.status === 200) {
                    setIsLoading(false)
                    setOpen(false)
                    enqueueSnackbar("Basic Info Updated Successfully",
                        {
                            variant: "success",
                            anchorOrigin: {
                                vertical: 'bottom',
                                horizontal: 'right',
                            }
                        })
                    getUserResume(user._id)
                } else {
                    setIsLoading(false)
                    enqueueSnackbar("Something went wrong",
                        {
                            variant: "error",
                            anchorOrigin: {
                                vertical: 'bottom',
                                horizontal: 'right',
                            }
                        })
                }
            }

        } catch (error) {
            setIsLoading(false)
            enqueueSnackbar("Something went wrong",
                {
                    variant: "error",
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'right',
                    }
                })
        }

    }

    useLayoutEffect(() => {
        setInputValues({
            jobDescription: resume?.jobDescription,
            email: resume?.email,
            phone: resume?.phone,
            location: resume?.location,
        })
    }, [resume])

    return (
        <Box component="div" sx={{
            border: `1px solid ${primaryBorderColor}`,
            marginTop: "30px"
        }}>
            <Box component="div" sx={{
                background: primaryColor,
                padding: "20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
            }}>
                <Typography variant="h1" sx={{ fontSize: "18px !important", fontWeight: "400 !important", color: headerColor }}>
                    Basic Information
                </Typography>
                <AppRegistration onClick={() => setOpen(true)} sx={{ color: headerColor, cursor: "pointer" }} />
            </Box>
            <Grid container p={2}>
                {
                    (resume?.jobDescription || resume?.email || resume?.phone || resume?.location) ? (
                        <>
                            {
                                resume?.jobDescription && (
                                    <Grid item xs={12} md={6}>
                                        <Box component="div" sx={{ display: "flex", gap: "10px", marginTop: "20px" }}>
                                            <ContentPasteGo sx={{ color: primaryColor }} />
                                            <Box component="div">
                                                <Typography variant="h3" sx={{ fontSize: "20px !important", fontWeight: "400 !important" }}>
                                                    Job Description
                                                </Typography>
                                                <Typography variant="h3" sx={{ fontSize: "15px !important", fontWeight: "400 !important", color: textSecondaryColor, marginTop: "5px" }}>
                                                    {
                                                        resume?.jobDescription
                                                    }
                                                </Typography>
                                            </Box>
                                        </Box>

                                    </Grid>
                                )
                            }

                            {
                                resume?.email && (
                                    <Grid item xs={12} md={6}>
                                        <Box component="div" sx={{ display: "flex", gap: "10px", marginTop: "20px" }}>
                                            <Email sx={{ color: primaryColor }} />
                                            <Box component="div">
                                                <Typography variant="h3" sx={{ fontSize: "20px !important", fontWeight: "400 !important" }}>
                                                    Email
                                                </Typography>
                                                <Typography variant="h3" sx={{ fontSize: "15px !important", fontWeight: "400 !important", color: textSecondaryColor, marginTop: "5px" }}>
                                                    {
                                                        resume?.email
                                                    }
                                                </Typography>
                                            </Box>
                                        </Box>

                                    </Grid>
                                )

                            }
                            {
                                resume?.location && (
                                    <Grid item xs={12} md={6}>
                                        <Box component="div" sx={{ display: "flex", gap: "10px", marginTop: "20px" }}>
                                            <LocationOn sx={{ color: primaryColor }} />
                                            <Box component="div">
                                                <Typography variant="h3" sx={{ fontSize: "20px !important", fontWeight: "400 !important" }}>
                                                    Location
                                                </Typography>
                                                <Typography variant="h3" sx={{ fontSize: "15px !important", fontWeight: "400 !important", color: textSecondaryColor, marginTop: "5px" }}>
                                                    {
                                                        resume.location
                                                    }
                                                </Typography>
                                            </Box>
                                        </Box>

                                    </Grid>
                                )
                            }

                            {
                                resume?.phone && (
                                    <Grid item xs={12} md={6}>
                                        <Box component="div" sx={{ display: "flex", gap: "10px", marginTop: "20px" }}>
                                            <Phone sx={{ color: primaryColor }} />
                                            <Box component="div">
                                                <Typography variant="h3" sx={{ fontSize: "20px !important", fontWeight: "400 !important" }}>
                                                    Phone
                                                </Typography>
                                                <Typography variant="h3" sx={{ fontSize: "15px !important", fontWeight: "400 !important", color: textSecondaryColor, marginTop: "5px" }}>
                                                    {
                                                        resume?.phone
                                                    }
                                                </Typography>
                                            </Box>
                                        </Box>

                                    </Grid>
                                )
                            }
                        </>
                    )
                        :
                        (
                            <Grid item xs={12}>
                                <Box component="div" sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    <Typography variant="h3" sx={{ fontSize: "20px !important", fontWeight: "400 !important", color: textSecondaryColor }}>
                                        No Basic Info Found
                                    </Typography>
                                </Box>
                            </Grid>
                        )
                }




            </Grid>

            <BasicInfoModal open={open} setOpen={setOpen} handleUpdateBasicInfo={handleUpdateBasicInfo} isLoading={isLoading} inputValues={inputValues} handleChange={handleChange} />
        </Box>
    )
}

export default BasicInfo