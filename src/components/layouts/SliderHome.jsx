import React, { Component } from "react";
import Slider from "react-slick";
import {Link} from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../css/slider.css';
import Slider1 from '../img/slider1.jpg';

export default class SliderHome extends Component {
    render() {
        const settings = {
            dots: true,
            arrows: true,
            infinite: true,
            autoplay: true,
            autoplaySpeed: 4000,
            speed: 1000,
            slidesToShow: 1,
            slidesToScroll: 1
        };
        return (
            <div className='slider-home'>
                <Slider {...settings}>
                    <div>
                        <div className='slide'>
                            <img src={Slider1} alt="alt"/>
                            <div className='elips'>
                                <img src="" alt=""/>
                                <h1>Ударь <br/>по басам!</h1>
                                <div className='line'></div>
                                <p>Распродажа бас-гитарных усилителей</p>
                                <Link to='product/sale' className='btn'>Выбрать</Link>

                            </div>
                        </div>
                    </div>
                    <div>
                        <div className='slide'>
                            <img src={Slider1} alt="alt"/>
                            <div className='elips'>
                                <h1>Время <br/>подарков!</h1>
                                <div className='line'></div>
                                <p>Более 300 позиций со скидками</p>
                                <Link to='product/sale' className='btn'>Выбрать</Link>

                            </div>
                        </div>
                    </div>
                    <div>
                        <div className='slide' >
                            <img src={Slider1} alt="alt"/>
                            <div className='elips'>
                                <h1>Время <br/>подарков!</h1>
                                <div className='line'></div>
                                <p>Более 300 позиций со скидками</p>
                                <Link to='product/sale' className='btn'>Выбрать</Link>

                            </div>
                        </div>
                    </div>
                </Slider>
            </div>
        );
    }
}