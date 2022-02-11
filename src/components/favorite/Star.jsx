import React, {useContext} from 'react';
import {ShopContext} from '../../context';
import StarImg from '../img/star.png';
import '../css/favorite.css';
import {FavoriteList} from "./FavoriteList";

function Star () {
    const {favorite} = useContext(ShopContext);

    const quantity = favorite.length;
    //console.log(order)
    return (<>
            <div className='favorite-widget' data-bs-toggle="modal" data-bs-target="#modalStar">

                <img src={StarImg} alt="alt" />
                <div className="quantity">
                    {quantity ? <span >{quantity}</span>
                        : <span >0</span>}
                </div>
            </div>
        <FavoriteList/>
        </>
    )
}

export {Star}