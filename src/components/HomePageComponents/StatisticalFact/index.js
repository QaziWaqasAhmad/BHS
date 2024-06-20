import { Box, Container, Grid, Typography } from "@mui/material"
import { statisticalImage } from "../../../constants/Images"

const StatisticalFact = ({ allUsers, allOrganizations }) => {
    return (
        <Box component="div" sx={{
            background: "linear-gradient(0deg,rgba(242,153,74) 39%, rgba(242,153,74) 100%),url(https://webstrot.com/html/jbdesk/main_version/main_pages/images/counter_bg.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            marginTop: "4rem",
            padding: "4rem 0",
        }}>
            <Container maxWidth="xl">
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} md={6}>
                        <img src={statisticalImage} style={{ width: "100%" }} className="statisticalImage" />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h1" sx={{ color: "#fff", fontSize: "40px !important", marginTop: "20px" }}>
                            Some Statistical Facts
                        </Typography>
                        <Box component="div" sx={{ marginTop: "20px", display: "flex", alignItems: "center" }}>
                            <Box component="div">
                                <Typography variant="h2" sx={{ color: "#fff", fontSize: "35px !important" }}>
                                    {
                                        allUsers?.length ? allUsers?.length : 0
                                    }
                                </Typography>
                                <Typography variant="h2" sx={{ color: "#fff", fontSize: "20px !important", marginTop: "10px" }}>
                                    Users Registered
                                </Typography>
                            </Box>
                            <Box component="div" sx={{ marginLeft: "20px" }}>
                                <Typography variant="h2" sx={{ color: "#fff", fontSize: "35px !important" }}>
                                    {
                                        allOrganizations?.length ? allOrganizations?.length : 0
                                    }
                                </Typography>
                                <Typography variant="h2" sx={{ color: "#fff", fontSize: "20px !important", marginTop: "10px" }}>
                                    Organizations Registered
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}

export default StatisticalFact