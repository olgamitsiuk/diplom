import dotenv from 'dotenv';

// Загружаем переменные окружения
dotenv.config({
    path: process.env.NODE_ENV === 'production'
        ? '.env.production'
        : '.env.development'
});

const API_URL = process.env.API_URL || "/api/";

const BASE_URL = process.env.BASE_URL || "";

export {
    API_URL,
    BASE_URL
};