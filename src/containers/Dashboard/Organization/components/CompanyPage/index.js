import { Box } from "@mui/material"
import { useEffect } from "react"
import useStyles from "../../../../../styles"
import BasicInfo from "./BasicInfo"
import About from "./About"
import ImageGallery from "./ImageGallery"
import IconButton from "../../../../../components/IconButton"

const CompanyPage = () => {

    useEffect(() => {
        window.scrollTo({ top: 100, behavior: "smooth" })
    }, [])

    const classes = useStyles()

    const basicInfoData = [
        {
            id: 1,
            title: "Categories:",
            description: "Design & Creative",
            icon: "content_paste_go"
        },
        {
            id: 2,
            title: "Email:",
            description: "webstrot@example.com",
            icon: "email"
        },
        {
            id: 3,
            title: "Location:",
            description: "Los Angeles Califonia PO",
            icon: "location_on"
        },
        {
            id: 4,
            title: "Phone :",
            description: "0145636941",
            icon: "phone"
        },
        {
            id: 5,
            title: "Company Size:",
            description: "20-50",
            icon: "person"
        },
    ]


    return (
        <Box component="div">
            <BasicInfo basicInfo={basicInfoData} />
            <About about="BHS provides a platform for both job seekers and organizations to fulfill their needs. The portal provides employment opportunities to the job seekers and reduces the effort of searching job of desired position. It facilitates the organization by filtering all the appropriate resumes according to the job description which eventually minimizes human resource work and screening process." />
            <ImageGallery />
            <Box component="div" sx={{ marginTop: "20px" }}>
                <IconButton className={classes.heroBtn}>
                    Save Changes
                </IconButton>
            </Box>
        </Box>
    )
}

export default CompanyPage