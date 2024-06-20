import { AppRegistration } from "@mui/icons-material"
import { Box, Grid, Icon, Typography } from "@mui/material"
import { headerColor, primaryBorderColor, primaryColor, textSecondaryColor } from "../../../../../../constants/Colors"
import useStyles from "../../../../../../styles"

const BasicInfo = ({ basicInfo }) => {

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
                    Basic Information
                </Typography>
                <AppRegistration sx={{ color: headerColor, cursor: "pointer" }} />
            </Box>
            <Grid container p={2}>
                {
                    basicInfo?.map((item) => {
                        return (
                            <Grid item xs={12} md={6}>
                                <Box component="div" sx={{ display: "flex", gap: "10px", marginTop: "20px" }}>
                                    <Icon sx={{ color: primaryColor }}>{item.icon}</Icon>
                                    <Box component="div">
                                        <Typography variant="h3" sx={{ fontSize: "20px !important", fontWeight: "400 !important" }}>
                                            {item.title}
                                        </Typography>
                                        <Typography variant="h3" sx={{ fontSize: "15px !important", fontWeight: "400 !important", color: textSecondaryColor, marginTop: "5px" }}>
                                            {item.description}
                                        </Typography>
                                    </Box>
                                </Box>

                            </Grid>
                        )
                    })
                }

            </Grid>
        </Box>
    )
}

export default BasicInfo