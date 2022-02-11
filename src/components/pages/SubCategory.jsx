import React, { useEffect, useState }  from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {getProductsBySubCategoryName} from '../../api';
import {ProductCard} from "../product/productCard/ProductCard";


export function SubCategory () {
    const [products, setProducts] = useState([]);
    const {subCategoryName} = useParams();
    const navigate = useNavigate();
    const goBack = () => navigate(-1);

    useEffect(() => {
        getProductsBySubCategoryName(subCategoryName).then(res => {
            setProducts(res);
        })
            .catch(err =>
                console.log(err))
    },[subCategoryName]);

    return <div className='container category-header'>
        <div className='header-name'>
        <button type='button' className='btn btn-danger back' onClick={goBack}>
            <i className="bi bi-chevron-left"></i>Назад</button>
            {products.length ? <h1 className='subcatName'>{products[0].subCatName}</h1> : null}</div>
        <div className='product-list'>
        {
            products.map(product =>
                <ProductCard key={product._id} product={product}/>)
        }
    </div></div>
}


