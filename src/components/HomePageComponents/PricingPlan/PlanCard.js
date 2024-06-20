import { Box, Typography } from "@mui/material"
import IconButton from "../../IconButton"
import useStyles from "../../../styles"
import { headerColor, priceColor, primaryColor } from "../../../constants/Colors"

const PlanCard = ({ plan, user, handleSelectPlan }) => {
    const classes = useStyles()
    const { title, price, jobs, featuredJobs, renew, duration, emailAlert } = plan
    return (
        <Box component="div"
            sx={{
                textAlign: "center",
                padding: "20px 10px",
                background: "#fff",
                marginTop: "20px",
                border: "1px solid #e9ecef"
            }}>
            <Typography variant="h2" sx={{ fontSize: "30px !important", marginTop: "10px", color: primaryColor }} className={classes.heroHeading}>
                {title}
            </Typography>
            <Box component="div" sx={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "10px", background:primaryColor, padding: "30px" }}>
                <Typography variant="h2" sx={{ fontSize: "60px !important", marginTop: "10px", color: headerColor }} className={classes.heroSubHeading}>
                    <span style={{ fontSize: "16px" }}>Rs.</span>{price}<span style={{ fontSize: "20px" }}>/ Per Year</span>
                </Typography>
            </Box>
            <Typography variant="h2" sx={{ fontSize: "18px !important", marginTop: "20px" }} className={classes.heroSubHeading}>
                {jobs} Jobs
            </Typography>
            <Typography variant="h2" sx={{ fontSize: "18px !important", marginTop: "20px" }} className={classes.heroSubHeading}>
                {featuredJobs} Featured Jobs
            </Typography>
            <Typography variant="h2" sx={{ fontSize: "18px !important", marginTop: "20px" }} className={classes.heroSubHeading}>
                {renew} Renew
            </Typography>
            <Typography variant="h2" sx={{ fontSize: "18px !important", marginTop: "20px" }} className={classes.heroSubHeading}>
                {duration} Days Duration
            </Typography>
            <Typography variant="h2" sx={{ fontSize: "18px !important", marginTop: "20px" }} className={classes.heroSubHeading}>
                {emailAlert ? "Email Alert" : "No Email Alert"}
            </Typography>
            <Box component="div" sx={{ textAlign: "center", marginTop: "40px" }}>
                <IconButton onClick={() => handleSelectPlan(plan)} className={classes.heroBtn}>
                    Select Plan
                </IconButton>
            </Box>
        </Box>
    )
}

export default PlanCard