


import React, { Component } from "react";
import { Box, Button, Container, Grid, MenuItem, TextField, Typography } from "@mui/material";
import Slider from "react-slick";
import image from "../../../../assets/login.png"
import { Columns } from "lucide-react";
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import { primaryColor } from "../../../../constants/Colors";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HeroCompanyCard from "../../../../components/HomePageComponents/Hero/HeroCompanyCards";
import Google from "../../../../assets/google-logo-history-png-2609.png";
import Microsoft from "../../../../assets/microsoft-logo-png-2411 (1).png";
import OpenAI from "../../../../assets/logo-chatgpt-png-42635.png";
import Youtube from "../../../../assets/youtube-logo-png-2083.png";
import Threads from "../../../../assets/threads-logo-42594.png";
import Twitter from "../../../../assets/twitter-x-logo-42561.png";
import Spotify from "../../../../assets/spotify-logo-png-7081.png";
export default class Patners extends Component {

  render() {
    const testimonalData = [
        {
            name: "Contour",
            logo: "https://contour-software.com/wp-content/uploads/2020/06/skin1.header-logo-hd.png",
        },
        {
            name: "Folio3",
            logo: "https://folio3.com/wp-content/themes/folio3/images/logo.png",
        },
        {
            name: "InfoSys",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Infosys_logo.svg/1280px-Infosys_logo.svg.png",
        },
        {
            name: "Amazon",
            logo: "https://th.bing.com/th/id/R.7ce7c06b3cd3bd6a37ab8468043dbb93?rik=nTM5fQIazwqKFw&pid=ImgRaw&r=0",
        },
        {
            name: "Zepto Systems",
            logo: "https://zeptosystems.com/wp-content/uploads/2021/11/zepto-large.png",
        },
        {
            name: "Google",
            logo: Google,
        },
        {
            name: "Microsoft",
            logo: Microsoft,
        },
        {
            name: "Open AI",
            logo: OpenAI
        },
        {
            name: "Twitter",
            logo: Twitter,
        },
        {
            name: "Youtube",
            logo: Youtube,
        },
        {
            name: "Spotify",
            logo: Spotify,
        },
        {
            name: "Threads",
            logo: Threads,
        }
    ]
    var settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 6,
      slidesToScroll: 6,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 6,
            slidesToScroll: 6,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 4,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        }
      ]
    };

    return (
      <div>
       <div className="container p-5">
        <Slider {...settings}>
        {testimonalData.map((item, index) => (
            <Grid item xs={12} md={2} key={index}>
                <div style={{width:"180px"}}>
            <HeroCompanyCard item={item} />
            </div>
        </Grid>
//           <div className="card p-4" key={index}>
//      <span className="fw-bold" color={primaryColor}><FormatQuoteIcon className="fs-1 mb-2"/></span>
//    <h6>{item.desc}</h6>
//    <div className="d-flex align-items-center gap-3">
//      {/* <img src={item.img} alt="image" className="" style={{maxWidth:"80px"}} /> */}
//      <span className=""><AccountCircleIcon className="fs-1 text-secondary"/></span>
//     <div className="text-start" style={{display:"flex", flexDirection:"column"}}>
//    <span className="text-start fw-bold">{item.name}</span>
//    <span className="fw-light">{item.profession}</span>
//     </div>
//    </div>
//   </div>
))}
        </Slider>
       </div>
      </div>
    );
  }
}