import React from 'react';
import { Link } from "react-router-dom";
import { BASE_URL } from '../../config';

export function CategoryHeader({ category, goBack }) {
    if (!category) {
        return null;
    }

    return (
        <div className='category-header'>
            <div className='header-name'>
                <button
                    type='button'
                    className='btn btn-danger back'
                    onClick={goBack}
                >
                    <i className="bi bi-chevron-left"></i>Back
                </button>
                <h1>{category.name}</h1>
            </div>
            <div className="category-list" key={category.name}>
                {category.subCat.map(subCat => (
                    <div key={subCat.name}>
                        <Link to={`/category/${category.nameStr}/${subCat.nameStr}`}>
                            <img
                                src={BASE_URL + subCat.img}
                                alt={subCat.name}
                            />
                            {subCat.name}
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}