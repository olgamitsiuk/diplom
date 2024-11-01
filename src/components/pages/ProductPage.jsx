import { useParams } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import { ShopContext } from '../../context';
import { getProductById } from '../../api';
import { Preloader } from "../layouts/Preloader";
import SliderProduct from "../layouts/SliderProduct";
import { BASE_URL } from "../../config";
import '../css/product-page.css';

export function ProductPage() {
    const [product, setProduct] = useState({});
    const [isLoad, setIsLoad] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const { id } = useParams();
    const { addToBasket, favorite, addToFavorite } = useContext(ShopContext);

    useEffect(() => {
        if (favorite.some(prod => prod.id === product._id)) {
            setIsFavorite(true)
        } else {
            setIsFavorite(false)
        }
    }, [favorite, product._id]  // Added product._id as dependency
    )

    useEffect(() => {
        getProductById(id).then(res => {
            setProduct(res);
            setIsLoad(true);
        })
            .catch(err =>
                console.log(err))
    }, [id]);

    if (!isLoad) return (
        <Preloader />
    );

    if (product) {
        return (
            <div className='container product-page'>
                <div className='product-img-wrap'>
                    <SliderProduct imgBig={product.image.big} imgSmall={product.image.small} />

                    <div className="product-description">
                        <h3>{product.model}</h3>
                        <i className={isFavorite ? "bi bi-star-fill star" : "bi bi-star star"}
                            style={isFavorite ? { color: "#BD1522" } : { color: "black" }}
                            onClick={() =>
                                addToFavorite({
                                    id: product._id,
                                    name: product.name,
                                    price_action: product.price_action,
                                    price_normal: product.price_normal,
                                    model: product.model,
                                    img: product.image.big[0]
                                })
                            }
                        > </i>
                        <p>{product.description}</p>
                        <div className='price'>
                            {
                                product.price_action ? (<p><span style={{ color: '#BD1522' }}>{product.price_action} UAH</span><del>
                                    <br /> <span>{product.price_normal} UAH</span> </del></p>) : <p>{product.price_normal} UAH</p>
                            }
                        </div>
                        <button className='add-cart'
                            onClick={() =>
                                addToBasket({
                                    id,
                                    name: product.name,
                                    price_action: product.price_action,
                                    price_normal: product.price_normal,
                                    model: product.model,
                                    img: product.image.big[0]
                                })
                            }>
                            Add to Cart</button>
                    </div>
                </div>
                <div className='wrap-characteristics'>
                    <h3>Specifications</h3>
                    <ul className='characteristics'>
                        {
                            product.characteristics.map(characteristic =>
                                <li key={characteristic.name}>{characteristic.name}<span>{characteristic.value}</span></li>
                            )
                        }
                    </ul>
                    <p>{product.description_full}</p>
                </div>
            </div>
        );
    }
    else { return <h1>404 not found</h1> }
}