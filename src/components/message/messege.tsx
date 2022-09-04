import React, { useEffect } from 'react';
import "./preloader.css";

const Messege = () => {
    useEffect(() => {
        setInterval(() => {
            // document.getElementById("preloader").style = "opacity: 0 !important;";
        }, 1800);
    }, []);

    return (
        <div className="preloader">
            {/* <img src={imageLogoPreolder} alt="" className="preloader__image blob" /> */}
        </div>
    )
};

export default Messege;
