export function reducer(state, {type, payload}) {
    switch(type) {

        case 'ADD_TO_BASKET': {
            const itemIndex = state.order.findIndex(
                (orderItem) => orderItem.id === payload.id);
            let newOrder = null;    
            if (itemIndex < 0 ) {
                const newItem = {
                    ...payload,
                    quantity: 1
                };
            newOrder = [...state.order, newItem]    
            } else {
               newOrder = state.order.map((orderItem, index) => {
                    if (index === itemIndex) {
                        return {
                            ...orderItem,
                            quantity: orderItem.quantity + 1
                        }
                    } else {
                        return orderItem;
                    }
                });
            }
            return {
                ...state,
                order: newOrder,
                alertName: payload.name
            }
    }
        case 'REMOVE_FROM_BASKET':
            return {
                ...state,
                order: state.order.filter((el)=> el.id !== payload.id ),
            }

        case 'INCREMENT_QUANTITY':
            return{
                ...state,
                order: state.order.map(el => {
                    if (el.id=== payload.id) {
                        const newQuantity = el.quantity + 1;
                        return {
                            ...el,
                            quantity: newQuantity,
                        };
                    } else {
                        return el;
                    }
                }),
            };
        case 'DECREMENT_QUANTITY':
            return {
                ...state,
                order: state.order.map((el) => {
                    if (el.id === payload.id) {
                        const newQuantity = el.quantity - 1;
                        return {
                            ...el,
                            quantity: newQuantity >=0 ? newQuantity : 0,
                        };
                    } else {
                        return el;
                    }
                }),
            };
        case 'CLOSE_ALERT':
            return {
                ...state,
                alertName: '',
            };
        default :
            return state;

        case 'ADD_TO_FAVORITE': {
            const itemIndex = state.favorite.findIndex(
                (favoriteItem) => favoriteItem.id === payload.id);
            let newFav = null;
            if (itemIndex < 0 ) {
                const newItem = {
                    ...payload,

                };
                newFav = [...state.favorite, newItem]

            } else {
                newFav = state.favorite.filter((favoriteItem)=> favoriteItem.id !== payload.id )

            }
            return {
                ...state,
                favorite: newFav,
            }
        }
        case 'REMOVE_FROM_FAVORITE':
            return {
                ...state,
                favorite: state.favorite.filter((el)=> el.id !== payload.id ),
            }
    }

}