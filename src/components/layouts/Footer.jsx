import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { getCategories } from "../../api";
import Fb from '../img/fb.png';
import Telegram from '../img/telegram.png';
import Instagram from '../img/instagram.png';
import Youtube from '../img/youtube.png';
import '../css/footer.css'

export function Footer() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getCategories()
            .then(res => {
                setCategories(res);
            })
            .catch(err =>
                console.log(err))
    },
        []);

    let key = 0;

    return <footer>
        <ul className='footer-category'>
            <li>Categories</li>
            {categories.map(category =>
                <li key={"category_" + (key++)} item={category}>
                    <Link to={`/category/${category.nameStr}`}>{category.name}</Link>
                </li>
            )}</ul>
        <ul>
            <li>About Us</li>
            <li><Link to='/contacts'>Contacts</Link></li>
            <li><Link to='/delivery'>Delivery</Link></li>
            <li><Link to='/delivery'>Returns</Link></li>
        </ul>
        <ul>
            <li><Link to='/blog'>Blog</Link></li>
            <li><Link to='/blog'>Video</Link></li>
        </ul>
        <ul>
            <li>Join us on social media</li>
            <li>
                <a href="!#"><img src={Instagram} alt="alt" /></a>
                <a href="!#"><img src={Telegram} alt="alt" /></a>
                <a href="!#"><img src={Youtube} alt="alt" /></a>
                <a href="!#"><img src={Fb} alt="alt" /></a>
            </li>
        </ul>
        <ul>
            <li>Call us</li>
            <li><a href="tel:+380501945116">(050) 19 45 116</a></li>
            <li><a href="tel:+380501945116">(050) 19 45 116</a></li>
            <li><a href="tel:+380501945116">(050) 19 45 116</a></li>
        </ul>

    </footer>
}