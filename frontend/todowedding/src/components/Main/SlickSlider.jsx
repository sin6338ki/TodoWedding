import React from "react";
import { Link } from "react-router-dom";

//React-Slick 라이브러리
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

//Guide Image
import Main1 from "../../assets/images/SlickSlider/Slick_Img1.png";
import Main2 from "../../assets/images/SlickSlider/Slick_Img2.png";
import Main3 from "../../assets/images/SlickSlider/Slick_Img3.png";
import Main4 from "../../assets/images/SlickSlider/Slick_Img4.png";
import Main5 from "../../assets/images/SlickSlider/Slick_Img5.png";

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

    const images = [Main1, Main2, Main3, Main4, Main5];

    return (
        <div>
            <Slider {...settings} className="mt-[90px]">
                {images.map((image, index) => (
                    <div key={index}>
                        <Link to={`/todowedding/guide/${index + 1}`}>
                            <img src={image} alt={`Image${index + 1}`} />
                        </Link>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default SlickSlider;
