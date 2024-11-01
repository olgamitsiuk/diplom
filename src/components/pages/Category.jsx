import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { getProductsByCategoryName } from '../../api';
import { findCategoryByName } from '../constants/categories';
import { CategoryHeader } from "../layouts/CategoryHeader";
import { CategoryProductsList } from "../layouts/CategoryProductsList";
import '../css/category.css';
import { Preloader } from "../layouts/Preloader";

export function Category() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { categoryName } = useParams();
    const navigate = useNavigate();

    const category = findCategoryByName(categoryName);

    useEffect(() => {
        if (!category) {
            navigate('/');
        }
    }, [category, navigate]);

    useEffect(() => {
        if (category) {
            setIsLoading(true);
            getProductsByCategoryName(categoryName)
                .then(res => {
                    setProducts(res);
                })
                .catch(err => {
                    console.error('Error loading products:', err);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
    }, [categoryName, category]);

    const goBack = () => navigate(-1);

    if (isLoading) {
        return <Preloader />;
    }

    if (!category) {
        return null;
    }

    return (
        <div className='container'>
            <CategoryHeader category={category} goBack={goBack} />
            <CategoryProductsList products={products} />
        </div>
    );
}