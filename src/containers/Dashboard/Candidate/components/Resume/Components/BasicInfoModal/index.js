import { Modal, Box, Typography, CircularProgress, Grid } from "@mui/material";
import { useState } from "react";
import IconButton from "../../../../../../../components/IconButton";
import TextInput from "../../../../../../../components/TextInput";
import useStyles from "../../../../../../../styles";


const BasicInfoModal = ({ open, setOpen, handleUpdateBasicInfo, isLoading, inputValues, handleChange }) => {

    const classes = useStyles();

    const handleClose = () => {
        setOpen(false);
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        bgcolor: 'background.paper',
        border: '1px solid #000',
        boxShadow: 24,
        p: 4,
    };
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{
            }}
        >
            <Box sx={style}>
                <Typography fontSize="25px" id="modal-modal-title" variant="h6" component="h2">
                    Update Basic Info
                </Typography>
                <Box component="div" mt="20px">
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <Typography sx={{ fontSize: "1.1rem" }} variant="h3">
                                Job Description
                            </Typography>
                            <Box sx={{ marginTop: "7px" }}>
                                <TextInput name="jobDescription" value={inputValues.jobDescription} onChange={(e) => handleChange(e)} className={classes.heroInput} placeholder="Ex: Graphic Designer" />
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography sx={{ fontSize: "1.1rem" }} variant="h3">
                                Email
                            </Typography>
                            <Box sx={{ marginTop: "7px" }}>
                                <TextInput name="email" value={inputValues.email} onChange={(e) => handleChange(e)} className={classes.heroInput} placeholder="john@gmail.com" />
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} mt={1}>
                        <Grid item xs={12} md={6}>
                            <Typography sx={{ fontSize: "1.1rem" }} variant="h3">
                                Location
                            </Typography>
                            <Box sx={{ marginTop: "7px" }}>
                                <TextInput name="location" value={inputValues.location} onChange={(e) => handleChange(e)} className={classes.heroInput} placeholder="Gulshan e iqbal Karachi" />
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography sx={{ fontSize: "1.1rem" }} variant="h3">
                                Phone
                            </Typography>
                            <Box sx={{ marginTop: "7px" }}>
                                <TextInput name="phone" value={inputValues.phone} onChange={(e) => handleChange(e)} className={classes.heroInput} placeholder="+9233333332" />
                            </Box>
                        </Grid>
                    </Grid>
                </Box>

                <Box component="div" mt={2} textAlign="center">
                    <IconButton onClick={handleUpdateBasicInfo} className={classes.heroBtn} width={"50%"} >
                        {
                            isLoading ? <CircularProgress size={30} sx={{
                                "& .MuiCircularProgress-svg": {
                                    color: "#fff"
                                }
                            }} /> : "Update Basic Info"
                        }
                    </IconButton>
                </Box>
            </Box>
        </Modal>
    )
}

export default BasicInfoModal