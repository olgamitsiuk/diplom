import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import {ProductCard} from "../product/productCard/ProductCard";
import {Preloader} from "../layouts/Preloader";
import {getAutoComplete} from "../../api";

export function SearchPage () {
    const [products, setProducts] = useState([]);
    const {searchString} = useParams();

    useEffect(() => {
        if (searchString.length < 2) return;
        getAutoComplete(searchString).then(res => {setProducts(res);})
            .catch(err =>
                console.log(err))
    }, [searchString]);

    return <div className='container'>
    <div className='product-list'>
        {
            !products.length ? (<Preloader/>) :
                products.map(product =>
                    <ProductCard product={product}/>)
        }
    </div></div>
}