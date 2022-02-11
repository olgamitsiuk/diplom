import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import '../css/footer.css'
import {getCategories} from "../../api";
import Fb from '../img/fb.png';
import Telegram from '../img/telegram.png';
import Instagram from '../img/instagram.png';
import Youtube from '../img/youtube.png';

export function Footer () {
    const [categories, setCategories] = useState([]);

    useEffect( () => {
            getCategories().then(res => { setCategories(res); })
                .catch(err =>
                    console.log(err))},
        []);

    let key = 0;

    return <footer>
       <ul className='footer-category'>
           <li>Категории</li>
            {categories.map(category =>
                <li key={"category_" + (key++)} item={category}>
                    <Link to={`/category/${category.nameStr}`}>{category.name}</Link>
                </li>
            )}</ul>
       <ul>
           <li>О нас</li>
           <li><Link to='/contacts'>Контакты</Link></li>
           <li><Link to='/delivery'>Доставка</Link></li>
           <li><Link to='/delivery'>Возврат</Link></li>
       </ul>
       <ul>
            <li><Link to='/blog'>Блог</Link></li>
            <li><Link to='/blog'>Видео</Link></li>
       </ul>
       <ul>
           <li>Присоединяйтесь в соцсетях</li>
           <li>
               <a href="!#"><img src={Instagram} alt="alt"/></a>
               <a href="!#"><img src={Telegram} alt="alt"/></a>
               <a href="!#"><img src={Youtube} alt="alt"/></a>
               <a href="!#"><img src={Fb} alt="alt"/></a>
           </li>
       </ul>
       <ul>
            <li>Звоните нам</li>
            <li><a href="tel:+380501945116">(050) 19 45 116</a></li>
            <li><a href="tel:+380501945116">(050) 19 45 116</a></li>
            <li><a href="tel:+380501945116">(050) 19 45 116</a></li>
       </ul>

    </footer>
}