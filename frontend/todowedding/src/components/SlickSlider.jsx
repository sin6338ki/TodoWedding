import React from "react";
import { Link } from 'react-router-dom';

//React-Slick 라이브러리
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SlickSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
<div>
      <h2> Simple Slider </h2>
      <Slider {...settings}>
        <div>
          <Link to="/page1">
            <img src="img1.jpg" alt="Image1"/>
          </Link>
        </div>
        <div>
          <Link to="/page2">
            <img src="img2.jpg" alt="Image2"/>
          </Link>
        </div>
        <div>
          <Link to="/page3">
            <img src="img3.jpg" alt="Image3"/>
          </Link>  
        </div>
      </Slider>
    </div>
  );
}

export default SlickSlider;