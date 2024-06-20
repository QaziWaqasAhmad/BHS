import { AccountBalance, Adb, Favorite, FavoriteBorder, LocationOn, Money } from "@mui/icons-material"
import { Box, Grid, Typography } from "@mui/material"
import { useEffect, useLayoutEffect } from "react"
import IconButton from "../../../../../components/IconButton"
import { headerColor, primaryBorderColor, primaryColor, textColor } from "../../../../../constants/Colors"
import { profile } from "../../../../../constants/Images"
import useStyles from "../../../../../styles"
import { getFavouriteJobsById, removeFavouriteJob,applyJob } from "../../../../../services/Jobs"
import { AppContext } from "../../../../../context"
import { useContext } from "react"
import { useState } from "react"
import { red } from "@mui/material/colors"
import { useSnackbar } from "notistack"
import { Navigate, useLocation } from "react-router-dom"
const Favourite = () => {
    const { user,selectedCoverLetter,selectedTemplate } = useContext(AppContext);
    const { enqueueSnackbar } = useSnackbar()
    const [favouriteJobs, setFavouriteJobs] = useState([])

    useEffect(() => {
        window.scrollTo({ top: 100, behavior: "smooth" })
    }, [])

    const classes = useStyles()

    // const favoriteJob = [
    //     {
    //         id: 1,
    //         jobTitle: "Trainee Web Designer, (Fresher)",
    //         company: "Google",
    //         salary: "12000",
    //         location: "Los Angeles, Calefornia",
    //         jobType: "Part Time"
    //     },
    //     {
    //         id: 2,
    //         jobTitle: "Software engineer, (Fresher)",
    //         company: "Google",
    //         salary: "20000",
    //         location: "Los Angeles, Calefornia",
    //         jobType: "Full Time"
    //     },
    // ]

    useLayoutEffect(() => {
        getFavouriteData()
    }, [])

    const getFavouriteData = async () => {
        try {
            const response = await getFavouriteJobsById(user._id)
            setFavouriteJobs(response.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    console.log(selectedCoverLetter,"selectedCoverLetterselectedCoverLetter");

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
    const handleRemoveFavourite = async (id) => {
        try {
            let payload = {
                userId: user._id,
                jobId: id
            }
            const response = await removeFavouriteJob(payload)
            if (response.data.status === "ok") {
                getFavouriteData()
                enqueueSnackbar(response.data.message,
                    {
                        variant: "success",
                        anchorOrigin: {
                            vertical: 'bottom',
                            horizontal: 'right',
                        }

                    })
            } else {
                enqueueSnackbar(response.data.message,
                    {
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
            console.log(error)
        }
    }


    return (
        <Box component="div">
            <Box component="div" sx={{
                background: primaryColor,
                padding: "20px"
            }}>
                <Typography variant="h1" sx={{ fontSize: "18px !important", fontWeight: "400 !important", color: headerColor }}>
                    {favouriteJobs.length} Favourite
                </Typography>
            </Box>
            {
                favouriteJobs.map((item) => {
                    return (
                        <Box component="div" sx={{
                            border: `1px solid ${primaryBorderColor}`,
                            padding: "25px",
                            marginTop: "20px"
                        }}>
                            <Grid container justifyContent="space-between" >
                                <Grid item xs={12} md={4}>
                                    <Box component="div" sx={{ display: "flex", alignItems: "center" }}>
                                        <Box component="div" sx={{ textAlign: "center" }}>
                                            <img src={profile} style={{ width: "80px" }} />
                                            <Typography variant="h3" sx={{ fontSize: "14px" }}>
                                                {item?.company}
                                            </Typography>
                                        </Box>
                                        <Box component="div">
                                            <Typography variant="h3" sx={{ fontSize: "18px !important", fontWeight: "400 !important" }}>
                                                {item?.jobTitle}
                                            </Typography>
                                            <Box component="div" sx={{ display: "flex", alignItems: "center", width: "20rem", gap: "10px", marginTop: "10px" }}>
                                                <Box component="div" sx={{ display: "flex", alignItems: "center" }}>
                                                    <AccountBalance sx={{ color: primaryColor }} />
                                                    <Typography variant="h3" sx={{ fontSize: "16px !important", fontWeight: "400 !important", color: textColor }}>
                                                        {item?.minSalary + " To " + item?.maxSalary}
                                                    </Typography>
                                                </Box>
                                                <Box component="div" sx={{ display: "flex", alignItems: "center" }}>
                                                    <LocationOn sx={{ color: primaryColor }} />
                                                    <Typography variant="h3" sx={{ fontSize: "16px !important", fontWeight: "400 !important", color: textColor }}>
                                                        {item?.fullAddress}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} md={3}  >
                                    <Box component="div" sx={{ display: "flex", }}>
                                        <Favorite onClick={() => handleRemoveFavourite(item._id)} sx={{ cursor: "pointer", color: red[500], fontSize: "30px", padding: "10px" }} />
                                        <Box component="div">
                                            <IconButton padding="10px" width="90px" height="40px" className={classes.heroBtn}>
                                                {item?.jobType}
                                            </IconButton>
                                            <IconButton disabled={item?.appliedCandidateIds.includes(user._id)} padding="10px" width="90px" height="40px" className={classes.heroBtn} onClick={()=>handleApplyJob(item?._id,item?.companyId)}>
                                                {
                                                    item?.appliedCandidateIds.includes(user._id) ? "Applied" : "Apply"
                                                }
                                            </IconButton>
                                        </Box>
                                    </Box>


                                </Grid>
                            </Grid>
                        </Box>
                    )
                })
            }

        </Box>
    )
}

export default Favourite