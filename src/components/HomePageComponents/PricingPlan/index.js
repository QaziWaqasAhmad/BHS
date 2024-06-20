import { Box, Container, Grid, Typography } from "@mui/material"
import useStyles from "../../../styles"
import PlanCard from "./PlanCard"
import { secondaryColor } from "../../../constants/Colors"

const PricingPlan = ({ user, handleSelectPlan }) => {
    const classes = useStyles()

    const plans = [
        {
            id: 1,
            title: "Basic",
            price: "10000",
            jobs: "100",
            featuredJobs: "10",
            renew: "10",
            duration: "10",
            emailAlert: true
        },
        {
            id: 2,
            title: "Standard",
            price: "20000",
            jobs: "200",
            featuredJobs: "20",
            renew: "20",
            duration: "20",
            emailAlert: true
        },
        {
            id: 3,
            title: "Premium",
            price: "30000",
            jobs: "300",
            featuredJobs: "30",
            renew: "30",
            duration: "30",
            emailAlert: true
        },
    ]

    return (
        <Box component="div" sx={{ marginTop: "4rem", background: secondaryColor, padding: "20px" }}>
            <Box component="div" sx={{ textAlign: "center" }}>
                <Typography variant="h1" sx={{ fontSize: "40px !important" }}>
                    Choose Pricing Plan
                </Typography>
                <Typography variant="h2" sx={{ fontSize: "18px !important", marginTop: "10px" }} className={classes.heroSubHeading}>
                    Your next level Product developemnt company assets
                </Typography>
            </Box>
            <Container maxWidth="xl">
                <Grid container marginTop={2} spacing={2} justifyContent="center">
                    {plans.map(plan => {
                        return (
                            <Grid item xs={12} md={3.4}>
                                <PlanCard handleSelectPlan={handleSelectPlan} user={user} plan={plan} />
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </Box>
    )
}

export default PricingPlan