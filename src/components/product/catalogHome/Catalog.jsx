import { useEffect, useState } from "react";
import { getCategories } from "../../../api";
import { CatalogItem } from "./CatalogItem";
import '../../css/catalog.css';
import { Preloader } from "../../layouts/Preloader";


export function Catalog() {
    const [categories, setCategories] = useState([]);
    const [isLoad, setIsLoad] = useState(false);

    useEffect(() => {
        getCategories().then(res => { setCategories(res); setIsLoad(true) })
            .catch(err =>
                console.log(err))
    },
        []);

    if (!isLoad) return (
        <Preloader />
    );
    let key = 0;
    return (<div className='catalog'>
        <h1>Catalog</h1>
        <div className='catalog-list' key="catalog_list">
            {categories.map(category =>
                <CatalogItem key={"category_" + (key++)} item={category}></CatalogItem>
            )}
        </div></div>
    );
}