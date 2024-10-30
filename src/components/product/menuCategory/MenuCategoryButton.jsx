import React, { useState, useEffect, useRef } from "react";
import { MenuCategoriesList } from "./MenuCategoriesList";

export function MenuCategoryButton() {
    const [isMenuShow, setMenuShow] = useState(false);
    const menuRef = useRef(null);

    const hideMenu = () => {
        setMenuShow(false);
    }
    const handleMenuShow = () => {
        setMenuShow(!isMenuShow);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuShow(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className='menu-btn-group' ref={menuRef}>
            <button type="button" className="btn btn-danger btn-menu" onClick={handleMenuShow}>
                {isMenuShow
                    ? <i className="bi bi-x-lg"></i>
                    : <i className="bi bi-list"></i>} <span>Categories</span>
            </button>
            {isMenuShow &&
                (<MenuCategoriesList close={hideMenu} />)
            }
        </div>
    )
}