import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { getProductsBySubCategoryName } from '../../api';
import { ProductCard } from "../product/productCard/ProductCard";
import { findSubcategoryByName } from '../constants/categories';
import { Preloader } from '../layouts/Preloader';

export function SubCategory() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const { categoryName, subCategoryName } = useParams();
    const navigate = useNavigate();

    // Получаем данные подкатегории из статических данных
    const subcategory = findSubcategoryByName(categoryName, subCategoryName);

    // Редирект если подкатегория не найдена
    useEffect(() => {
        if (!subcategory) {
            navigate('/');
        }
    }, [subcategory, navigate]);

    // Загрузка продуктов
    useEffect(() => {
        if (subcategory) {
            setIsLoading(true);
            setError(null);

            getProductsBySubCategoryName(subCategoryName)
                .then(res => {
                    setProducts(res);
                })
                .catch(err => {
                    console.error('Error loading products:', err);
                    setError('Failed to load products. Please try again later.');
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
    }, [subCategoryName, subcategory]);

    const goBack = () => navigate(-1);

    if (!subcategory) {
        return null; // Компонент вернет null перед редиректом
    }

    return (
        <div className='container category-header'>
            <div className='header-name'>
                <button
                    type='button'
                    className='btn btn-danger back'
                    onClick={goBack}
                >
                    <i className="bi bi-chevron-left"></i>Back
                </button>
                <h1 className='subcatName'>{subcategory.name}</h1>
            </div>

            {isLoading ? (
                <Preloader />
            ) : error ? (
                <div className="alert alert-danger">
                    {error}
                </div>
            ) : products.length === 0 ? (
                <div className="alert alert-info">
                    No products found in this category
                </div>
            ) : (
                <div className='product-list'>
                    {products.map(product => (
                        <ProductCard
                            key={product._id}
                            product={product}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}