import React from "react";
import { Link } from "react-router-dom";

export function MenuCategoryItem(props) {
    // const [isCatShow, setIsCatShow] = useState(false);

    // const handleCatShow = () => {
    //     setIsCatShow(!isCatShow);
    // }

    const handleMouseEnter = () => {
        props.setActiveCategory(props.item.nameStr);
    };

    const handleMouseLeave = () => {
        props.setActiveCategory(null);
    };

    const handleLinkClick = () => {
        props.setActiveCategory(null);
        props.close();
    };

    return (
        <li
            className={`category-item ${props.isActive ? 'active' : ''}`}
            key={props.item.name}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <Link
                to={`/category/${props.item.nameStr}`}
                onClick={handleLinkClick}
            >
                {props.item.name}

            </Link>
            <i
                className="bi bi-chevron-right"

            ></i>
            {props.isActive &&
                (<ul
                    className='category-item-list'
                    key={'sub_category_' + props.item.name}
                >
                    {props.item.subCat.map((cat) =>
                        <li className='category-item' key={cat.name}>
                            <Link to={`/category/${props.item.nameStr}/${cat.nameStr}`}
                                onClick={handleLinkClick}
                            >
                                {cat.name}
                            </Link>
                        </li>)
                    }
                </ul>)}
        </li>
    );
}
