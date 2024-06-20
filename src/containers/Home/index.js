import { Box, Container, Toolbar } from "@mui/material";
import { secondaryColor } from "../../constants/Colors";
import { Hero, CategoriesSection, DiscoverCompany, FilterTabs, StatisticalFact, PricingPlan } from "../../components/HomePageComponents";
import ScrollToTop01 from "../../utils/ScrollToTop01";
import { useContext, useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context";
import { useSnackbar } from "notistack";
import { getAllUsers, getAllOrganizations } from "../../services/Authentication";
import Intro from "../../components/Intro";
import HomeData from "../../data/home.json"
import Testimonials from "../Dashboard/Candidate/components/Testimonials";



const Home = () => {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const { user } = useContext(AppContext)
    const [allUsers, setAllUsers] = useState([])
    const [allOrganizations, setAllOrganizations] = useState([])
    const [searchValue, setSearchValue] = useState({
        keyword: "",
        location: "",
        jobDescription: "",
        experience: "",
    });

    useLayoutEffect(() => {
        getAllUsersData();
        getAllOrganizationsData();
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


    const handleSearchValue = (e) => {
        setSearchValue({
            ...searchValue,
            [e.target.name]: e.target.value,
        });
    }

    const jobDescriptionData = [
        {
            id: 1,
            label: "It & Computer",
            value: "It & Computer",
        },
        {
            id: 2,
            label: "Marketing",
            value: "Marketing",
        },
        {
            id: 3,
            label: "Mechanical",
            value: "Mechanical",
        },
        {
            id: 4,
            label: "Doctor",
            value: "Doctor",
        },
    ];

    const experienceData = [
        {
            id: 1,
            label: "Fresher",
            value: "0",
        },
        {
            id: 2,
            label: "1 Year",
            value: "1",
        },
        {
            id: 3,
            label: "2 Year",
            value: "2",
        },
        {
            id: 4,
            label: "3 Year",
            value: "3",
        },
        {
            id: 5,
            label: "4 Year",
            value: "4",
        },
        {
            id: 6,
            label: "5 Year",
            value: "5",
        },
    ];

    const handleSearch = async () => {
        navigate("/findAJob", {
            state: {
                searchValue,
            },
        });
    }


    const handleSelectPlan = (plan) => {
        if (user) {
            if (user?.role === "Organization") {
                navigate("/dashboard/pricingPlan", {
                    state: {
                        plan,
                    }
                })
            } else {
                enqueueSnackbar("Please login as organization to select plan",
                    {
                        variant: "error",
                        anchorOrigin: {
                            vertical: "top",
                            horizontal: "center",
                        }
                    },

                )

            }
        } else {
            navigate("/login")
        }
    }

    return (
        <Box sx={{ backgroundColor: secondaryColor }}>
            <Toolbar sx={{
                minHeight: "0px !important"
            }} id="back-to-top-anchor" />
            <Hero experienceData={experienceData} handleSearch={handleSearch} searchValue={searchValue} setSearchValue={setSearchValue} handleSearchValue={handleSearchValue} jobDescriptionData={jobDescriptionData} />
            {/* <Container maxWidth="xl">
                <CategoriesSection />
            </Container> */}
            {/* <DiscoverCompany /> */}
            {/* <Intro data={HomeData[0].slider[0]}/> */}
            <Container maxWidth="xl">
                <FilterTabs />
            </Container>
            <StatisticalFact allUsers={allUsers} allOrganizations={allOrganizations} />
            <PricingPlan user={user} handleSelectPlan={handleSelectPlan} />
            <Testimonials/>
            <ScrollToTop01 />
        </Box>
    )
}

export default Home;