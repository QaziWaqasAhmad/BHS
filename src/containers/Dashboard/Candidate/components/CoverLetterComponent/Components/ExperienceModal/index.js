import { Modal, Box, Typography, CircularProgress, Grid, Checkbox } from "@mui/material";
import { useState } from "react";
import IconButton from "../../../../../../../components/IconButton";
import TextInput from "../../../../../../../components/TextInput";
import useStyles from "../../../../../../../styles";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { pink } from "@mui/material/colors";


const ExperienceModal = ({ open, setOpen, handleUpdateExperience, isLoading, inputValues, handleChange, handleAddClick, handleRemoveClick, }) => {

    const classes = useStyles();
    const [isPresent, setIsPresent] = useState(false);

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
                overflow: "scroll",
                height: "100%",
            }}
        >
            <Box sx={style}>
                <Typography fontSize="25px" id="modal-modal-title" variant="h6" component="h2">
                    Update Experience Info
                </Typography>
                <Box component="div" mt="20px">
                    <Grid container spacing={2}>
                        {
                            inputValues?.map((inputValue, index) => {
                                return (
                                    <Grid item xs={12} md={6}>
                                        <Typography sx={{ fontSize: "1.1rem" }} variant="h3">
                                            Experience {index + 1}
                                        </Typography>
                                        <Box sx={{ marginTop: "7px" }}>
                                            <TextInput name="title" value={inputValue.title} onChange={(e) => handleChange(e, index)} className={classes.heroInput} placeholder="Graphic Designer" />
                                        </Box>
                                        <Box sx={{ marginTop: "7px" }}>
                                            <TextInput name="company" value={inputValue.company} onChange={(e) => handleChange(e, index)} className={classes.heroInput} placeholder="Its Solutions" />
                                        </Box>
                                        <Box sx={{ marginTop: "7px" }}>
                                            <DatePicker
                                                selected={inputValue.startYear}
                                                onChange={(date) => handleChange(date, index, "startYear")}
                                                wrapperClassName="educationDatePicker"
                                                showYearDropdown
                                                scrollableYearDropdown
                                            />
                                        </Box>
                                        <Box sx={{ marginTop: "7px", display: "flex", alignItems: "center" }}>
                                            <DatePicker
                                                selected={inputValue.endYear}
                                                onChange={(date) => handleChange(date, index, "endYear")}
                                                disabled={isPresent}
                                                wrapperClassName="educationDatePicker"
                                                showYearDropdown
                                                scrollableYearDropdown
                                            />
                                            <Checkbox
                                                checked={isPresent}
                                                onChange={(e) => setIsPresent(e.target.checked)}
                                                sx={{
                                                    color: pink[800],
                                                    '&.Mui-checked': {
                                                        color: pink[600],
                                                    },
                                                }}
                                            />
                                            <Typography sx={{ fontSize: "1.1rem" }} variant="h3">
                                                Present
                                            </Typography>
                                        </Box>
                                        <Box sx={{ marginTop: "7px" }}>
                                            <TextInput name="description" value={inputValue.description} onChange={(e) => handleChange(e, index)} className={classes.heroInput} placeholder="Ex: i have a strong background of work..." />
                                        </Box>
                                        {
                                            inputValues.length - 1 === index && <Box sx={{ marginTop: "7px", display: "flex" }}>
                                                <IconButton onClick={() => handleAddClick()} className={classes.heroBtn} width={"50%"} >
                                                    Add
                                                </IconButton>
                                                <IconButton onClick={() => handleRemoveClick(index)} className={classes.heroBtn} width={"50%"} >
                                                    Remove
                                                </IconButton>
                                            </Box>
                                        }

                                    </Grid>
                                )
                            })
                        }
                    </Grid>
                </Box>

                <Box component="div" mt={2} textAlign="center">
                    <IconButton onClick={handleUpdateExperience} className={classes.heroBtn} width={"50%"} >
                        {
                            isLoading ? <CircularProgress size={30} sx={{
                                "& .MuiCircularProgress-svg": {
                                    color: "#fff"
                                }
                            }} /> : "Update Experience"
                        }
                    </IconButton>
                </Box>
            </Box>
        </Modal>
    )
}

export default ExperienceModal