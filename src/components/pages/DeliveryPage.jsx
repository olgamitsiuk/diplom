import React from 'react';
import Delivery1 from '../img/delivery1.jpg';
import Delivery2 from '../img/delivery2.jpg';
import '../css/blog.css'

export function DeliveryPage() {
    return <div className='container'>
        <div className='delivery-page'>
            <div>
                <h3>Rules for payment and delivery when making purchases in the online store:</h3>
                <h5>Payment:</h5>
                <img src={Delivery1} alt="payment methods" />
            </div>
            <div>
                <h5>Delivery:</h5>
                <img src={Delivery2} alt="delivery options" />
            </div>
        </div>
    </div>
}