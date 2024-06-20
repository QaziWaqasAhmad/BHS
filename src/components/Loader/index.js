import React from "react";
import ReactLoading from "react-loading";
import "./style.css";

const Loader = ({ isloading }) => {
    return (
        <div className="loader" style={{ display: isloading ? "flex" : "none" }}>
            <ReactLoading
                type="spinningBubbles"
                color="#fff"
                height={100}
                width={100}
            />
        </div>
    );
};

Loader.defaultProps = {
    isloading: false,
};

export default Loader;
