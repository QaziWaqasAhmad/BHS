import { Box, Container, Typography, Grid } from "@mui/material";
import { useLayoutEffect, useState } from "react";
import { StatisticalFact } from "../../components/HomePageComponents";
import IconButton from "../../components/IconButton";
import { headerColor, priceColor, primaryColor } from "../../constants/Colors";
import { about, sundas, bushra, hadia , profile, about3 } from "../../constants/Images";
import { getAllOrganizations, getAllUsers } from "../../services/Authentication";
import useStyles from "../../styles";

const AboutUs = () => {
  const [allUsers, setAllUsers] = useState([])
  const [allOrganizations, setAllOrganizations] = useState([])
  const compnayData = [
    {
      name: "Contour",
      logo: "https://contour-software.com/wp-content/uploads/2020/06/skin1.header-logo-hd.png",
    },
    {
      name: "Folio3",
      logo: "https://folio3.com/wp-content/themes/folio3/images/logo.png",
    },
    {
      name: "Zones, LLC",
      logo: "https://media.zones.com/images/new/zones-logo.png",
    },
    {
      name: "Creative Souls",
      logo: "//cdn-hcpoh.nitrocdn.com/BwAFvnouZVwVXSaeVDdVLaDSydqWyljZ/assets/images/optimized/rev-353976f/wp-content/uploads/2020/04/logo-2.svg",
    },
    {
      name: "Zepto Systems",
      logo: "https://zeptosystems.com/wp-content/uploads/2021/11/zepto-large.png",
    },
    {
      name: "arbisoft",
      logo: "https://arbisoft.com/wp-content/uploads/2019/06/arbisoft-logo.png",
    }
  ]

  const employeesData = [
    {
      image: bushra,
      name: "BUSHRA ISMAIL",
      position: "CEO",
    },
    {
      image: hadia,
      name: "HADIA SULEMAN",
      position: "General Manager IT",
    },
    {
      image: sundas,
      name: "SUNDAS SHARIF",
      position: "CFO",
    },
    
  ];

  useLayoutEffect(() => {
    getAllUsersData()
    getAllOrganizationsData()
  }, [])

  const getAllUsersData = async () => {
    try {
      let res = await getAllUsers()
      setAllUsers(res?.data?.data)
    } catch (error) {
      console.log(error)
    }
  }

  const getAllOrganizationsData = async () => {
    try {
      let res = await getAllOrganizations()
      setAllOrganizations(res?.data?.data)
    } catch (error) {
      console.log(error)
    }
  }

  const classes = useStyles();
  return (
    <Box component="div">
      <Box
        component="div"
        sx={{
          background: primaryColor,
          padding: "20px",
        }}
      >
        <Container>
          <Typography variant="h1" className={classes.loginHeading}>
            About Us
          </Typography>
        </Container>
      </Box>
      <Container>
        <Grid container marginTop={2} spacing={2} justifyContent="space-between">
          <Grid item xs={12} md={5.5}>
            <Typography
              variant="h1"
              className={classes.heroHeading}
              sx={{ fontSize: "37px !important" }}
            >
              WHY CHOOSE BHS?
              <p style={{ color: primaryColor, fontSize: "16px" }}>BHS provides the best job solution !</p>
            </Typography>
            <Typography
              variant="h2"
              className={classes.heroSubHeading}
              sx={{ fontSize: "18px !important", marginTop: "10px", textAlign: "justify" }}
            >
              Dear BHS is a platform is not only job seeker but also organization.
              Frist the job seeker will provide all the
              important credentials to set up the account on the system. Then jobseekers will enter all required information on career goal, skills, experience.
              Thr system will generate the job seeker resume according to to his information fed by on him. On the other hand. If the organization are facilated with required employee from our platform on a free trial of one month they will charged form next ongoing month accoording to subscriptions packages. Further, they will post job descriptions for vacant position on the portal according to their purchased plan. Then. Our system will match the job description with an accouracy 40% on more it will be send to particular organization.
              Basically our BHS help to find the best job for employess
            </Typography>
          </Grid>
          <Grid item xs={12} md={5.5}>
            <img src={about3} alt="about" style={{ width: "100%", borderRadius: "20px" }} />
          </Grid>
        </Grid>
        <Grid item xs={12} md={12}>
        <StatisticalFact allUsers={allUsers} allOrganizations={allOrganizations} />
        </Grid>
        <Box component="div" sx={{ marginTop: "40px" }}>
          <Typography
            variant="h1"
            className={classes.heroHeading}
            sx={{ fontSize: "37px !important", textAlign: "center" }}
          >
            Meet Our Expert Team Member
          </Typography>
         
          <Grid container spacing={2}>
            {employeesData.map((employee) => {
              return (
                <Grid item xs={12} md={4}>
                  <Box
                    component="div"
                    sx={{
                      textAlign: "center",
                      padding: "20px 10px",
                      background: "#fff",
                      marginTop: "20px",
                      border: "1px solid #e9ecef",
                    }}
                  >
                    <img src={employee.image} style={{ width: "100%", height: "400px" }} />
                    <Typography
                      variant="h2"
                      sx={{
                        fontSize: "18px !important",
                        marginTop: "15px",
                        color: primaryColor,
                      }}
                      className={classes.heroSubHeading}
                    >
                      ({employee.position})
                    </Typography>
                    <Typography
                      variant="h1"
                      className={classes.heroHeading}
                      sx={{
                        fontSize: "22px !important",
                        fontWeight: "600 !important",
                        marginTop: "15px",
                      }}
                    >
                      {employee.name}
                    </Typography>
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default AboutUs;
