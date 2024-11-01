import React from 'react';
import { Link } from "react-router-dom";
import { Preloader } from "./Preloader";
import { BASE_URL } from '../../config';

export function CategoryHeader(props) {

    return <div className='category-header'>

        {!props.category.length ? (<Preloader />) :
            (<><div className='header-name'>
                <button type='button' className='btn btn-danger back' onClick={props.goBack}>
                    <i className="bi bi-chevron-left"></i>Back</button>
                <h1>{props.category[0].name}</h1></div>
                <div className="category-list" key={props.category[0].name} >
                    {
                        props.category[0].subCat.map(subCat =>
                            <div key={subCat.name}><Link to={`/category/${props.category[0].nameStr}/${subCat.nameStr}`} >
                                <img src={BASE_URL + subCat.img} alt="alt" />
                                {subCat.name}</Link></div>)
                    }
                </div>
            </>)}
    </div>
}