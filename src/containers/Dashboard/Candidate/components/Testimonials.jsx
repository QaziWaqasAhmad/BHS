


import React, { Component } from "react";
import Slider from "react-slick";
import image from "../../../../assets/login.png"
import { Columns } from "lucide-react";
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import { primaryColor } from "../../../../constants/Colors";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
export default class Testimonials extends Component {

  render() {
    const testimonalData = [
      {
        desc:"The job search feature provided relevant opportunities, and I landed my current role thanks to this platform. A must-try for anyone navigating the competitive job market.",
        name:'Mehak',
        profession:"Marketing Coordinator"
      },
      {
        desc:"The resume-building tools on this site are a game-changer for professionals like me. The templates cater perfectly to the IT industry, and the process is straightforward.",
        name:'Saima',
        profession:"IT Consultant"
      },
      {
        desc:"This website streamlined our hiring process. The job posting feature attracted a diverse pool of candidates, and the intuitive design tools allowed us to create compelling listings.",
        name:'Saleh',
        profession:"Sales Manager"
      },
      {
        desc:"The resume-building tools on this site are a game-changer for professionals like me. The templates cater perfectly to the IT industry, and the process is straightforward",
        name:'Noman',
        profession:"React-developer"
      },
    ]
    var settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 3,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };

    return (
      <div>
       <div className="container p-5">
       <h2 className="text-center mb-5"> Our Clients Says!!!</h2>
        <Slider {...settings}>
        {testimonalData.map((item, index) => (
          <div className="card p-4" key={index}>
     <span className="fw-bold" color={primaryColor}><FormatQuoteIcon className="fs-1 mb-2"/></span>
   <h6>{item.desc}</h6>
   <div className="d-flex align-items-center gap-3">
     {/* <img src={item.img} alt="image" className="" style={{maxWidth:"80px"}} /> */}
     <span className=""><AccountCircleIcon className="fs-1 text-secondary"/></span>
    <div className="text-start" style={{display:"flex", flexDirection:"column"}}>
   <span className="text-start fw-bold">{item.name}</span>
   <span className="fw-light">{item.profession}</span>
    </div>
   </div>
  </div>
))}
        </Slider>
       </div>
      </div>
    );
  }
}