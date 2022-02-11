import React, {useState} from "react";
import {Link} from "react-router-dom";

export function MenuCategoryItem (props){
    const [isCatShow, setIsCatShow] = useState(false);

    const handleCatShow = () => {
        setIsCatShow(!isCatShow);
    }
    return (
        <li className='category-item' key={props.item.name}>
            <Link to={`/category/${props.item.nameStr}`} onClick={props.close}>{props.item.name}

            </Link>
            <i className="bi bi-chevron-right" onClick={handleCatShow}></i>
            {(isCatShow === true) &&
            (<ul className='category-item-list' key={'sub_category_' + props.item.name}
                 onMouseLeave={() => setIsCatShow(false)} >
                {props.item.subCat.map((cat) =>
                        <li className='category-item' key={cat.name}>
                            <Link to={`/category/${props.item.nameStr}/${cat.nameStr}`} onClick={props.close}>
                                {cat.name}</Link></li>)
                }
            </ul>)}
        </li>
    );
}
