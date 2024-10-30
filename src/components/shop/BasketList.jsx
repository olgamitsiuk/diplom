import { useContext } from 'react';
import { ShopContext } from '../../context';
import { BasketItem } from "./BasketItem";
import '../css/basket.css';

function BasketList() {
    const { order = [] } = useContext(ShopContext);

    const totalPrice = order.reduce((sum, el) => {
        return (el.price_action ? (sum + el.price_action * el.quantity)
            : (sum + el.price_normal * el.quantity))
    }, 0);

    return <div className="modal fade basket" id="modalCart" tabIndex="-1" aria-labelledby="modalCartLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="modalCartLabel">Cart</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <ul>
                        {
                            order.length ? (order.map(item => (
                                <BasketItem key={item.id} {...item} />))
                            ) : (<li className="collection-item">Cart is empty</li>)
                        }
                    </ul>
                </div>
                <div className="modal-footer">
                    <div className='total-price'>Total price: {totalPrice} UAH</div>
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-danger">Checkout</button>
                </div>
            </div>
        </div>
    </div>
}

export { BasketList }