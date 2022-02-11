import React from "react";
import {Link} from "react-router-dom";

export function CatalogItem (props){

    return (
        <div  className='catalog-item' >
        <Link to={`/category/${props.item.nameStr}`} key={props.item.name}>
            <img src={"http://localhost:3001" + props.item.image} alt="alt"/>
            <p>{props.item.name}</p>
        </Link></div>
    );
}
