import React from 'react';
import { Link } from "react-router-dom";
import Blog1 from '../img/blog1.png';
import Blog2 from '../img/blog2.png';
import '../css/blog.css'

export function Blog() {
    return <div className='blog'>
        <h1>Blog</h1>
        <div className='blog-content'>
            <Link to={'/blog'} className='blog-article'>
                <img src={Blog1} alt="alt" />
                <p>How to properly change strings<i className="bi bi-chevron-right"></i></p>
            </Link>
            <Link to={'/blog'} className='blog-article'>
                <img src={Blog2} alt="alt" />
                <p>Guitar riffs<i className="bi bi-chevron-right"></i></p>
            </Link>
        </div>
    </div>
}