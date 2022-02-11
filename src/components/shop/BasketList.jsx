import {useContext} from 'react';
import {ShopContext} from '../../context';
import { BasketItem } from "./BasketItem";
import '../css/basket.css';

function BasketList() {
    const {order = []} = useContext(ShopContext);

    const totalPrice = order.reduce((sum, el) => {
        return (el.price_action ? (sum + el.price_action  * el.quantity )
            : (sum + el.price_normal  * el.quantity ))
    }, 0);

    return <div className="modal fade basket" id="modalCart" tabIndex="-1" aria-labelledby="modalCartLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="modalCartLabel">Корзина</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                <ul>
                    {
                        order.length ? (order.map(item => (
                                <BasketItem key={item.id} {...item} />))
                        ) : ( <li className="collection-item">Корзина пуста</li>)
                    }
                </ul>
                </div>
                <div className="modal-footer">
                    <div className='total-price'>Общая стоимость: {totalPrice} грн</div>
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
                    <button type="button" className="btn btn-danger">Оформить заказ</button>
                </div>
            </div>
        </div>
    </div>
        
}

export {BasketList}