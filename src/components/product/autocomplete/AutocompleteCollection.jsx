import { AutocompleteItem } from "./AutocompleteItem"

export function AutocompleteCollection(props) {

    const items = props.items;
    const close = props.close;
    return (
        <ul className="autocompleteItemList">
            {
                items.length > 0 && items.map((item, index) => {
                    if (index < 5) {
                        return <AutocompleteItem key={item._id} item={item} close={close}></AutocompleteItem>
                    }
                    return null;
                }
                )}
        </ul>
    )
};