import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { getProductsByCategoryName } from '../../api';
import { getCategoryByName } from '../../api';
import { CategoryHeader } from "../layouts/CategoryHeader";
import { CategoryProductsList } from "../layouts/CategoryProductsList";
import '../css/category.css';
import { Preloader } from "../layouts/Preloader";

export function Category() {
    const [category, setCategory] = useState({});
    const [products, setProducts] = useState([]);
    const [isLoad, setIsLoad] = useState(false);
    const { categoryName } = useParams();

    const navigate = useNavigate();
    const goBack = () => navigate(-1);

    useEffect(() => {
        getCategoryByName(categoryName).then(res => {
            setCategory(res);
            setIsLoad(true);
        })
            .catch(err =>
                console.log(err))
    }, [categoryName]);

    useEffect(() => {
        getProductsByCategoryName(categoryName).then(res => {
            setProducts(res);
            setIsLoad(true);
        })
            .catch(err =>
                console.log(err))
    }, [categoryName]);

    if (!isLoad) return (
        <Preloader />
    );

    return <div className='container'>
        <CategoryHeader category={category} goBack={goBack} />
        <CategoryProductsList products={products} />
    </div>
}


