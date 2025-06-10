// src/redux/requestMethods.js

import axios from "axios";

const BASE_URL = "http://localhost:5000/api"; // заміни на свій бекенд URL, якщо потрібно

// Публічні запити — без авторизації (реєстрація, логін тощо)
export const publicRequest = axios.create({
    baseURL: BASE_URL,
});

// Запити для авторизованих користувачів — з JWT токеном в заголовку
export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: { token: `Bearer ${localStorage.getItem("accessToken")}` },
});
