import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ReactCodeInput from 'react-code-input';
import IconButton from '../IconButton';
import useStyles from '../../styles';
import { CircularProgress } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
    textAlign: "center"
};

const props = {
    inputStyle: {
        margin: "4px",
        width: "14%",
        borderRadius: "3px",
        fontSize: "20px",
        height: "30px",
        padding: "5px",
        MozAppearance: 'none',
    },
};

export default function CodeConfirmationModal({ open, setOpen, code, setCode, handleRegister, isLoading }) {
    const handleClose = () => setOpen(false);
    const classes = useStyles();

    return (
        <div>
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
                        Verify your email
                    </Typography>
                    <Box component="div" mt={2}>
                        <ReactCodeInput value={code} onChange={(e) => setCode(e)} type='number' fields={4}  {...props} />
                    </Box>

                    <Box component="div" mt={2}>
                        <IconButton onClick={handleRegister} className={classes.heroBtn} width={"50%"} >
                            {
                                isLoading ? <CircularProgress size={30} sx={{
                                    "& .MuiCircularProgress-svg": {
                                        color: "#fff"
                                    }
                                }} /> : "Verify"
                            }
                        </IconButton>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}