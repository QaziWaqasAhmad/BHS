import { Box, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow, Typography } from "@mui/material";
import useStyles from "../../styles";
import IconButton from "../IconButton";
import { ArrowForward } from "@mui/icons-material";
import { primaryColor } from "../../constants/Colors";
import { Navigate, useNavigate } from "react-router-dom";
import { AppContext } from "../../context";
import { useContext } from "react";
import { useSnackbar } from "notistack";
import { applyJob } from "../../services/Jobs";

const JobsTable = ({ jobs, getLatestJobs, jobType }) => {
    const { user } = useContext(AppContext);
    const classes = useStyles();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar()


    let lastFourJobs = jobs?.slice(-4);

    const handleApplyJob = async (jobId, companyId) => {
        if (!user) {
            enqueueSnackbar("Please Login First", {
                variant: "error",
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'right',
                }
            })
            return <Navigate to="/login" replace />
        } else {
            try {
                let payload = {
                    jobId: jobId,
                    userId: user?._id,
                    companyId: companyId
                }
                const response = await applyJob(payload)
                if (response.data.status === "ok") {
                    enqueueSnackbar(response.data.message, {
                        variant: "success",
                        anchorOrigin: {
                            vertical: 'bottom',
                            horizontal: 'right',
                        }
                    })
                    getLatestJobs(jobType)
                } else {
                    enqueueSnackbar(response.data.message, {
                        variant: "error",
                        anchorOrigin: {
                            vertical: 'bottom',
                            horizontal: 'right',
                        }
                    })
                }
            } catch (error) {
                enqueueSnackbar(error.message, {
                    variant: "error",
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'right',
                    }
                })

            }
        }

    }

    return (
        <TableContainer >
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Image</TableCell>
                        <TableCell>Job Title</TableCell>
                        <TableCell >Company</TableCell>
                        <TableCell >Job Type</TableCell>
                        <TableCell >Location</TableCell>
                        <TableCell >Salary</TableCell>
                        <TableCell >Posted Date</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(jobs?.length > 0) ? lastFourJobs?.map((job, index) => (
                        (
                            <TableRow key={job?.id}>
                                <TableCell>
                                    <img src={job?.compnayDetails?.userImage} style={{ width: "100px", border: "1px solid #e5e5e5", padding: "10px", height: "70px" }} />
                                </TableCell>
                                <TableCell >{job?.jobTitle}</TableCell>
                                <TableCell>{job?.compnayDetails?.name}</TableCell>
                                <TableCell >{job?.jobType}</TableCell>
                                <TableCell>{job?.city}</TableCell>
                                <TableCell >{job?.minSalary + " To " + job?.maxSalary}</TableCell>
                                <TableCell >{job?.date}</TableCell>
                                <TableCell >
                                    <IconButton onClick={() => handleApplyJob(job?._id, job?.companyId)} className={classes.heroBtn}>
                                        {
                                            job?.appliedCandidateIds?.includes(user?._id) ?
                                                "Applied"
                                                :
                                                "Apply now"
                                        }
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))) : (
                        <TableRow>
                            <TableCell colSpan={7}>
                                <Typography variant="h2" sx={{ fontSize: "27px !important", marginTop: "10px" }} className={classes.heroHeading}>
                                    No Jobs Found
                                </Typography>
                            </TableCell>
                        </TableRow>
                    )}

                </TableBody>

            </Table>
            <Box component="div" sx={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
                <Typography variant="h1" sx={{ fontSize: "20px !important", fontWeight: "400 !important" }}>
                    Showing {jobs?.length} of {lastFourJobs?.length} Latest Jobs
                </Typography>
                <Box onClick={() => navigate("/findAJob")} component="div" sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
                    <Typography variant="h1" sx={{ fontSize: "16px !important", fontWeight: "500 !important", marginRight: "10px", color: primaryColor }}>
                        See All Jobs
                    </Typography>
                    <ArrowForward style={{ color: primaryColor }} />
                </Box>
            </Box>
        </TableContainer>
    )

}

export default JobsTable