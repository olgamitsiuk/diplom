import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BASE_URL } from "../../config";

export default class SliderProduct extends Component {
    render() {
        const imgSmall = this.props.imgSmall;
        const settings = {
            customPaging: function (i) {
                return (
                    <a href="#!">
                        <img src={BASE_URL + imgSmall[i]} alt='product thumbnail' />
                    </a>
                );
            },
            dots: true,
            dotsClass: "slick-dots slick-thumb",
            fade: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: 0,
        };

        return (
            <div className='slider-product'>
                <Slider {...settings}>
                    {this.props.imgBig.map((img, index) =>
                        <div className='slide' key={`slide-img-${index}`}>
                            <img src={BASE_URL + img} alt="product" />
                        </div>
                    )}
                </Slider>
            </div>
        );
    }
}