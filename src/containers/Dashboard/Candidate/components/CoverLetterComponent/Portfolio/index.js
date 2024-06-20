import { AppRegistration } from "@mui/icons-material"
import { Box, Checkbox, Grid, Icon, Typography } from "@mui/material"
import { pink } from "@mui/material/colors"
import { headerColor, primaryBorderColor, primaryColor, textSecondaryColor } from "../../../../../../constants/Colors"
import useStyles from "../../../../../../styles"
import { useSnackbar } from "notistack"
import { updateResume } from "../../../../../../services/UserDashboard"
import { useState } from "react"
import PortfolioModal from "../Components/PortfolioModal"
import { useLayoutEffect } from "react"
import { AppContext } from "../../../../../../context"
import { useContext } from "react"

const Portfolio = ({ specialQualification, resume, getUserResume }) => {
    const classes = useStyles()
    const { enqueueSnackbar } = useSnackbar()
    const [open, setOpen] = useState(false)
    const { user } = useContext(AppContext)
    const [isLoading, setIsLoading] = useState(false)
    const [inputValues, setInputValues] = useState([{
        title: "",
        link: ""
    }])

    const handleChange = (e, index) => {
        const { name, value } = e.target
        const list = [...inputValues]
        list[index][name] = value
        setInputValues(list)
    }

    const handleAddClick = () => {
        let titleEmpty = inputValues?.some((item) => item.title == "")
        let linkEmpty = inputValues?.some((item) => item.link == "")
        if (titleEmpty) {
            enqueueSnackbar("Title can't be empty", {
                variant: "error", anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'right',
                },
            })
        } else if (linkEmpty) {
            enqueueSnackbar("Link can't be empty", {
                variant: "error", anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'right',
                },
            })
        } else {
            setInputValues([...inputValues, {
                title: "",
                link: ""
            }])
        }

    }

    const handleRemoveClick = (index) => {
        const list = [...inputValues]
        list.splice(index, 1)
        setInputValues(list)
    }

    const handleUpdateSkills = async () => {
        if (inputValues.length <= 0) {
            enqueueSnackbar("Atleast 1 portfolio link is required", {
                variant: "error", anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'right',
                },
            })
        } else {
            try {
                let payload = {
                    portFolio: inputValues
                }
                setIsLoading(true)
                const response = await updateResume(resume._id, payload)
                if (response.status === 200) {
                    setIsLoading(false)
                    setOpen(false)
                    enqueueSnackbar("Skills Updated Successfully",
                        {
                            variant: "success",
                            anchorOrigin: {
                                vertical: 'bottom',
                                horizontal: 'right',
                            }
                        })
                    getUserResume(user._id)
                    setInputValues([{
                        title: "",
                        link: ""
                    }])
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
        if (resume?.portFolio?.length > 0) {
            setInputValues(resume?.portFolio)
        }
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
                    Portfolio
                </Typography>
                <AppRegistration onClick={() => setOpen(true)} sx={{ color: headerColor, cursor: "pointer" }} />
            </Box>
            <Box component="div" p={2}>
                {
                    resume?.portFolio?.length > 0 ?
                        resume?.portFolio?.map((item) => {
                            return (
                                <Box component="div" sx={{ display: "flex", gap: "10px", marginTop: "30px" }}>
                                    <Icon sx={{ color: primaryColor }}>link</Icon>
                                    <Box component="div">
                                        <Typography variant="h3" sx={{ fontSize: "20px !important", fontWeight: "400 !important" }}>
                                            {
                                                item.title
                                            }
                                        </Typography>
                                        <a style={{
                                            fontSize: "15px !important", fontWeight: "400 !important", color: textSecondaryColor
                                        }}
                                            href={item.link}
                                            target="_blank"
                                        >{item.link}</a>

                                    </Box>
                                </Box>
                            )
                        })
                        :
                        <Box component="div" sx={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "20px" }}>
                            <Typography variant="h3" sx={{ fontSize: "20px !important", fontWeight: "400 !important", color: textSecondaryColor }}>
                                No Portfolio Info Found
                            </Typography>
                        </Box>
                }
            </Box>
            <PortfolioModal
                open={open}
                setOpen={setOpen}
                isLoading={isLoading}
                inputValues={inputValues}
                handleChange={handleChange}
                handleAddClick={handleAddClick}
                handleRemoveClick={handleRemoveClick}
                handleUpdateSkills={handleUpdateSkills}
            />
        </Box>
    )
}

export default Portfolio