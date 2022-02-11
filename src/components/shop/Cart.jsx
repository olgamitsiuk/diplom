import React, {useContext} from 'react';
import {ShopContext} from '../../context';
import CartImg from '../img/cart-black.png';
import {BasketList} from "./BasketList";
import '../css/basket.css';

function Cart() {
    const {order} = useContext(ShopContext);
    
    const quantity = order.length;
    //console.log(order)
    return (<>
        <div className='basket-widget' data-bs-toggle="modal" data-bs-target="#modalCart">
        <img src={CartImg} alt="alt" />
        <div className="quantity">
                  {quantity ? <span >{quantity}</span>
                  : <span >0</span>}
        </div>
        </div>
            <BasketList/>
  </>
  )
}

export {Cart}