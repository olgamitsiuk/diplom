import { Link } from "react-router-dom";
import { BASE_URL } from "../../../config";

export function AutocompleteItem(props) {
    return (
        <li>
            <Link to={`/product/${props.item._id}`} onClick={props.close} >{props.item.name + ' ' + props.item.model}</Link>
            <img src={BASE_URL + props.item.image.big[0]} width="50px" alt={props.item.name} />
        </li>
    )

}