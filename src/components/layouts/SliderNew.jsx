import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {getNewProducts} from '../../api';
import {ProductCard} from "../product/productCard/ProductCard";

export default class SliderNew extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
        }
    }
    componentDidMount() {
        getNewProducts().then(res => {
            this.setState({products: res});
            //console.log(res)
        })
            .catch(err =>
                console.log(err))
    }
    render() {
        const settings = {
            dots: true,
            arrows: true,
            infinite: true,
            autoplay: false,
            autoplaySpeed: 4000,
            speed: 1000,
            slidesToShow: 4,
            slidesToScroll: 1,
            initialSlide: 0,
            adaptiveHeight: true,
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1,

                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }

                },
                {
                    breakpoint: 575,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }

                }
            ]
        };

        return (
            <div className='slider-small'>
            <h1>Новинки</h1>
                <Slider {...settings}>
                    { this.state.products.map(product =>
                        <ProductCard key={product._id} product={product}/>
                        )
                    }
                </Slider>
            </div>
        );
    }
}