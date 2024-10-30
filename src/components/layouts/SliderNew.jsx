import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getNewProducts } from '../../api';
import { ProductCard } from "../product/productCard/ProductCard";

export default class SliderNew extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            isLoading: true
        }
    }

    componentDidMount() {
        getNewProducts()
            .then(res => {
                this.setState({
                    products: res,
                    isLoading: false
                });
                // console.log('Products loaded:', res);
            })
            .catch(err => {
                console.error('Error loading products:', err);
                this.setState({ isLoading: false });
            });
    }

    render() {
        const { products, isLoading } = this.state;

        if (isLoading) {
            return <div>Loading...</div>;
        }

        if (!products || products.length === 0) {
            return <div>No products available</div>;
        }

        const settings = {
            dots: true,
            arrows: true,
            infinite: products.length > 4,
            autoplay: false,
            autoplaySpeed: 4000,
            speed: 1000,
            slidesToShow: Math.min(4, products.length),
            slidesToScroll: 1,
            initialSlide: 0,
            adaptiveHeight: true,
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: Math.min(3, products.length),
                        slidesToScroll: 1,
                        infinite: products.length > 3,
                        dots: true
                    }
                },
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: Math.min(3, products.length),
                        slidesToScroll: 1,
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: Math.min(2, products.length),
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
                    {products.map(product => (
                        <div key={product._id}>
                            <ProductCard product={product} />
                        </div>
                    ))}
                </Slider>
            </div>
        );
    }
}