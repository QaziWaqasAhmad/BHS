import { Close } from "@mui/icons-material";
import { TextField } from "@mui/material";

const TextInput = ({ value, onChange, sx, className, placeholder, type, icon, multiline, startIcon, startIconContent, isNumber, isPassword, name, disabled }) => {
    return (

        <TextField
            type={isNumber ? "number" : isPassword ? "password" : "text"}
            multiline={multiline}
            rows={multiline ? 4 : 1}
            value={value}
            name={name}
            onChange={onChange}
            sx={sx}
            className={className}
            placeholder={placeholder}
            disabled={disabled}
            InputProps={{
                // ...type === "icon" && {
                endAdornment: (
                    <div>
                        {type === "icon" && icon}
                    </div>
                ),
                startAdornment: (
                    <div>
                        {startIcon && startIconContent}
                    </div>
                )
                // }

            }}
        />
    );
}

export default TextInput;