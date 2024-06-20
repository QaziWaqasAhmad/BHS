
import React from "react";
import { Slide, useScrollTrigger } from "@mui/material";

const ScrollToHide01 = props => {
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: props.threshold,
        target: props.window ? window() : undefined
    });

    return (
        <Slide appear={true} direction="down" in={!trigger}>
            {props.children}
        </Slide>
    );
};

export default ScrollToHide01;
