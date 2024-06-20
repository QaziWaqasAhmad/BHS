import { Box } from "@mui/material"
import { useContext, useState } from "react"
import Candidate from "./Candidate"
import Organization from "./Organization"
import { useAuth } from "../../hooks/UseAuth"
import { Navigate } from "react-router-dom"
import { AppContext } from "../../context"

const Dashboard = () => {
    const { user } = useContext(AppContext);

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return (
        <Box component="div">
            {
                user?.role == "Candidate" ?
                    <Candidate />
                    :
                    <Organization />
            }
        </Box>
    )
}

export default Dashboard