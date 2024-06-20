import { Box, Container, Typography } from "@mui/material"
import { priceColor,primaryColor } from "../../constants/Colors";
import useStyles from "../../styles"

const AuthWrapper = ({ children, title }) => {
    const classes = useStyles();
    return (
        <Box component="div">
            <Box component="div" sx={{
                background: primaryColor,
                padding: "20px",
            }}>
                <Container >
                    <Typography variant="h1" className={classes.loginHeading}>
                        {title}
                    </Typography>
                </Container>

            </Box>
            <Container >
                <Box component="div" sx={{ marginTop: "5rem", border: `1px solid #e5e5e5`, borderRadius: "5px" }}>
                    {children}
                </Box>
            </Container>
        </Box>
    )
}

export default AuthWrapper