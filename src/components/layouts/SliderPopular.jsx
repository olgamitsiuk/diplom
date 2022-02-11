import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {getPopularProducts} from '../../api';
import {ProductCard} from "../product/productCard/ProductCard";
import '../css/slider-small.css'

export default class SliderPopular extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
        }
    }
    componentDidMount() {
        getPopularProducts().then(res => {
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
                    breakpoint: 991,
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
                <h1>Популярные товары</h1>
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