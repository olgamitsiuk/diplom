import { useEffect, useContext } from 'react';
import { ShopContext } from '../../context';
import '../css/alert-add-cart.css';

function Alert() {
    const { alertName: name = '', closeAlert = Function.prototype } = useContext(ShopContext);

    useEffect(() => {
        const timerId = setTimeout(closeAlert, 2000);

        return () => { clearTimeout(timerId) };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [name]);

    return <div className="toast-container">
        <div><p>{name} added to cart</p></div>
    </div>
}

export { Alert }