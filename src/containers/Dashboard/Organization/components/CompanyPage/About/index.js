import { AppRegistration } from "@mui/icons-material"
import { Box, Grid, Icon, Typography } from "@mui/material"
import { headerColor, primaryBorderColor, primaryColor, textSecondaryColor } from "../../../../../../constants/Colors"
import useStyles from "../../../../../../styles"

const About = ({ about }) => {

    const classes = useStyles()

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
                    About Us
                </Typography>
                <AppRegistration sx={{ color: headerColor, cursor: "pointer" }} />
            </Box>
            <Box component="div" p={2}>
                <Typography variant="h3" sx={{ fontSize: "15px !important", fontWeight: "400 !important", color: textSecondaryColor, marginTop: "5px" }}>
                    {about}
                </Typography>
            </Box>
        </Box>
    )
}

export default About