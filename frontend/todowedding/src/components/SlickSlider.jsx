import React from "react";
import { Link } from 'react-router-dom';

//React-Slick 라이브러리
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

//Guide Image
import Main1 from "../assets/images/slick/Slick_Img1.png"
import Main2 from "../assets/images/slick/Slick_Img2.png"
import Main3 from "../assets/images/slick/Slick_Img3.png"
import Main4 from "../assets/images/slick/Slick_Img4.png"
import Main5 from "../assets/images/slick/Slick_Img5.png"

/*
 * react-slick 라이브러리 구성
 * 작성자 : 서현록
 * 작성일 : 2023.09.14
 */

const SlickSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 100,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, 
    autoplaySpeed: 2300,
  };

  return (
<div>
      <Slider {...settings}>
        <div>
          <Link to="/todowedding/guide_1">
            <img src={Main1} alt="Image1"/>
          </Link>
        </div>
        <div>
          <Link to="/todowedding/guide_2">
            <img src={Main2} alt="Image2"/>
          </Link>
        </div>
        <div>
          <Link to="/todowedding/guide_3">
            <img src={Main3} alt="Image3"/>
          </Link>
        </div>
        <div>
          <Link to="/todowedding/guide_4">
            <img src={Main4} alt="Image4"/>
          </Link>
        </div>
        <div>
          <Link to="/todowedding/guide_5">
            <img src={Main5} alt="Image5"/>
          </Link>
        </div>
      </Slider>
    </div>
  );
}

export default SlickSlider;