const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// Підключення до MongoDB
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log('DB Connected');

        // Запуск сервера після успішного підключення до БД
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`Backend server is running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.log('DB Connection Error:', err);
        process.exit(1); // Завершення процесу при помилці підключення
    });