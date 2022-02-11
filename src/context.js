import {useEffect, createContext, useReducer } from "react";
import {reducer} from './reducer';

export const ShopContext = createContext();

const initialState = {
    order:
        JSON.parse(localStorage.getItem("order")) === null
            ? []
            : JSON.parse(localStorage.getItem("order")),
    favorite:
        JSON.parse(localStorage.getItem("favorite")) === null
            ? []
            : JSON.parse(localStorage.getItem("favorite")),
    alertName: '',
};

export const ContextProvider = ({children}) => {

    const [value, dispatch] = useReducer(reducer, initialState);

    useEffect(
        () => {
            localStorage.setItem("favorite", JSON.stringify(value.favorite));
            //console.log(JSON.parse(localStorage.getItem("favorite")))
        },
        [value.favorite]
    );
    useEffect(
        () => {
            localStorage.setItem("order", JSON.stringify(value.order));
        },
        [value.order]
    );

    value.closeAlert = () => {
        dispatch({type: 'CLOSE_ALERT'});
    };

    value.addToBasket = (item) => {
        dispatch({type: 'ADD_TO_BASKET', payload: item});
    }

    value.incQuantity = (itemId) => {
        dispatch({type: 'INCREMENT_QUANTITY', payload: {id: itemId} });
    }

    value.decQuantity = (itemId) => {
        dispatch({type: 'DECREMENT_QUANTITY', payload: {id: itemId} });
    }

    value.removeFromBasket = (itemId) => {
        dispatch({type: 'REMOVE_FROM_BASKET', payload: {id: itemId} });
    }
    value.addToFavorite = (item) => {
        dispatch({type: 'ADD_TO_FAVORITE', payload: item});
    };
    value.removeFromFavorite= (itemId) => {
        dispatch({type: 'REMOVE_FROM_FAVORITE', payload: {id: itemId} });
    }

    return <ShopContext.Provider value={value}>
        {children}
    </ShopContext.Provider>
}