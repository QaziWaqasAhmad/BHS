import { Box, Container, Grid, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { priceColor, primaryColor } from "../../../constants/Colors";
import useStyles from "../../../styles";
import logo from "../../../assets/logo.png";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  CompanySidebar,
  CompanyDashboard,
  CompanyPage,
  Applications,
  EditProfile,
  ManageJobs,
  PostNewJob,
  RecentApplications
} from "./components";
import { Link, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { AppContext } from "../../../context";
import ViewResume from "../../ViewResume";
import ViewCoverLetter from "../../ViewCoverLetter";

const Organization = () => {
  const [selectedPage, setSelectedPage] = useState("companyDashboard");
  const [searchParams, setSearchParams] = useSearchParams();
  const [jobData, setJobData] = useState(null);
  const [jobDetails, setJobDetails] = useState(null);
  const [applicationData, setApplicationData] = useState(null);
  const [resumeId, setResumeId] = useState(null);
  const [coverLetterId, setCoverLetterId] = useState(null);
  const [recentApplications,setRecentApplications] = useState(false);
  const { logout } = useContext(AppContext);
  const page = searchParams.get("page");

  console.log(page, "pageeeeeeeeeeeeeee==>");
  useEffect(() => {
    if (page == null) {
      setSearchParams({ page: "companyDashboard" });
    }
  }, []);

  const classes = useStyles();

  return (
    <>
      <div className="organizer">
        {/* <Box component="div"> */}
        <Box
          component="div"
          sx={{
            background: primaryColor,
            padding: "20px",
          }}
        >
          <div className="container-fluid" color={primaryColor}>
            <div className="row">
              <div className="col-md-6">
                <div className="text-start d-flex align-items-center gap-3">
                  <Link to="/">
                    <img
                      src={logo}
                      alt={logo}
                      className="img-flui "
                      style={{ width: "100px" }}
                    />
                  </Link>
                  <Typography variant="body2" className="fs-2 text-black">
                    Company Dashboard
                  </Typography>
                </div>
              </div>
              <div className="col-md-6 ">
                <div className="text-end ">
                  <div className="pt-3" onClick={() => logout()}>
                    <LogoutIcon className="fw-bold" /> LOG OUT
                    <Typography></Typography>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Box>

        <div className="container-fluid mt-4">
          <div className="row ">
            <div className="col-md-3">
              <CompanySidebar
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
                setJobData={setJobData}
                setApplicationData={setApplicationData}
                searchParams={searchParams}
                setSearchParams={setSearchParams}
              />
            </div>
            <div className="col-md-9">
              {page == "companyDashboard" ? (
                <CompanyDashboard />
              ) : page == "editProfile" ? (
                <EditProfile />
              ) : page == "companyPage" ? (
                <CompanyPage />
              ) : page == "manageJobs" ? (
                <ManageJobs
                  setApplicationData={setApplicationData}
                  setJobData={setJobData}
                  setSelectedPage={setSelectedPage}
                  setSearchParams={setSearchParams}
                  jobDetails={jobDetails}
                  setJobDetails={setJobDetails}
                />
              ) : page == "applications" ? (
                <Applications jobDetails={jobDetails} setResumeId={setResumeId} setCoverLetterId={setCoverLetterId} setSelectedPage={setSelectedPage}
                setSearchParams={setSearchParams} setRecentApplications={setRecentApplications}/>
              ) : page == "viewResume" ? (
                <ViewResume resumeId={resumeId} setSelectedPage={setSelectedPage}
                setSearchParams={setSearchParams} recentApplications={recentApplications}   />
              ): page == "viewCoverLetter" ? (
                <ViewCoverLetter coverLetterId={coverLetterId} setSelectedPage={setSelectedPage}
                setSearchParams={setSearchParams}  recentApplications={recentApplications} />
              ): page == "recentApplications" ? (
                <RecentApplications setResumeId={setResumeId} setCoverLetterId={setCoverLetterId} setSelectedPage={setSelectedPage}
                setSearchParams={setSearchParams} setRecentApplications={setRecentApplications}/>
              ) : page == "postNewJob" ? (
                <PostNewJob jobData={jobData}  />
              ) : null}
            </div>
          </div>
        </div>

      
        {/* </Box> */}
      </div>
    </>
  );
};

export default Organization;
