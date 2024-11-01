import React from 'react';
import TelegramBot from "../layouts/TelegramBot";

export function ContactPage() {
    return <div className='container'>
        <div className='contact-info'>
            <h1>Our Contacts</h1>
            <h5>Online Store</h5>
            <p>Kyiv, Stepana Bandery Ave., 28A, SP HALL</p>
            <p>(067) 448-32-61; (066) 229-94-94; (073) 229-94-94</p>
            <p>shop@muztorg.ua</p>
            <h5>Working Hours:</h5>
            <p>Mon-Fri: 10:00 AM to 6:00 PM no break</p>
            <p>Sat: 11:00 AM to 6:00 PM no break</p>
            <p>Sun: 12:00 PM to 6:00 PM no break</p>
        </div>
        <iframe
            title="Store Location Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5444.727858321017!2d31.99963967331444!3d46.974186107420245!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40c5c97741634373%3A0x109ad16f7ee5ae03!2z0KHQvtCx0L7RgNC90LAg0L_Qu9C-0YnQsA!5e0!3m2!1sen!2sua!4v1644505033778!5m2!1sen!2sua"
            style={{ width: "100%", height: "300px", border: 0 }}
            allowFullScreen=""
            loading="lazy">
        </iframe>
        <TelegramBot />
    </div>
}