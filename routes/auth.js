const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Правильний імпорт
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
    try {
        // Додайте перевірку моделі
        if (!User || typeof User.findOne !== 'function') {
            throw new Error('User model is not properly initialized');
        }

        const existingUser = await User.findOne({
            $or: [
                { username: req.body.username },
                { email: req.body.email }
            ]
        });

        if (existingUser) {
            return res.status(409).json("User already exists");
        }

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: CryptoJS.AES.encrypt(
                req.body.password,
                process.env.PASS_SEC
            ).toString(),
        });

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        console.error('Registration error:', err);
        res.status(500).json(err.message);
    }
});
router.post('/login', async (req, res) => {
    try {
        console.log('Login attempt for:', req.body.username); // Логування

        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            console.log('User not found');
            return res.status(401).json("Wrong username or password");
        }

        // Дешифрування пароля
        const bytes = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);
        const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

        console.log('Input password:', req.body.password); // Логування (тимчасово)
        console.log('Decrypted password:', originalPassword); // Логування (тимчасово)

        if (originalPassword !== req.body.password) {
            console.log('Password mismatch');
            return res.status(401).json("Wrong username or password");
        }

        // Генерація токена
        const accessToken = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            process.env.JWT_SEC,
            { expiresIn: "3d" }
        );

        const { password, ...others } = user._doc;
        res.status(200).json({ ...others, accessToken });

    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json(err);
    }
});

module.exports = router;