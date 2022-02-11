import {AutocompleteItem} from "./AutocompleteItem"

export function AutocompleteCollection (props){
    const items = props.items;
    const close = props.close;
    return (
        <ul className="autocompleteItemList">
            {
                items.map( item => 
                <AutocompleteItem key={item._id} item={item} close={close}></AutocompleteItem>
           )}
        </ul>
)
};