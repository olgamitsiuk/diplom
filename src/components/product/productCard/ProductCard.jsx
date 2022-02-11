import { useContext, useEffect, useState } from 'react';
import {Link} from "react-router-dom";
import '../../css/product-card.css';
import Cart from '../../img/cart-red.png';
import New from '../../img/new.png';
// import Star from '../../img/star.png';
// import StarRed from '../../img/cart-red.png';
import {ShopContext} from "../../../context";

export function ProductCard (props){

    const {product} = props;
    const {addToBasket, addToFavorite, favorite} = useContext(ShopContext);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        if (favorite.some(prod => prod.id === product._id)) {
            setIsFavorite(true)
        } else {
            setIsFavorite(false)
        }
    }, [favorite]
    )

    return (

       <div className="product-card">
           <div className='product-card-img'>
               {
                    product.new === 'new' && (<img src={New} alt="alt" className='new-icon'/>)
               }
           <i className={isFavorite ? "bi bi-star-fill star" : "bi bi-star star"}
              style={isFavorite ? {color: "#BD1522"}: {color: "black"}}
                onClick={() =>
                    addToFavorite({
                        id: product._id,
                        name: product.name,
                        price_action: product.price_action,
                        price_normal: product.price_normal,
                        model: product.model,
                        img: "http://localhost:3001" + product.image.big[0]
                    })
                }

           > </i>
           <img src={"http://localhost:3001" + product.image.big[0]} className="card-img" alt={product.name}/></div>
           <Link to={`/product/${product._id}`}   className="product-card-body">
                <p className='product-name'>{product.name}</p>
                <p className='product-model'>{props.product.model}</p></Link>
               <div className='product-price'>
                <div className="card-price"> {
                    product.price_action ? (<p><span style={{color: '#BD1522'}}>{product.price_action} грн.</span><del>
                        <br /> <span>{product.price_normal} грн.</span> </del></p>)  : product.price_normal + "грн."
                } </div>
                <img src={Cart} alt="alt"
                     className='cart'
                     onClick={() =>
                         addToBasket({
                             id: product._id,
                             name: product.name,
                             price_action: product.price_action,
                             price_normal: product.price_normal,
                             model: product.model,
                             img: "http://localhost:3001" + product.image.big[0]
                         })
                     }
                /></div>

    </div>
    )
}