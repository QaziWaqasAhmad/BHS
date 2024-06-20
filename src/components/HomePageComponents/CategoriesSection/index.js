import { Box, Container, Grid, Typography } from "@mui/material"
import useStyles from "../../../styles"
import IconButton from "../../IconButton"

const CategoriesSection = () => {
    const classes = useStyles()

    const compnayData = [
        {
            name: "Contour",
            logo: "https://contour-software.com/wp-content/uploads/2020/06/skin1.header-logo-hd.png",
            jobs: 10
        },
        {
            name: "Folio3",
            logo: "https://folio3.com/wp-content/themes/folio3/images/logo.png",
            jobs: 10
        },
        {
            name: "Zones, LLC",
            logo: "https://media.zones.com/images/new/zones-logo.png",
            jobs: 20
        },
        {
            name: "Creative Souls",
            logo: "//cdn-hcpoh.nitrocdn.com/BwAFvnouZVwVXSaeVDdVLaDSydqWyljZ/assets/images/optimized/rev-353976f/wp-content/uploads/2020/04/logo-2.svg",
            jobs: 30
        },
        {
            name: "Zepto Systems",
            logo: "https://zeptosystems.com/wp-content/uploads/2021/11/zepto-large.png",
            jobs: 5
        },
        {
            name: "arbisoft",
            logo: "https://arbisoft.com/wp-content/uploads/2019/06/arbisoft-logo.png",
            jobs: 7
        }
    ]

    return (
        <Box component="div" sx={{ marginTop: "150px" }}>
            <Box component="div" sx={{ textAlign: "center", paddingBottom: "50px" }}>
                <Typography variant="h1" sx={{ fontSize: "50px !important" }} className={classes.heroHeading}>
                    Browse Jobs By Category
                </Typography>
                <Typography variant="h2" sx={{ marginTop: "10px" }} className={classes.heroSubHeading}>
                    Your next level Product developemnt company assets
                </Typography>
            </Box>
            <Grid container spacing={2}>
                {compnayData.map((item, index) => {
                    return (
                        <Grid item xs={12} md={3} key={index}>
                            <Box component="div" sx={{ textAlign: "center", padding: "20px 10px" }} className={classes.browseCompanyCard}>
                                <img src={item.logo} alt={item.name} style={{ width: "100px", height: "100px" }} />
                                <Typography variant="h2" sx={{ fontSize: "27px !important", marginTop: "10px" }} className={classes.heroHeading}>
                                    {item.name}
                                </Typography>
                                <Typography variant="h2" sx={{ fontSize: "18px !important", marginTop: "10px" }} className={classes.heroSubHeading}>
                                    ({item.jobs} Jobs)
                                </Typography>
                            </Box>
                        </Grid>
                    )
                })}
            </Grid>
            <Box component="div" sx={{ textAlign: "center", marginTop: "20px" }}>
                <IconButton className={classes.heroBtn}>
                    Load More
                </IconButton>
            </Box>
        </Box>
    )
}

export default CategoriesSection