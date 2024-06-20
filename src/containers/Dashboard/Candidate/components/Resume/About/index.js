import { AppRegistration } from "@mui/icons-material"
import { Box, Grid, Icon, Typography } from "@mui/material"
import { useState } from "react"
import { headerColor, primaryBorderColor, primaryColor, textSecondaryColor } from "../../../../../../constants/Colors"
import useStyles from "../../../../../../styles"
import AboutModal from "../Components/AboutModal"
import { updateResume } from "../../../../../../services/UserDashboard"
import { useSnackbar } from "notistack"
import { useLayoutEffect } from "react"
import { AppContext } from "../../../../../../context"
import { useContext } from "react"

const About = ({ resume, getUserResume }) => {

    const classes = useStyles()
    const { enqueueSnackbar } = useSnackbar()
    const { user } = useContext(AppContext)
    const [open, setOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [inputValues, setInputValues] = useState({
        about: "",
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setInputValues({
            ...inputValues,
            [name]: value
        })
    }

    const handleUpdateAbout = async () => {
        const { about } = inputValues
        if (about == "") {
            enqueueSnackbar("About can't be empty", {
                variant: "error", anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'right',
                },
            })
        } else {
            try {
                let payload = {
                    about
                }
                setIsLoading(true)
                const response = await updateResume(resume._id, payload)
                if (response.status === 200) {
                    setIsLoading(false)
                    setOpen(false)
                    enqueueSnackbar("About Updated Successfully",
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

    }

    useLayoutEffect(() => {
        setInputValues({
            about: resume?.about
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
                    About
                </Typography>
                <AppRegistration onClick={() => setOpen(true)} sx={{ color: headerColor, cursor: "pointer" }} />
            </Box>
            {
                resume?.about ?
                    <Box component="div" p={2}>
                        <Typography variant="h3" sx={{ fontSize: "15px !important", fontWeight: "400 !important", color: textSecondaryColor, marginTop: "5px" }}>
                            {resume?.about}
                        </Typography>
                    </Box>
                    :
                    <Box component="div" sx={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "20px" }}>
                        <Typography variant="h3" sx={{ fontSize: "20px !important", fontWeight: "400 !important", color: textSecondaryColor }}>
                            No About Info Found
                        </Typography>
                    </Box>
            }

            <AboutModal
                open={open}
                setOpen={setOpen}
                handleUpdateAbout={handleUpdateAbout}
                isLoading={isLoading}
                inputValues={inputValues}
                handleChange={handleChange}
            />
        </Box>
    )
}

export default About