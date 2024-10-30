import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { AutocompleteCollection } from "./AutocompleteCollection";
import { getAutoComplete } from '../../../api';

export function Autocomplete() {
    const [searchString, setSearchString] = useState("");
    const [items, setItems] = useState([]);
    const [isSearchShow, setSearchShow] = useState(false);
    const searchRef = useRef(null);

    useEffect(() => {
        if (searchString.length < 2) {
            setItems([]);
            setSearchShow(false);
            return;
        }
        getAutoComplete(searchString)
            .then(res => {
                setItems(res);
                if (items.length > 0) {
                    setSearchShow(true);
                }
            })
            .catch(err => {
                console.log(err);
                setItems([]);
                setSearchShow(false);
            })

    }, [searchString]);
    // console.log(searchString);

    // useEffect(() => {
    //     let inputSearch = document.getElementById('search-input');
    //     if (isSearchShow) {
    //         inputSearch.style.borderBottomLeftRadius = '0';
    //         inputSearch.style.borderBottomRightRadius = '0';
    //     } else {
    //         inputSearch.style.borderBottomLeftRadius = '10px';
    //         inputSearch.style.borderBottomRightRadius = '10px';
    //     }
    // }, [isSearchShow]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setSearchShow(false);
                setItems([]);
                setSearchString("");
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    const handleClose = () => {
        setSearchShow(false);
        setItems([]);
        setSearchString("");
    }

    const onChange = function (el) {
        setSearchString(el.target.value);
    }

    return (
        <div className="search" ref={searchRef}>
            <div className='search-input-group'>
                <input
                    id='search-input'
                    className="search-input"
                    value={searchString}
                    onChange={onChange}
                    type="text"
                    placeholder="Поиск..."
                />
                <i className="bi bi-x-lg close" onClick={handleClose}></i>
                <Link to={`/search/${searchString}`} onClick={handleClose}><i className="bi bi-search"></i></Link>
            </div>
            {isSearchShow &&
                (<AutocompleteCollection items={items} close={handleClose} />)
            }
        </div>
    )
}