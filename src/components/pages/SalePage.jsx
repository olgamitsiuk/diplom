import React, { useEffect, useState }  from 'react';
import {useNavigate} from "react-router-dom";
import {getSaleProducts} from '../../api';
import {ProductCard} from "../product/productCard/ProductCard";


export function SalePage () {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const goBack = () => navigate(-1);

    useEffect(() => {
        getSaleProducts().then(res => {
            setProducts(res);
        })
            .catch(err =>
                console.log(err))
    },[]);

    return <div className='container category-header'>
        <div className='header-name'>
            <button type='button' className='btn btn-danger back' onClick={goBack}>
                <i className="bi bi-chevron-left"></i>Назад</button>
                <h1>Распродажа</h1></div>
            <div className='product-list'>
                {
                    products.map(product =>
                        <ProductCard key={product._id} product={product}/>)
                }
            </div></div>
}


