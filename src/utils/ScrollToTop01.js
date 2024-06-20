import React from "react";
import PropTypes from "prop-types";
// import { Zoom, useScrollTrigger, makeStyles, Fab } from "@mui/material";
import { KeyboardArrowUp } from "@mui/icons-material";
import { Zoom, useScrollTrigger, Fab } from "@mui/material";
import { makeStyles, } from "@mui/styles";
import { headerColor, primaryColor } from "../constants/Colors";


const useStyles = makeStyles(theme => ({
    root: {
        position: "fixed",
        bottom: theme.spacing(2),
        right: theme.spacing(2)
    }
}));

const ScrollToTop01 = props => {
    const classes = useStyles();
    const trigger = useScrollTrigger();

    const handleClick = event => {
        const anchor = (event.target.ownerDocument || document).querySelector(
            "#back-to-top-anchor"
        );

        console.log("anchor: ", anchor);

        if (anchor) {
            anchor.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    };

    return (
        <Zoom in={trigger}>
            <div onClick={handleClick} role="presentation" className={classes.root}>
                <Fab sx={{
                    backgroundColor: primaryColor,
                    "&:hover": {
                        backgroundColor: primaryColor
                    }
                }} size="small" aria-label="scroll back to top">
                    <KeyboardArrowUp sx={{
                        color: headerColor,
                        "&:hover": {
                            color: headerColor
                        }
                    }} />
                </Fab>
            </div>
        </Zoom>
    );
};

ScrollToTop01.propTypes = {
    children: PropTypes.element.isRequired
};

export default ScrollToTop01;
