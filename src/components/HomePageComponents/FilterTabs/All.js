import { Box } from "@mui/material"
import JobsTable from "../../JobsTable"

const All = ({ jobs, getLatestJobs, jobType }) => {
    return (
        <Box component="div">
            <JobsTable getLatestJobs={getLatestJobs} jobType={jobType} jobs={jobs} />
        </Box>
    )
}

export default All