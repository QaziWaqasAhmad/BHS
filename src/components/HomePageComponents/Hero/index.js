import { Box, Button, Container, Grid, MenuItem, TextField, Typography } from "@mui/material";
import { useState } from "react";
import useStyles from "../../../styles";
import SearchableDropdown from "../../SearchableDropwdown";
import TextInput from "../../TextInput";
import IconButton from "../../IconButton";
import { Search, Sell, Translate } from "@mui/icons-material";
import { primaryColor } from "../../../constants/Colors";
import HeroCompanyCard from "./HeroCompanyCards";
import "../../../styles/main.css"
import Image from "../../../assets/vector.png"
import NewImage from "../../../assets/new.png"
import Partners from "../../../containers/Dashboard/Candidate/components/Partners"
import { AppContext } from "../../../context";
import { useContext } from "react";
import { loginImage,registerImage } from "../../../constants/Images";
import { Navigate,useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack"

const Hero = ({ jobDescriptionData, searchValue, setSearchValue, handleSearchValue, handleSearch, experienceData }) => {
    const classes = useStyles();
    const [selectedOption, setSelectedOption] = useState(null);
    const {user}=useContext(AppContext)
    const { enqueueSnackbar } = useSnackbar()
    const options = [{ value: undefined, label: "All", }];
    const navigate = useNavigate()
    const Keyword = ["ui designer", "web developer", "graphic designer"];

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
            name: "InfoSys",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Infosys_logo.svg/1280px-Infosys_logo.svg.png",
        },
        {
            name: "Amazon",
            logo: "https://th.bing.com/th/id/R.7ce7c06b3cd3bd6a37ab8468043dbb93?rik=nTM5fQIazwqKFw&pid=ImgRaw&r=0",
        },
        {
            name: "Zepto Systems",
            logo: "https://zeptosystems.com/wp-content/uploads/2021/11/zepto-large.png",
        },
        {
            name: "google",
            logo: "https://blog.hubspot.com/hubfs/image8-2.jpg",
        }
    ]

    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            background: "#fff",
            minHeight: "62px",
            fontSize: "12px",
            borderRadius: "0px",
            margin: "0",
            padding: "0"
        }),
        valueContainer: (provided, state) => ({
            ...provided,
            padding: "0 6px",
        }),

        input: (provided, state) => ({
            ...provided,
            margin: "0px",
        }),

        indicatorSeparator: (state) => ({
            display: "none",
        }),

    };
    let KeywordArray = Keyword.join(", ");


    const handleClickResume=()=>{
        if (!user) {
            enqueueSnackbar("Please Login First", {
                variant: "error",
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'right',
                }
            })
        }else if (user && user?.role==="Organization") {
            enqueueSnackbar("organization can not create resume", {
                variant: "error",
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'right',
                }
            })
        }else {
           navigate("/dashboard")
        }
    }

    return (
        <Box sx={{ marginTop: "10px", minHeight: "100vh", padding: "20px 0px 20px 50px", position: "relative",}}>
            {/* <Grid>
                <Grid container spacing={3}>
                    <Grid xs={12} md={6}>
                    <img src={loginImage} style={{ width: "90%" }} />
                    </Grid>
                    <Grid xs={12} md={6}>
                    <Typography variant="h6" className={classes.heroSubHeading}>
                            Build Your Personal
                        </Typography>
                        <Typography variant="h6" className={classes.heroHeading}>
                           Account Profile
                        </Typography>
                    </Grid>
                </Grid>
            </Grid> */}
               <div className="hero-slider d-none">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-6">
                        <div
                            className="hero-img scene mt-10 mt-lg-0"
                            id="scene"
                            // ref={sceneEl}
                        >
                            <div data-depth="0.2">
                                <img
                                    src={loginImage}
                                    alt=""
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="hero-slide-content">
                            <h2
                                className="title animated"
                                // dangerouslySetInnerHTML={{ __html: data.title }}
                            ></h2>
                            <p className="intro-desc">
                                Unlock the power to create a compelling resume
                                with our intuitive website. Tailor your
                                professional journey using our diverse templates
                                and user-friendly tools. Elevate your chances of
                                success by harnessing the ability to
                                effortlessly create a standout resume.
                            </p>
                            {/* <Button
                                classOption="btn btn-lg animated delay1 btn-orange me-4 mb-3 mb-sm-0 p-2"
                                text="Create Resume"
                                path="/login"
                            /> */}
                        </div>
                    </div>
                </div>
            </div>
        </div >

          
           <div className="hero-section text-center" >
             <div className="container">
               <div className="row d-flex justify-content-center align-items-center">
                   <div className="col-md-6">
                    <div className="login__image">
                      <img src={loginImage} alt={loginImage} className="img-fluid"/>
                    </div>
                   </div>
                   <div className="col-md-6">
                   <div className="hero_section_content">
                            <h1
                                className="text-start mb-3"
                                style={{fontSize:"3.4rem"}}
                                // dangerouslySetInnerHTML={{ __html: data.title }}
                            >
                                Build Your Professional <br/> Account Profile
                            </h1>
                            <p className="intro-desc  text-start mb-3">
                                Unlock the power to create a compelling resume
                                with our intuitive website. Tailor your
                                professional journey using our diverse templates
                                and user-friendly tools. Elevate your chances of
                                success by harnessing the ability to
                                effortlessly create a standout resume.
                            </p>
                            <div className="resume_button text-start  ">
                            <Button className="resume-button " style={{backgroundColor:"#f2994a", color:"white"}} onClick={()=>handleClickResume()} >
                                  Create Resume
                             </Button>
                            </div>
                        </div>
                   </div>
               </div>
             </div>
           </div>
           <div className="hero-section2 text-center mb-5" style={{marginTop:"1rem"}}>
             <div className="container">
               <div className="row d-flex justify-content-center align-items-center">
                   <div className="col-md-6">
                   <div className="hero_section_content">
                            <h1
                                className="text-start mb-3"
                                style={{fontSize:"3.4rem"}}
                                // dangerouslySetInnerHTML={{ __html: data.title }}
                            >
                                Find The Job Of <br/> Your <small className="fw-bold " style={{color:"#f2994a", fontSize:"3.4rem"}}>Dream</small>
                            </h1>
                            <p className="intro-desc  text-start mb-3">
                            BHS provides a platform for both job seekers and organizations to fulfill their needs.The portal provides employment opportunities to the job seekers and reduces the effort of searching job of desired position.It facilitates the organization by filtering all the appropriate resumes according to the job description which eventually minimizes human resource work and screening process.
                            </p>
                        </div>  
                        <Grid container spacing={2} marginTop={2}>
                        <Grid item xs={12} md={6}>
                            <TextInput
                                value={searchValue.keyword}
                                onChange={(e) => handleSearchValue(e)}
                                name="keyword"
                                className={classes.heroInput} placeholder="Keyword e.g. (Job Title, Description, Tags)" />
                            <Box component="div" sx={{ marginTop: "10px", }}>
                                <TextInput
                                    value={searchValue.location}
                                    onChange={(e) => handleSearchValue(e)}
                                    name="location"
                                    className={classes.heroInput} placeholder="Ex: Karachi" />
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                isNumber
                                onChange={(e) => handleSearchValue(e)}
                                className={classes.heroInput}
                                id="experience"
                                value={searchValue?.experience}
                                select
                                name="experience"
                                label="Select Experience"
                            >
                                {experienceData?.map((item) => {
                                    return <MenuItem value={item?.value}>{item.label}</MenuItem>;
                                })}
                            </TextField>
                            <Box component="div" sx={{ marginTop: "10px" }}>
                                <TextField
                                    isNumber
                                    onChange={(e) => handleSearchValue(e)}
                                    className={classes.heroInput}
                                    id="jobDescription"
                                    value={searchValue?.jobDescription}
                                    select
                                    name="jobDescription"
                                    label="Select Job Description"
                                >
                                    {jobDescriptionData?.map((item) => {
                                        return <MenuItem value={item?.value}>{item.label}</MenuItem>;
                                    })}
                                </TextField>
                            </Box>
                            
                        </Grid>
                        <IconButton onClick={handleSearch} className={classes.heroBtn} icon={<Search />}>
                        Search
                    </IconButton>
                    <Box component="div" sx={{ marginTop: "40px", display: "flex", alignItems: "center" }}>
                        <Sell sx={{ color: primaryColor }} />
                        <Typography variant="h3" className={classes.heroSubHeading}>
                            Trending Keywords :
                        </Typography>
                        <Typography variant="h3" className={classes.heroSubHeading} sx={{ marginTop: "0px", marginLeft: "5px" }}>
                            {KeywordArray}
                        </Typography>
                    </Box>
                    </Grid>
                   </div>
                   <div className="col-md-6">
                   <div className="login__image">
                      <img src={NewImage} alt={NewImage} className="img-fluid w-90"/>
                    </div>
                 
                   </div>
               </div>
             </div>
           </div>
           <div className="hero-section text-center" >
             <div className="container">
               <div className="row d-flex justify-content-center align-items-center">
                   <div className="col-md-6">
                    <div className="login__image">
                      <img src={Image} alt={Image} className="img-fluid"/>
                    </div>
                   </div>
                   <div className="col-md-6">
                   <div className="hero_section_content">
                            
                            <p className="intro-desc  text-start ">
                          <h1> Experience seamless recruitment with our platform's user-friendly job posting feature. </h1>
                             <span className="intro-desc  text-start mb-3">Showcase your company's opportunities to a diverse pool of talent by leveraging our intuitive platform. Craft personalized job postings with ease, utilizing our tools. Elevate your hiring process and attract top candidates effortlessly. Unlock the power to connect with the right talent and build your dream team. Simplify your recruitment journey - post your job today and open doors to a world of possibilities!</span>
                            </p>
                           
                        </div>
                   </div>
               </div>
             </div>
           </div>
            <Grid container spacing={3} className="d-none" >
                <Grid item xs={12} md={6} sx={{marginLeft:"25%" }}>
                    <Box component="div" sx={{ width: "90%" }}>

                        <Typography variant="h1" className={classes.heroHeading}>
                            The Easy Way To Get Your New Job
                        </Typography>
                        <Typography sx={{
                            marginTop: "20px",
                        }} variant="h2" className={classes.heroSubHeading}>
                            BHS provides a platform for both job seekers and organizations to fulfill their needs.The portal provides employment opportunities to the job seekers and reduces the effort of searching job of desired position.It facilitates the organization by filtering all the appropriate resumes according to the job description which eventually minimizes human resource work and screening process.
                        </Typography>
                    </Box>
                    <Grid container spacing={2} marginTop={2}>
                        <Grid item xs={12} md={6}>
                            <TextInput
                                value={searchValue.keyword}
                                onChange={(e) => handleSearchValue(e)}
                                name="keyword"
                                className={classes.heroInput} placeholder="Keyword e.g. (Job Title, Description, Tags)" />
                            <Box component="div" sx={{ marginTop: "10px", }}>
                                <TextInput
                                    value={searchValue.location}
                                    onChange={(e) => handleSearchValue(e)}
                                    name="location"
                                    className={classes.heroInput} placeholder="Ex: Karachi" />
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                isNumber
                                onChange={(e) => handleSearchValue(e)}
                                className={classes.heroInput}
                                id="experience"
                                value={searchValue?.experience}
                                select
                                name="experience"
                                label="Select Experience"
                            >
                                {experienceData?.map((item) => {
                                    return <MenuItem value={item?.value}>{item.label}</MenuItem>;
                                })}
                            </TextField>
                            <Box component="div" sx={{ marginTop: "10px" }}>
                                <TextField
                                    isNumber
                                    onChange={(e) => handleSearchValue(e)}
                                    className={classes.heroInput}
                                    id="jobDescription"
                                    value={searchValue?.jobDescription}
                                    select
                                    name="jobDescription"
                                    label="Select Job Description"
                                >
                                    {jobDescriptionData?.map((item) => {
                                        return <MenuItem value={item?.value}>{item.label}</MenuItem>;
                                    })}
                                </TextField>
                            </Box>
                        </Grid>
                    </Grid>
                    <IconButton onClick={handleSearch} className={classes.heroBtn} icon={<Search />}>
                        Search
                    </IconButton>
                    <Box component="div" sx={{ marginTop: "40px", display: "flex", alignItems: "center" }}>
                        <Sell sx={{ color: primaryColor }} />
                        <Typography variant="h3" className={classes.heroSubHeading}>
                            Trending Keywords :
                        </Typography>
                        <Typography variant="h3" className={classes.heroSubHeading} sx={{ marginTop: "0px", marginLeft: "5px" }}>
                            {KeywordArray}
                        </Typography>
                    </Box>
                </Grid>
                {/* <Grid item xs={12} md={6}>
                    <Box sx={{ display: { xs: 'none', md: "block" } }} className="heroAnimatedWrapper">
                    </Box>
                </Grid> */}
            </Grid>
            <Container maxWidth="xl">
                    <Partners/>
                    {/* {
                        compnayData.map((item, index) => {
                            return (
                                <Grid item xs={12} md={2} key={index}>
                                    <HeroCompanyCard item={item} />
                                </Grid>
                            )
                        })
                    } */}
            </Container>
        </Box>
    );
}

export default Hero;