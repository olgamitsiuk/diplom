import React from 'react';
import Delivery1 from '../img/delivery1.jpg';
import Delivery2 from '../img/delivery2.jpg';
import '../css/blog.css'

export function DeliveryPage () {
    return <div className='container' >
        <div className='delivery-page'>
         <div>
            <h3>Правила проведения оплаты и доставки при совершении покупок в интернет-магазине:</h3>
            <h5>Оплата:</h5>
            <img src={Delivery1} alt="alt"/>
        </div>
        <div>
            <h5>Доставка:</h5>
            <img src={Delivery2} alt="alt"/>
       </div>
        </div>
    </div>
}