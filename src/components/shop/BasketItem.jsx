import {useContext} from 'react';
import {ShopContext} from '../../context';

function BasketItem(props) {
 const {
        id,
        name,
        model,
        img,
        price_action,
        price_normal,
        quantity,
        } = props;

const { removeFromBasket,
        incQuantity,
        decQuantity} = useContext(ShopContext);
    

    return <li className="collection-item" >
                <ul className="collection-item-list"  >
                <li><img src={img} alt="alt"/></li>
                <li >{name} {model}</li>
                <li ><i className="bi bi-dash-circle-fill" onClick={() => decQuantity(id)}></i>
                    {quantity}
                    <i className="bi bi-plus-circle-fill" onClick={() => incQuantity(id)}></i>
                </li>
                <li >{price_action ?  (price_action* quantity)
                    : (price_normal* quantity)
                } грн.</li>
                <li ><i className="bi bi-x-lg" onClick={() => removeFromBasket(id)}></i></li>
                </ul></li>

}

export {BasketItem}