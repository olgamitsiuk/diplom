import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {AutocompleteCollection} from "./AutocompleteCollection";
import { getAutoComplete } from '../../../api';

export function Autocomplete(){
    const [searchString, setSearchString] = useState("");
    const [items, setItems] = useState([]);
    const [isSearchShow, setSearchShow] = useState(false);

    const onChange = function (el) {
        setSearchString(el.target.value);
    }
    useEffect(() => {
        if (searchString.length < 2) return;
        getAutoComplete(searchString).then(res => {setItems(res); setSearchShow(true);})
            .catch(err =>
            console.log(err))
    }, [searchString]);

    const handleClose = () => {
        setSearchShow(false);
        setItems([]);
        let inputSearch = document.getElementById('search-input');
        inputSearch.value = "";
    }
    useEffect(() => {
        let inputSearch = document.getElementById('search-input');
        if (isSearchShow) {
            inputSearch.style.borderBottomLeftRadius = '0';
            inputSearch.style.borderBottomRightRadius = '0';
        } else {
            inputSearch.style.borderBottomLeftRadius = '10px';
            inputSearch.style.borderBottomRightRadius = '10px';
        }
    }, [isSearchShow]);



    return (
        <div className="search">
            <div className='search-input-group'>
            <input type="text" className="search-input" id='search-input'
                   onChange={onChange}  placeholder="Поиск..."/>
                <i className="bi bi-x-lg close" onClick={handleClose}></i>
                <Link to={`/search/${searchString}`} onClick={handleClose}><i className="bi bi-search"></i></Link>
            </div>
            {isSearchShow &&
            (<AutocompleteCollection items={items} close={handleClose} />)
            }
          </div>
    )
}