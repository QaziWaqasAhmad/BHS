import React from "react";
import {
  Grid,
  Container,
  Typography,
  Button,
  Tooltip,
  Box,
} from "@mui/material";

import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import useStyles from "../../styles";
import { primaryColor, secondaryColor } from "../../constants/Colors";
import { useNavigate } from "react-router-dom";
import { logo } from "../../constants/Images";

const linksOne = [
  {
    id: 1,
    name: "Home",
    path: "/",
  },
  {
    id: 3,
    name: "Contact",
    path: "/contactUs",
  },
  {
    id: 4,
    name: "About",
    path: "/aboutUs",
  },
 
  
];

const linksTwo = [
  
  {
    id: 2,
    name: "Find a Job",
    path: "/findAJob",
  },
  {
    id: 5,
    name: "Privacy Policy",
    path: "/privacyPolicy",
  },
  {
    id: 6,
    name: "Terms and Conditions",
    path: "/press",
  },

];

const AppFooter = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  return (
    <div style={{ background: primaryColor, marginTop: "50px" }}>
      <Container maxWidth="xl">
        <div className={classes.footerContainer}>
          <Grid container spacing={3} justifyContent="space-between">
            <Grid item xs={12} sm={6} md={4}>
              <div>
              
                <img src={logo} alt="BHS Logo" style={{ width: "30%" }} />
               
                <Typography variant="body2" className={classes.footerTypo} sx={{ marginTop: "10px" }}>
                  What do all consultants need? In short, trust. This is achieved with professional presentation and the ability to communicate clearly with and potential clients.
                </Typography>

                <Button
                  onClick={() => navigate("/contactUs")}
                  variant="contaned" className={classes.footerBtnStyle}>
                  Contact Us
                </Button>
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={3} className="ml-5 text-center">
              <Grid container justifyContent="space-between">
                <Grid item xs={12} md={5}>
                  <Typography variant="h3" className={classes.footerHead}>
                   Quick Links
                  </Typography>
                  {linksOne.map((item) => {
                    return (
                      <Typography
                        variant="body2"
                        className={classes.footerTypo}
                        style={{ cursor: "pointer" }}
                        onClick={() => navigate(item.path)}
                      >
                        {item.name}
                      </Typography>
                    );
                  })}
                </Grid>
              
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6} md={3}  className="text-center">
              <Grid container justifyContent="space-between">
                <Grid item xs={12} md={5}>
                  <Typography variant="h3" className={classes.footerHead}>
                    Company
                  </Typography>
                  {linksTwo.map((item) => {
                    return (
                      <Typography
                        variant="body2"
                        className={classes.footerTypo}
                        style={{ cursor: "pointer" }}
                        onClick={() => navigate(item.path)}
                      >
                        {item.name}
                      </Typography>
                    );
                  })}
                </Grid>
               
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <div>
                <Typography variant="h3" className={classes.footerHead}>
                  Contact
                </Typography>
                <Typography variant="body2" className={classes.footerTypo}>
                  Contact
                </Typography>
                <div >
                  <Tooltip title="Facebook" arrow placement="top">
                    <a style={{
                      textDecoration: "none",
                    }} href="https://www.facebook.com/profile.php?id=100089058866300&mibextid=ZbWKwL" target="_blank" rel="noreferrer">
                      <FacebookIcon className="text-secondary"/>
                    </a>
                  </Tooltip>
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
      </Container>
      <div style={{ marginTop: "40px", borderTop: "1px solid #f2f2f2" }}>
        <Container maxWidth="xl">
          <Box
            sx={{
              margin: "10px 0 0px",
              padding:"10px",
              display: "flex",
              alignItems: "center",
              flexWrap: { xs: "wrap" },
            }}
          >
            <Typography variant="span" className={classes.footerTypo}>
              Copyright © 2023 BHS
            </Typography>
            <Typography variant="body2" className={classes.footerPolicy}  >
              <span onClick={()=>navigate("/privacyPolicy")}>Privacy policy</span>
            </Typography>
            <Typography variant="body2" className={classes.footerPolicy}>
              Terms and Conditions
            </Typography>
          </Box>
        </Container>
      </div>
    </div>
  );
};

export default AppFooter;
