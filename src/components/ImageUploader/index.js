import React, { useState, useRef } from "react";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import axios from "axios";
import { CameraAlt } from "@mui/icons-material";
import Loader from "../Loader";

const SmallAvatar = styled(Avatar)(({ theme }) => ({
    width: 20,
    height: 20,
    border: `2px solid ${theme.palette.background.paper}`,
}));

export default function ImageUploader({ image, setImage, type }) {
    const imageRef = useRef(null);

    const [isLoading, setIsLoading] = useState(false);

    const handleImage = async (e) => {
        setIsLoading(true);
        const form = new FormData();
        form.append("image", e.target.files[0]);
        try {
            let res = await axios.post("https://amberstore.pk/upload.php", form);
            if (res) {
                setIsLoading(false);
                setImage(res.data.url);
            }
        } catch (error) {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Loader isloading={isLoading} />
            {type === "profile" || "product" ? (
                <>
                    <Stack direction="row" justifyContent="center">
                        <Badge
                            overlap="circular"
                            style={{ cursor: "pointer" }}
                            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                            onClick={() => imageRef.current.click()}
                            badgeContent={
                                <SmallAvatar alt="Remy Sharp">
                                    <PhotoCameraIcon
                                        style={{
                                            fontSize: "15px",
                                            background: "#1976d2",
                                        }}
                                    />
                                </SmallAvatar>
                            }
                        >
                            <Avatar
                                alt="Avatar"
                                src={image !== null ? image : "/static/images/avatar/2.jpg"}
                                sx={{ width: 75, height: 75 }}
                            />
                        </Badge>
                    </Stack>
                </>
            ) : (
                <>
                    <div
                        alt="Remy Sharp"
                        onClick={() => imageRef.current.click()}
                        style={{
                            // width: "250px",
                            height: "140px",
                            borderRadius: "10px",
                            cursor: "pointer",
                            backgroundColor: "gray",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        {!image ? (
                            <CameraAlt
                                style={{ width: "50px", height: "50px", color: "white" }}
                                color="white"
                            />
                        ) : (
                            <div style={{ textAlign: "center" }}>
                                <img
                                    onClick={() => imageRef.current.click()}
                                    src={image}
                                    style={{
                                        width: "190px",
                                        height: "140px",
                                        borderRadius: "5px",
                                        cursor: "pointer",
                                    }}
                                />
                            </div>
                        )}
                    </div>
                    {/* hel */}
                </>
            )}

            <input
                accept="image/png, image/gif, image/jpeg"
                type="file"
                ref={imageRef}
                style={{ visibility: "hidden", height: "0" }}
                onChange={handleImage}
            />
        </>
    );
}
