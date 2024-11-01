import React from "react";
import { CATEGORIES } from "../../constants/categories";
import { CatalogItem } from "./CatalogItem";
import '../../css/catalog.css';

export function Catalog() {
    return (
        <div className='catalog'>
            <h1>Catalog</h1>
            <div className='catalog-list' key="catalog_list">
                {CATEGORIES.map((category, index) =>
                    <CatalogItem
                        key={`category_${index}`}
                        item={category}
                    />
                )}
            </div>
        </div>
    );
}