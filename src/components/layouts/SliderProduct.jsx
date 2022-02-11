import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


export default class SliderProduct extends Component {
      constructor(props) {
        super(props);
      }

    render() {
        const imgSmall = this.props.imgSmall;
           const settings = {
            customPaging: function(i) {
            return (
                    <a>
                        <img src={"http://localhost:3001" + imgSmall[i]} alt='alt'/>
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
                      {

                       this.props.imgBig.map (img =>
                            <div className='slide' key='slide-img'>
                                     <img src={"http://localhost:3001" + img} alt="alt"/>
                           </div>)
                        }
                </Slider>
            </div>
        );
    }
}