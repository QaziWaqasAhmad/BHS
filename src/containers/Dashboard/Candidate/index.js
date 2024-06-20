import { Box, Container, Grid, Typography} from "@mui/material"
import { useContext, useState } from "react"
import { priceColor, primaryColor } from "../../../constants/Colors"
import useStyles from "../../../styles"
import { CandidateSidebar, CandidateDashboard, Resume, AppliedJobs, EditProfile, Favourite } from "./components"
import { Link, useLocation, } from "react-router-dom"
import FindAJob from "../../FindAJob"
import CoverLetterComponent from "./components/CoverLetterComponent"
import logo from "../../../assets/logo.png"
import LogoutIcon from '@mui/icons-material/Logout';
import { AppContext } from "../../../context"
import ViewResume from "../../ViewResume"
import { SignalCellularNull } from "@mui/icons-material"
import ViewCoverLetter from "../../ViewCoverLetter"

const Candidate = () => {
    const [selectedPage, setSelectedPage] = useState("candidateDashboard")
    const [profileScore, setProfileScore] = useState(0)
    const [resumeId, setResumeId] = useState(null)
    const [coverLetterId, setCoverLetterId] = useState(null)
    const {logout}=useContext(AppContext)
     const classes = useStyles()
     const location=useLocation()
    return (
         <div className="dashboard">
              <Box component="div" sx={{
                background: primaryColor,
                padding: "20px",
            }}>
                              
                 <div className="container-fluid" >
                <div className="row">
                  <div className="col-md-6">
                    <div className="text-start d-flex align-items-center gap-3">
                     <Link to="/">
                     <img  src={logo} alt={logo} className="img-flui " style={{width:"100px"}}  />
                     </Link>
                    <Typography variant="body2" className="fs-2 text-black"  >
                        Candidate Dashboard 
                    </Typography>
                    </div>
                  </div>
                  <div className="col-md-6 ">
                  <div className="text-end ">
                    <div className="pt-3" onClick={()=>logout()}>
                     
                     <LogoutIcon className="fw-bold"/> LOG OUT
                     
                     <Typography>
                        
                     </Typography>
                    </div>
                    </div>
                  </div>
                </div>
                </div>
        

            </Box>  
             <div className="container-fluid">
               <div className="row mt-4">
                <div className="col-md-3">
                <CandidateSidebar profileScore={profileScore} setProfileScore={setProfileScore} selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
                </div>
                <div className="col-md-9">
                {
                                selectedPage == "candidateDashboard" ? <CandidateDashboard />
                                    :
                                    selectedPage == "editProfile" ? <EditProfile />
                                        :
                                        selectedPage == "resume" ? <Resume profileScore={profileScore} setProfileScore={setProfileScore} setSelectedPage={setSelectedPage}  setResumeId={setResumeId}/>
                                        :
                                        selectedPage == "viewResume" ? <ViewResume setSelectedPage={setSelectedPage} type={"Candidate"} resumeId={resumeId}/>
                                        :
                                        selectedPage == "viewCoverLetter" ? <ViewCoverLetter setSelectedPage={setSelectedPage} type={"Candidate"} coverLetterId={coverLetterId}/>
                                       
                                            :
                                            selectedPage == "favourite" ? <Favourite />
                                                :
                                                selectedPage == "appliedJobs" ? <AppliedJobs />
                                                    :
                                                    selectedPage == "coverLetter" ? <CoverLetterComponent profileScore={profileScore} setProfileScore={setProfileScore} setSelectedPage={setSelectedPage}  setCoverLetterId={setCoverLetterId}/>
                                                    :
                                                    null
                }
                </div>
               </div>
             </div>
         </div>
   
    )
}

export default Candidate