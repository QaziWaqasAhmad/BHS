import { Flag, LocationCity, LocationOn, Lock, Search } from "@mui/icons-material"
import { Box, Container, Grid, Typography } from "@mui/material"
import { fontSize } from "@mui/system"
import IconButton from "../../components/IconButton"
import JobsCard from "../../components/JobsCard"
import TextInput from "../../components/TextInput"
import { headerColor, priceColor, primaryColor, textColor } from "../../constants/Colors"
import useStyles from "../../styles"
import { getJobs, addFavouriteJob, removeFavouriteJob, applyJob } from "../../services/Jobs"
import { useContext, useLayoutEffect } from "react"
import { useState } from "react"
import { AppContext } from "../../context"
import { useSnackbar } from "notistack"
import { Navigate, useLocation } from "react-router-dom"
const FindAJob = () => {
    const { user,selectedCoverLetter,selectedTemplate } = useContext(AppContext);

    const classes = useStyles()
    const location = useLocation()
    let searchValue = location?.state?.searchValue

    const [jobsData, setJobsData] = useState([]);
    const [search, setSearch] = useState({
        jobTitle: "",
        location: "",
    }); 

    const handleChange = (e) => {
        setSearch({
            ...search,
            [e.target.name]: e.target.value
        })
    }

    const { enqueueSnackbar } = useSnackbar()


    useLayoutEffect(() => {
        getJobsData(
            searchValue?.keyword ? searchValue?.keyword : "",
            searchValue?.location ? searchValue?.location : "",
            searchValue?.experience ? searchValue?.experience : "",
            searchValue?.jobDescription ? searchValue?.jobDescription : ""
        )
    }, [])


    const getJobsData = async (jobTitle, location, experience, jobDescripion) => {
        try {
            const response = await getJobs(jobTitle, location, experience, jobDescripion)
            setJobsData(response.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleSearch = async () => {
        const { jobTitle, location } = search
        try {
            const response = await getJobs(jobTitle, location)
            setJobsData(response.data.data)
        } catch (error) {
            console.log(error)
        }

    }

    const handleAddFavourite = async (jobId) => {
        if (!user) {
            enqueueSnackbar("Please Login First", {
                variant: "error",
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'right',
                }
            })
            return <Navigate to="/login" />
        } else {
            try {
                let payload = {
                    jobId: jobId,
                    userId: user?._id
                }
                const response = await addFavouriteJob(payload)
                if (response.data.status === "ok") {
                    enqueueSnackbar(response.data.message, {
                        variant: "success",
                        anchorOrigin: {
                            vertical: 'bottom',
                            horizontal: 'right',
                        }
                    })
                    getJobsData(
                        searchValue?.keyword ? searchValue?.keyword : "",
                        searchValue?.location ? searchValue?.location : "",
                        searchValue?.experience ? searchValue?.experience : "",
                        searchValue?.jobDescription ? searchValue?.jobDescription : ""
                    )
                } else {
                    enqueueSnackbar(response.data.message, {
                        variant: "error",
                        anchorOrigin: {
                            vertical: 'bottom',
                            horizontal: 'right',
                        }
                    })
                }
            } catch (error) {
                enqueueSnackbar(error.message, {
                    variant: "error",
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'right',
                    }
                })

            }
        }

    }

    const handleRemoveFavourite = async (jobId) => {
        if (!user) {
            enqueueSnackbar("Please Login First", {
                variant: "error",
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'right',
                }
            })
            return <Navigate to="/login" />
        } else {
            try {
                let payload = {
                    jobId: jobId,
                    userId: user?._id
                }
                const response = await removeFavouriteJob(payload)
                if (response.data.status === "ok") {
                    enqueueSnackbar(response.data.message, {
                        variant: "success",
                        anchorOrigin: {
                            vertical: 'bottom',
                            horizontal: 'right',
                        }
                    })
                    getJobsData(
                        searchValue?.keyword ? searchValue?.keyword : "",
                        searchValue?.location ? searchValue?.location : "",
                        searchValue?.experience ? searchValue?.experience : "",
                        searchValue?.jobDescription ? searchValue?.jobDescription : ""
                    )
                } else {
                    enqueueSnackbar(response.data.message, {
                        variant: "error",
                        anchorOrigin: {
                            vertical: 'bottom',
                            horizontal: 'right',
                        }
                    })
                }
            } catch (error) {
                enqueueSnackbar(error.message, {
                    variant: "error",
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'right',
                    }
                })

            }
        }

    }

    const handleApplyJob = async (jobId, companyId) => {
        if (!user) {
            enqueueSnackbar("Please Login First", {
                variant: "error",
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'right',
                }
            })
            return <Navigate to="/login" replace />
        } else if (user && user.role === "Organization") {
            enqueueSnackbar("organization can not apply for jobs", {
                variant: "error",
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'right',
                }
            })
        }else {
            try {
                if (selectedCoverLetter && selectedTemplate) {
                    let payload = {
                        jobId: jobId,
                        userId: user?._id,
                        companyId: companyId
                    }
                    const response = await applyJob(payload)
                    if (response.data.status === "ok") {
                        enqueueSnackbar(response.data.message, {
                            variant: "success",
                            anchorOrigin: {
                                vertical: 'bottom',
                                horizontal: 'right',
                            }
                        })
                        getJobsData(
                            searchValue?.keyword ? searchValue?.keyword : "",
                            searchValue?.location ? searchValue?.location : "",
                            searchValue?.experience ? searchValue?.experience : "",
                            searchValue?.jobDescription ? searchValue?.jobDescription : ""
                        )
                    } else {
                        enqueueSnackbar(response.data.message, {
                            variant: "error",
                            anchorOrigin: {
                                vertical: 'bottom',
                                horizontal: 'right',
                            }
                        })
                    }
                }else{
                    enqueueSnackbar("Please Select Resume & Cover Letter Template First", {
                        variant: "error",
                        anchorOrigin: {
                            vertical: 'bottom',
                            horizontal: 'right',
                        }
                    })
                }
                
            } catch (error) {
                enqueueSnackbar(error.message, {
                    variant: "error",
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'right',
                    }
                })

            }
        }

    }

    return (
        <Box component="div">
            <Box component="div" sx={{
                background: primaryColor,
                padding: "20px",
            }}>
                <Container maxWidth="xl">
                    <Typography variant="h1" className={classes.loginHeading}>
                        Jobs
                    </Typography>
                </Container>
            </Box>
            <Container maxWidth="xl">

                <Grid container marginTop={3} spacing={2} alignItems="center">
                    <Grid item xs={12} md={4}>
                        <TextInput
                            value={search.jobTitle}
                            onChange={(e) => handleChange(e)}
                            name="jobTitle"
                            sx={{ marginTop: "10px" }} type="icon" startIcon
                            startIconContent={<Typography sx={{ fontSize: "14px", margin: "0px 10px", fontWeight: "600 !important" }} variant="h2" className={classes.heroSubHeading}>What</Typography>}
                            icon={<Search sx={{
                                color: textColor,
                                marginRight: "10px",
                            }} />} className={classes.heroInput} placeholder="Job title, keywords, or company" />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TextInput
                            value={search.location}
                            onChange={(e) => handleChange(e)}
                            name="location"
                            sx={{ marginTop: "10px" }} type="icon" startIcon
                            startIconContent={<Typography sx={{ fontSize: "14px", margin: "0px 10px", fontWeight: "600 !important" }} variant="h2" className={classes.heroSubHeading}>Where</Typography>}
                            icon={<LocationOn sx={{
                                color: textColor,
                                marginRight: "10px",
                            }} />} className={classes.heroInput} placeholder="Location" />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <IconButton
                            onClick={handleSearch}
                            className={classes.heroBtn} width={"40%"}>
                            Find Jobs
                        </IconButton>
                    </Grid>
                </Grid>
                <Box component="div" sx={{ textAlign: "center", marginTop: "30px" }}>
                    <Typography
                        sx={{
                            fontSize: "35px !important",
                            fontWeight: "600 !important",
                            borderBottom: "5px solid",
                            borderColor: primaryColor,
                            width: "16%",
                            paddingBottom: "18px",
                            margin: "0 auto"
                        }}
                        variant="h1" className={classes.heroHeading}>
                        Job Feed
                    </Typography>
                </Box>
                <Box sx={{ marginTop: "30px" }}>
                    <JobsCard job={jobsData} handleAddFavourite={handleAddFavourite} handleRemoveFavourite={handleRemoveFavourite} handleApplyJob={handleApplyJob} />
                </Box>
            </Container>
        </Box>
    )
}

export default FindAJob