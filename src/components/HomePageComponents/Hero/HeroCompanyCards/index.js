import { Typography,Box } from "@mui/material"
import useStyles from "../../../../styles"

const HeroCompanyCard = ({item}) =>{
    const classes = useStyles();
    return(
        <Box component="div" className="text-center p-3">
            <img src={item.logo} alt={item.name} style={{width:"130px",height:"80px"}} />
            <Typography variant="h6" style={{fontSize:"16px"}} >
                {item.name}
            </Typography>
        </Box>
    )
}

export default HeroCompanyCard