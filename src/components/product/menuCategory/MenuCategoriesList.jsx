import { useState } from "react";
import { MenuCategoryItem } from "./MenuCategoryItem";
import { Link } from "react-router-dom";
import { CATEGORIES } from '../../constants/categories';

export function MenuCategoriesList(props) {
    const [activeCategory, setActiveCategory] = useState(null);

    return (
        <ul className='categories-list' key="category_list">
            {CATEGORIES.map((category, index) =>
                <MenuCategoryItem
                    key={`category_${index}`}
                    item={category}
                    close={props.close}
                    isActive={activeCategory === category.nameStr}
                    setActiveCategory={setActiveCategory}
                />
            )}
            <hr />
            <li className='phone-adaptive'>+38 (050) 194 51 16</li>
            <li><Link to='/delivery' className='menu-header-adaptive'>Delivery and Payment</Link></li>
            <li><Link to='/blog' className='menu-header-adaptive'>Blog</Link></li>
            <li><Link to='/contacts' className='menu-header-adaptive'>Contacts</Link></li>
            <li><Link to='product/sale' className='menu-header-adaptive'>Sales</Link></li>
        </ul>
    );
}