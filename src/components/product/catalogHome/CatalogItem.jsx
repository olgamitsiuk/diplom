import React from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../../config";

export function CatalogItem(props) {

    return (
        <div className='catalog-item' >
            <Link to={`/category/${props.item.nameStr}`} key={props.item.name}>
                <img src={BASE_URL + props.item.image} alt="alt" />
                <p>{props.item.name}</p>
            </Link></div>
    );
}
