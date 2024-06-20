import { Box, Icon, LinearProgress, Typography } from "@mui/material"
import useStyles from "../../../../../styles"
import { profile } from "../../../../../constants/Images"
import { headerColor, primaryColor, textColor } from "../../../../../constants/Colors"
import { AppContext } from "../../../../../context"
import React from "react"

const CompanySidebar = ({ selectedPage, setSelectedPage, setJobData, setApplicationData,searchParams,setSearchParams }) => {
    const { user,logout } = React.useContext(AppContext);
    const page = searchParams.get('page')
    const classes = useStyles()
    const routes = [
        {
            id: 1,
            label: "Dashboard",
            path: "companyDashboard",
            icon: "dashboard"
        },
        {
            id: 2,
            label: "Edit Profile",
            path: "editProfile",
            icon: "app_registration"
        },
        // {
        //     id: 3,
        //     label: "Company Page",
        //     path: "companyPage",
        //     icon: "contact_page"
        // },
        {
            id: 3,
            label: "Manage Jobs",
            path: "manageJobs",
            icon: "manage_accounts"
        },
        {
            id: 4,
            label: "Recent Applications",
            path: "recentApplications",
            icon: "phone_iphone"
        },
        {
            id: 5,
            label: "Post New Job",
            path: "postNewJob",
            icon: "person_add"
        }
    ]
    return (
        <Box component="">
            <Box component="div" className={classes.sidebarContainer}>
                <img src={user?.userImage} style={{ width: "100%", height: "250px" }} />
                <Box component="div" textAlign="center" marginTop="20px">
                    <Typography variant="h1" sx={{ fontSize: "22px !important", fontWeight: "400 !important" }}>
                        {user?.name}
                    </Typography>
                    <Typography variant="h1" sx={{ fontSize: "18px !important", fontWeight: "400 !important", color: primaryColor, marginTop: "10px" }}>
                        {user?.email}
                    </Typography>
                </Box>
                <Box component="div" textAlign="center" marginTop="20px" sx={{ borderBottom: "3px solid #e5e5e5", paddingBottom: "50px" }}>
                    {/* <Box component="div" sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Typography variant="h1" sx={{ fontSize: "18px !important", fontWeight: "600 !important" }}>
                            Profile
                        </Typography>
                        <Typography variant="h1" sx={{ fontSize: "18px !important", fontWeight: "600 !important" }}>
                            70%
                        </Typography>
                    </Box> */}

                    {/* <LinearProgress variant="determinate" value={70}
                        sx={{
                            backgroundColor: "#d9d9d9",
                            marginTop: "10px",
                            "& .MuiLinearProgress-bar": {
                                backgroundColor: primaryColor
                            }
                        }} /> */}
                    <Box component='div' sx={{ marginTop: "10px", }}>
                        {
                            routes.map((item) => {
                                return (
                                    <Box
                                        component="div"
                                        onClick={() => {
                                            setSearchParams({'page':item.path})
                                            setJobData(null)
                                            setApplicationData(null)
                                        }}
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            marginTop: "20px",
                                            cursor: "pointer",
                                            padding: "10px",
                                            borderLeft: page == item.path ? `3px solid ${primaryColor}` : "none",
                                            background: page == item.path && "#f3f3f3",
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

export default CompanySidebar