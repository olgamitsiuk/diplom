import {useContext} from 'react';
import {ShopContext} from '../../context';
import {Link} from "react-router-dom";

function FavoriteItem(props) {
    const {
        id,
        name,
        model,
        img,
        price_action,
        price_normal,

    } = props;
    const { removeFromFavorite} = useContext(ShopContext);

    return <li className="collection-item" >
        <ul  className="collection-item-list" >
            <li><img src={img} alt="alt"/></li>
            <li><Link to={`/product/${id}`}><span>{name}</span> <br/> {model}</Link></li>
            <li >
                {
                    price_action ? (<p><span style={{color: '#BD1522'}}>{price_action} грн.</span><del>
                        <br /> <span>{price_normal} грн.</span> </del></p>)  : price_normal + "грн."}
            </li>
            <li ><i className="bi bi-star-fill" style={{color: '#BD1522'}} onClick={() => removeFromFavorite(id)}></i></li>
        </ul></li>

}

export {FavoriteItem}