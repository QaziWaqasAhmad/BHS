import { Box, Icon, LinearProgress, Typography } from "@mui/material"
import useStyles from "../../../../../styles"
import { profile } from "../../../../../constants/Images"
import { headerColor, primaryColor, textColor } from "../../../../../constants/Colors"
import { AppContext } from "../../../../../context"
import { useContext, useState } from "react"
import { useLayoutEffect } from "react"
import { getResume, getProfileScore } from "../../../../../services/UserDashboard"
import { useNavigate } from 'react-router-dom';


const CandidateSidebar = ({ selectedPage, setSelectedPage, profileScore, setProfileScore }) => {
    const { user,logout } = useContext(AppContext)
    const navigate=useNavigate()
    const classes = useStyles()
    const routes = [
        {
            id: 1,
            label: "Dashboard",
            path: "candidateDashboard",
            icon: "dashboard"
        },
        {
            id: 2,
            label: "Edit Profile",
            path: "editProfile",
            icon: "app_registration"
        },
        {
            id: 3,
            label: "Resume",
            path: "resume",
            icon: "grading"
        },
        {
            id: 4,
            label: "Cover Letter",
            path: "coverLetter",
            icon: "app_registration"
        },
        {
            id: 5,
            label: "Favourite",
            path: "favourite",
            icon: "favorite"
        },
        {
            id: 6,
            label: "Applied Jobs",
            path: "appliedJobs",
            icon: "check_box"
        },
        {
            id: 7,
            label: "Find a Job",
            path: "/findAJob",
            icon: "work"
          },
          {
            id: 8,
            label: "Contact",
            path: "/contactUs",
            icon: "favorite"
          },
          {
            id: 9,
            label: "About",
            path: "/aboutUs",
            icon: "info"
          },
    ]

    useLayoutEffect(() => {
        getUserResume(user._id)
    }, [])

    const getUserResume = async (userId) => {
        try {
            const response = await getResume(userId)
            let basicInfo = {
                jobDescription: response.data.data.jobDescription,
                email: response.data.data.email,
                phone: response.data.data.phone,
                location: response.data.data.location,
            }
            let payload = {
                education: response.data.data.education,
                experience: response.data.data.experience,
                skills: response.data.data.skills,
                portfolio: response.data.data.portFolio,
                about: response.data.data.about,
                basicInfo: basicInfo
            }
            if (response.status === 200) {
                let result = await getProfileScore(payload)
                setProfileScore(result.data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handlepath=(item)=>{
        if (item=="/findAJob"|| item=="/contactUs"  || item =="/aboutUs") {
            navigate(`${item}`)
        }else{
            setSelectedPage(item)

        }

    }
    return (
        <Box component="" >
            <Box component="div" className={classes.sidebarContainer}>
               <div className="text-center">
               <img src={user?.userImage} style={{ width: "202px", height: "248px" }} className="" />
               </div>
                <Box component="div" textAlign="center" marginTop="20px">
                    <Typography variant="h1" sx={{ fontSize: "22px !important", fontWeight: "400 !important" }}>
                        {user?.name}
                    </Typography>
                    <Typography variant="h1" sx={{ fontSize: "18px !important", fontWeight: "400 !important", color: primaryColor, marginTop: "10px" }}>
                        {user?.email}
                    </Typography>
                </Box>
                <Box component="div" textAlign="center" marginTop="20px" sx={{ borderBottom: "3px solid #e5e5e5", paddingBottom: "50px" }}>
                    <Box component="div" sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Typography variant="h1" sx={{ fontSize: "18px !important", fontWeight: "600 !important" }}>
                            Profile
                        </Typography>
                        <Typography variant="h1" sx={{ fontSize: "18px !important", fontWeight: "600 !important" }}>
                            {profileScore.toFixed(0)}%
                        </Typography>
                    </Box>

                    <LinearProgress variant="determinate" value={profileScore.toFixed(0)}
                        sx={{
                            backgroundColor: "#d9d9d9",
                            marginTop: "10px",
                            "& .MuiLinearProgress-bar": {
                                backgroundColor: primaryColor
                            }
                        }} />
                    <Box component='div' sx={{ marginTop: "10px", }}>
                        {
                            routes.map((item) => {
                                return (
                                    <Box
                                        component="div"
                                        onClick={() => handlepath(item.path)}
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            marginTop: "20px",
                                            cursor: "pointer",
                                            padding: "10px",
                                            borderLeft: selectedPage == item.path ? `3px solid ${primaryColor}` : "none",
                                            background: selectedPage == item.path && "#f3f3f3",
                                            gap: "10px",
                                            ":hover": {
                                                background: "#f3f3f3",
                                                borderLeft: `3px solid ${primaryColor}`
                                            }
                                        }}
                                    >
                                        <Icon sx={{ color: primaryColor }}>{item.icon}</Icon>
                                        <Typography variant="h1" sx={{ fontSize: "18px !important", fontWeight: "400 !important" }}>
                                            {item.label}
                                        </Typography>
                                    </Box>
                                )
                            })
                        }
                    </Box>
                </Box>
                <Box
                onClick={() => logout()}
                    component="div"
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        marginTop: "20px",
                        cursor: "pointer",
                        padding: "10px",
                        gap: "10px",
                        borderLeft: "none",
                        ":hover": {
                            background: "#f3f3f3",
                            borderLeft: `3px solid ${primaryColor}`
                        }
                    }}
                >
                    <Icon sx={{ color: primaryColor }}>settings_power</Icon>
                    <Typography variant="h1" sx={{ fontSize: "18px !important", fontWeight: "400 !important" }}>
                        Log Out
                    </Typography>
                </Box>
            </Box>
        </Box>
    )
}

export default CandidateSidebar