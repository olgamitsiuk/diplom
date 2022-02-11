import React, {useState} from "react";
import {MenuCategoriesList} from "./MenuCategoriesList";

export function MenuCategoryButton() {
    const [isMenuShow, setMenuShow] = useState(false);
    const hideMenu = () => {
        setMenuShow( false);
    }
    const handleMenuShow = () => {
        setMenuShow(!isMenuShow);
    };
    return (
        <div className='menu-btn-group'>
            <button type="button" className="btn btn-danger btn-menu" onClick={handleMenuShow} >
                {isMenuShow
                    ? <i className="bi bi-x-lg"></i>
                    : <i className="bi bi-list"></i>} <span>Категории</span>
            </button>
            {isMenuShow &&
            (<MenuCategoriesList close={hideMenu}/>)
            }
        </div>
       )
}