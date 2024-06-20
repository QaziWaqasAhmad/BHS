import { Box, Container, Grid, Typography } from "@mui/material"
import { primaryColor } from "../../../constants/Colors"
import { discoverMore } from "../../../constants/Images"
import useStyles from "../../../styles"
import IconButton from "../../IconButton"

const DiscoverCompany = () => {
    const classes = useStyles()
    return (
        <Box component="div" sx={{ marginTop: "160px", background: "#f8f9fa !important", padding: "20px" }}>
            <Container maxWidth="xl">
                <Grid container>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h1" sx={{ fontSize: "40px !important" }} className={classes.heroHeading}>
                            Grow Next Level Business
                        </Typography>
                        <Typography sx={{ marginTop: "5px", color: primaryColor, fontSize: "16px" }}>
                            #1 MOST trusted digital marketplace company
                        </Typography>
                        <Typography variant="h2" sx={{ marginTop: "20px", lineHeight: "30px" }} className={classes.heroSubHeading}>
                            What do all consultants need? In short, trust.
                            This is achieved with professional presentation and the ability to
                            communicate clearly with and potential clients. Whether you are an accountant.
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusd tempor
                            incididunt ut labore et dolore magna aliqua.
                        </Typography>
                        <Box sx={{ marginTop: "20px" }}>
                            <IconButton className={classes.heroBtn} sx={{ marginTop: "10px" }}>
                                Discover More
                            </IconButton>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <img src={discoverMore} style={{ width: "100%" }} />
                    </Grid>
                </Grid>
            </Container>

        </Box>
    )
}

export default DiscoverCompany