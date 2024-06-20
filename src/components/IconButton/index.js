import { Button } from "@mui/material";

const IconButton = ({ sx, className, onClick, children, icon, width, height, padding, disabled }) => {
    return (
        <Button disabled={disabled} sx={{ width: width, height: height, padding: `${padding} !important` }} className={className} onClick={onClick}>
            {icon}
            {children}
        </Button>
    );
}

export default IconButton;