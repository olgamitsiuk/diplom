import React from 'react';
import { Link } from "react-router-dom";
import Logo from '../img/logo.png';
import { Autocomplete } from "../product/autocomplete/Autocomplete";
import { MenuCategoryButton } from "../product/menuCategory/MenuCategoryButton";
import { Cart } from '../shop/Cart';
import '../css/header.css';
import '../css/header-media.css';
import { Star } from "../favorite/Star";

export function Header() {

    return (
        <div className='container'>
            <header>
                <section className='section-header'>
                    <div className='logo'>
                        <Link to='/'><img src={Logo} alt="logo" /></Link></div>
                    <ul className='menu-header'>
                        <li><Link to='/delivery'>Delivery and Payment</Link></li>
                        <li><Link to='/blog'>Blog</Link></li>
                        <li><Link to='/contacts'>Contacts</Link></li>
                        <li><Link to='/product/sale'>Sales</Link></li>
                    </ul>
                    <ul className='header-contact'>
                        <li className='phone'><a href="tel:+380501945116">(050) 19 45 116</a></li>
                        <li><Link to='/user'><i className="bi bi-person-circle" style={{ fontSize: '30px' }}></i></Link></li>
                    </ul>
                </section>
                <section className='section-header'>
                    <MenuCategoryButton />
                    <Autocomplete />
                    <div className='icons-header'>
                        <Star />
                        <Cart /></div>
                </section>

            </header>
        </div>
    );

}