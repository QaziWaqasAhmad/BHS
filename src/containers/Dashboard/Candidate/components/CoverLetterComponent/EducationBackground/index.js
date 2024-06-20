import { AppRegistration } from "@mui/icons-material"
import { Box, Grid, Icon, Typography } from "@mui/material"
import { useState } from "react"
import { headerColor, primaryBorderColor, primaryColor, textSecondaryColor } from "../../../../../../constants/Colors"
import { updateResume } from "../../../../../../services/UserDashboard"
import useStyles from "../../../../../../styles"
import EducationModal from "../Components/EducationModal"
import { useSnackbar } from "notistack"
import moment from "moment/moment"
import { useLayoutEffect } from "react"
import { useContext } from "react"
import { AppContext } from "../../../../../../context"

const EducationBackground = ({ resume, getUserResume }) => {
    const classes = useStyles()
    const { enqueueSnackbar } = useSnackbar()
    const { user } = useContext(AppContext)
    const [open, setOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const [inputValues, setInputValues] = useState([{
        title: "",
        description: "",
        startYear: new Date(),
        endYear: new Date(),
        institute: "",
    }])

    const handleChange = (e, index, dateName) => {
        if (dateName === "startYear" || dateName === "endYear") {
            const list = [...inputValues]
            list[index][dateName] = e
            setInputValues(list)
        } else {
            const { name, value } = e.target
            const list = [...inputValues]
            list[index][name] = value
            setInputValues(list)
        }
    }

    const handleAddClick = () => {
        let titleEmpty = inputValues?.some((item) => item.title == "")
        let descriptionEmpty = inputValues?.some((item) => item.description == "")
        let instituteEmpty = inputValues?.some((item) => item.institute == "")
        if (titleEmpty) {
            enqueueSnackbar("Title can't be empty", {
                variant: "error", anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'right',
                },
            })
        } else if (instituteEmpty) {
            enqueueSnackbar("Institute can't be empty", {
                variant: "error", anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'right',
                },
            })
        } else if (descriptionEmpty) {
            enqueueSnackbar("Description can't be empty", {
                variant: "error", anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'right',
                },
            })
        } else {
            setInputValues([...inputValues, {
                title: "",
                description: "",
                startYear: new Date(),
                endYear: new Date(),
                institute: "",
            }])
        }

    }

    const handleRemoveClick = (index) => {
        const list = [...inputValues]
        list.splice(index, 1)
        setInputValues(list)
    }

    const handleUpdateEducation = async () => {
        if (inputValues.length <= 0) {
            enqueueSnackbar("Atleast 1 education is required", {
                variant: "error", anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'right',
                },
            })
        } else {
            try {
                let payload = {
                    education: inputValues
                }
                setIsLoading(true)
                const response = await updateResume(resume._id, payload)
                if (response.status === 200) {
                    setIsLoading(false)
                    setOpen(false)
                    enqueueSnackbar("Education Background Updated Successfully",
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
                        description: "",
                        startYear: new Date(),
                        endYear: new Date(),
                        institute: "",
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
        if (resume?.education?.length > 0) {
            let temp = []
            resume?.education?.map((item) => {
                temp.push({
                    title: item.title,
                    description: item.description,
                    startYear: new Date(item.startYear),
                    endYear: new Date(item.endYear),
                    institute: item.institute,
                })
            })
            setInputValues(temp)
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
                    Education Background
                </Typography>
                <AppRegistration onClick={() => setOpen(true)} sx={{ color: headerColor, cursor: "pointer" }} />
            </Box>
            <Box component="div" p={2}>
                {
                    resume?.education?.length > 0 ?
                        resume?.education?.map((item) => {
                            return (
                                <Box component="div" sx={{ display: "flex", gap: "10px", marginTop: "30px" }}>
                                    <Icon sx={{ color: primaryColor }}>school</Icon>
                                    <Box component="div">
                                        <Typography variant="h3" sx={{ fontSize: "15px !important", fontWeight: "400 !important", color: textSecondaryColor }}>
                                            {`${moment(item.startYear).format("YYYY")} - ${moment(item.endYear).format("YYYY")}`}
                                        </Typography>
                                        <Typography variant="h3" sx={{ fontSize: "20px !important", fontWeight: "400 !important" }}>
                                            {item.title} at <span style={{ color: primaryColor }}>{item.institute}</span>
                                        </Typography>
                                    </Box>
                                </Box>
                            )
                        })
                        :
                        <Box component="div" sx={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "20px" }}>
                            <Typography variant="h3" sx={{ fontSize: "20px !important", fontWeight: "400 !important", color: textSecondaryColor }}>
                                No Education Info Found
                            </Typography>
                        </Box>
                }
            </Box>

            <EducationModal
                open={open}
                setOpen={setOpen}
                isLoading={isLoading}
                inputValues={inputValues}
                handleChange={handleChange}
                handleAddClick={handleAddClick}
                handleRemoveClick={handleRemoveClick}
                handleUpdateEducation={handleUpdateEducation}
            />
        </Box>
    )
}

export default EducationBackground