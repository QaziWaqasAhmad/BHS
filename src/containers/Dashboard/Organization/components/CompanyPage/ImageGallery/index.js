import { AppRegistration } from "@mui/icons-material"
import { Box, Checkbox, Grid, Icon, Typography } from "@mui/material"
import { pink } from "@mui/material/colors"
import IconButton from "../../../../../../components/IconButton"
import { headerColor, primaryBorderColor, primaryColor, textSecondaryColor } from "../../../../../../constants/Colors"
import { coverBanner } from "../../../../../../constants/Images"
import useStyles from "../../../../../../styles"

const ImageGallery = () => {

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
                    Image Gallery
                </Typography>
                <AppRegistration sx={{ color: headerColor, cursor: "pointer" }} />
            </Box>
            <Box component="div" p={2}>
                <img src={coverBanner} style={{ width: "20%" }} />
                <Box component="div" mt={2}>
                    <IconButton className={classes.heroBtn}>
                        Add Image
                    </IconButton>
                </Box>
            </Box>
        </Box>
    )
}

export default ImageGallery