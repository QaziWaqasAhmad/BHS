import { Adb, Android, Email, Info, LocationOn, Person, Save, Work } from "@mui/icons-material"
import { Box, Grid, Typography } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import IconButton from "../../../../../components/IconButton"
import { headerColor, primaryBorderColor, primaryColor, textColor, textSecondaryColor } from "../../../../../constants/Colors"
import { profile } from "../../../../../constants/Images"
import { AppContext } from "../../../../../context"
import useStyles from "../../../../../styles"
import { getTotalPostedJob } from "../../../../../services/Jobs"

const CompanyDashboard = () => {
    const { user } = useContext(AppContext)
    const [jobPosted,setJobposted]=useState({})
    useEffect(() => {
        window.scrollTo({ top: 100, behavior: "smooth" })
        handleGetPostedJobs();
    }, [])

    const handleGetPostedJobs=async()=>{
     const response=await getTotalPostedJob(user?._id)
     if (response?.status==200) {
        setJobposted(response?.data?.data)
     }    
    }

    console.log(jobPosted,"jobPostedjobPostedjobPostedjobPosted");
    const classes = useStyles()
    return (
        <Box component="div">
            <Box component="div" sx={{
                border: `1px solid ${primaryBorderColor}`,
                padding: "25px"
            }}>
                <Grid container justifyContent="space-between"  sx={{width:"100%"}}>
                    <Grid item xs={12} md={4}>
                        <Box component="div" sx={{ display: "flex", alignItems: "center" }}>
                            <img src={user?.userImage} style={{ width: "40%", height: "100px" }} />
                            <Box component="div" ml="10px">
                                <Typography variant="h1" sx={{ fontSize: "22px !important", fontWeight: "400 !important" }}>
                                    {
                                        user?.name
                                    }
                                </Typography>
                                <Box component="div" sx={{ display: "flex", alignItems: "center", width: "20rem", gap: "10px", marginTop: "10px" }}>
                                    <Box component="div" sx={{ display: "flex", alignItems: "center" }}>
                                        {
                                            user?.jobDescription && (
                                                <>
                                                    <Adb sx={{ color: primaryColor }} />
                                                    <Typography variant="h3" sx={{ fontSize: "16px !important", fontWeight: "400 !important", color: textColor }}>
                                                        {
                                                            user?.jobDescription
                                                        }
                                                    </Typography>
                                                </>
                                            )
                                        }
                                    </Box>
                                    <Box component="div" sx={{ display: "flex", alignItems: "center" }}>
                                        {
                                            user?.address && (
                                                <>
                                                    <LocationOn sx={{ color: primaryColor }} />
                                                    <Typography variant="h3" sx={{ fontSize: "16px !important", fontWeight: "400 !important", color: textColor }}>
                                                        {
                                                            user?.address
                                                        }
                                                    </Typography>
                                                </>
                                            )
                                        }
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                    {/* <Grid item xs={12} md={3}>
                        <IconButton sx={{ height: "20px !important" }} className={classes.heroBtn}>
                            View Profile
                        </IconButton>
                    </Grid> */}
                </Grid>
            </Box>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Box component="div" sx={{
                        border: `1px solid ${primaryBorderColor}`,
                        marginTop: "30px"
                    }}>
                        <Box component="div" sx={{
                            background: primaryColor,
                            padding: "20px"
                        }}>
                            <Typography variant="h1" sx={{ fontSize: "18px !important", fontWeight: "400 !important", color: headerColor }}>
                                Company Information
                            </Typography>
                        </Box>

                        <Box component="div" sx={{ padding: "30px" }}>
                            {
                                (user?.city && user?.country) && (
                                    <Box component="div" sx={{ display: "flex", gap: "10px", marginTop: "20px" }}>
                                        <LocationOn sx={{ color: primaryColor }} />
                                        <Box component="div">
                                            <Typography variant="h3" sx={{ fontSize: "20px !important", fontWeight: "400 !important" }}>
                                                Location
                                            </Typography>
                                            <Typography variant="h3" sx={{ fontSize: "15px !important", fontWeight: "400 !important", color: primaryColor, marginTop: "5px" }}>
                                                {
                                                    `${user?.city}, ${user?.country}`
                                                }
                                            </Typography>
                                        </Box>
                                    </Box>
                                )
                            }

                            <Box component="div" sx={{ display: "flex", gap: "10px", marginTop: (user?.city && user?.country) ? "40px" : "0px" }}>
                                <Info sx={{ color: primaryColor }} />
                                <Box component="div">
                                    <Typography variant="h3" sx={{ fontSize: "20px !important", fontWeight: "400 !important" }}>
                                        Phone
                                    </Typography>
                                    <Typography variant="h3" sx={{ fontSize: "15px !important", fontWeight: "400 !important", color: primaryColor, marginTop: "5px" }}>
                                        {user?.phoneNumber}
                                    </Typography>
                                </Box>
                            </Box>
                            <Box component="div" sx={{ display: "flex", gap: "10px", marginTop: "40px" }}>
                                <Email sx={{ color: primaryColor }} />
                                <Box component="div">
                                    <Typography variant="h3" sx={{ fontSize: "20px !important", fontWeight: "400 !important" }}>
                                        Email:
                                    </Typography>
                                    <Typography variant="h3" sx={{ fontSize: "15px !important", fontWeight: "400 !important", color: primaryColor, marginTop: "5px" }}>
                                        {user?.email}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box component="div" sx={{ display: "flex", border: `1px solid ${primaryBorderColor}`, marginTop: "30px" }}>
                        <Box component="div" sx={{ padding: "20px", background: "#ff9500" }}>
                            <Work sx={{ color: headerColor }} />
                        </Box>
                        <Box component="div" sx={{ padding: "15px 0px 0px 20px" }}>
                            <Typography variant="h1" sx={{ fontSize: "18px !important", fontWeight: "600 !important" }}>
                            {jobPosted?.totalJobs ?jobPosted?.totalJobs : 0 }
                            </Typography>
                            <Typography variant="h3" sx={{ fontSize: "15px !important", fontWeight: "400 !important", color: textColor, marginTop: "5px" }}>
                                Job Posted
                            </Typography>
                        </Box>
                    </Box>
                    <Box component="div" sx={{ display: "flex", border: `1px solid ${primaryBorderColor}`, marginTop: "30px" }}>
                        <Box component="div" sx={{ padding: "20px", background: "#76c80e" }}>
                            <Save sx={{ color: headerColor }} />
                        </Box>
                        <Box component="div" sx={{ padding: "15px 0px 0px 20px" }}>
                            <Typography variant="h1" sx={{ fontSize: "18px !important", fontWeight: "600 !important" }}>
                                {jobPosted?.totalApplicants ?jobPosted?.totalApplicants : 0 }
                            </Typography>
                            <Typography variant="h3" sx={{ fontSize: "15px !important", fontWeight: "400 !important", color: textColor, marginTop: "5px" }}>
                                Total Applications
                            </Typography>
                        </Box>
                    </Box>
                    {/* <Box component="div" sx={{ display: "flex", border: `1px solid ${primaryBorderColor}`, marginTop: "30px" }}>
                        <Box component="div" sx={{ padding: "20px", background: "#ff5e3a" }}>
                            <Person sx={{ color: headerColor }} />
                        </Box>
                        <Box component="div" sx={{ padding: "15px 0px 0px 20px" }}>
                            <Typography variant="h1" sx={{ fontSize: "18px !important", fontWeight: "600 !important" }}>
                                10
                            </Typography>
                            <Typography variant="h3" sx={{ fontSize: "15px !important", fontWeight: "400 !important", color: textColor, marginTop: "5px" }}>
                                Shortlisted Resume
                            </Typography>
                        </Box>
                    </Box> */}
                </Grid>
            </Grid>
            {/* <Box component="div" sx={{
                border: `1px solid ${primaryBorderColor}`,
                marginTop: "30px"
            }}>
                <Box component="div" sx={{
                    background: primaryColor,
                    padding: "20px"
                }}>
                    <Typography variant="h1" sx={{ fontSize: "18px !important", fontWeight: "400 !important", color: headerColor }}>
                        Recent Applicants
                    </Typography>
                </Box>
                <Grid container justifyContent="space-between" sx={{
                    borderBottom: `1px solid ${primaryBorderColor}`
                }}>
                    <Grid item xs={12} md={4}>
                        <Box component="div" sx={{ display: "flex", alignItems: "center" }}>
                            <img src={profile} style={{ width: "40%" }} />
                            <Box component="div">
                                <Typography variant="h1" sx={{ fontSize: "22px !important", fontWeight: "400 !important" }}>
                                    Aradhya S.
                                </Typography>
                                <Box component="div" sx={{ display: "flex", alignItems: "center", width: "20rem", gap: "10px", marginTop: "10px" }}>
                                    <Box component="div">
                                        <Typography variant="h3" sx={{ fontSize: "16px !important", fontWeight: "400 !important", color: textSecondaryColor }}>
                                            App Designer
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <IconButton sx={{ height: "20px !important" }} className={classes.heroBtn}>
                            Send
                        </IconButton>
                    </Grid>
                </Grid>
            </Box> */}
        </Box>
    )
}

export default CompanyDashboard