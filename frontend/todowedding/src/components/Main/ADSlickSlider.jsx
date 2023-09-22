import React from "react";
import { Link } from 'react-router-dom';

//React-Slick 라이브러리
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

//AD Image
import AD1 from "../../assets/images/AD/todoImage1.png"
import AD2 from "../../assets/images/AD/todoImage2.png"
import AD3 from "../../assets/images/AD/todoImage3.png"
import AD4 from "../../assets/images/AD/todoImage4.png"

/*
 * AD react-slick 라이브러리 구성
 * 작성자 : 서현록
 * 작성일 : 2023.09.16
 */

const ADSlickSlider = () => {
    const settings = {
      dots: false,
      arrows: false,
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
            <Link to="https://gjstylingfair.com/">
              <img src={AD1} alt="Image1"/>
            </Link>
          </div>
          <div>
            <Link to="https://gjweddingexpo.co.kr/?n_media=27758&n_query=%EA%B4%91%EC%A3%BC%EC%9B%A8%EB%94%A9%EB%B0%95%EB%9E%8C%ED%9A%8C%EC%9D%BC%EC%A0%95&n_rank=5&n_ad_group=grp-a001-01-000000030312139&n_ad=nad-a001-01-000000262887424&n_keyword_id=nkw-a001-01-000005305637626&n_keyword=%EA%B4%91%EC%A3%BC%EC%9B%A8%EB%94%A9%EB%B0%95%EB%9E%8C%ED%9A%8C%EC%9D%BC%EC%A0%95&n_campaign_type=1&n_ad_group_type=1">
              <img src={AD2} alt="Image2"/>
            </Link>
          </div>
          <div>
            <Link to="https://gjweddingfair.co.kr/">
              <img src={AD3} alt="Image3"/>
            </Link>
          </div>
          <div>
            <Link to="https://mariej.co.kr/?str_title=1007-08_Naver&n_media=27758&n_query=%EA%B4%91%EC%A3%BC%EC%9B%A8%EB%94%A9%EB%B0%95%EB%9E%8C%ED%9A%8C%EC%9D%BC%EC%A0%95&n_rank=3&n_ad_group=grp-a001-01-000000033750991&n_ad=nad-a001-01-000000263325763&n_keyword_id=nkw-a001-01-000005292898851&n_keyword=%EA%B4%91%EC%A3%BC%EC%9B%A8%EB%94%A9%EB%B0%95%EB%9E%8C%ED%9A%8C%EC%9D%BC%EC%A0%95&n_campaign_type=1&n_ad_group_type=1">
              <img src={AD4} alt="Image4"/>
            </Link>
          </div>
        </Slider>
      </div>
    );
  }
  
  export default ADSlickSlider;