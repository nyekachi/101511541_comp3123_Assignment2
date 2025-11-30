const user = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const signup = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        // Check if user already exists
        const existingUser = await user.findOne({ $or: [{ username }, { email }] });
        if (existingUser) return res.status(400).json({ status: false , message: 'Username or email already exists' });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new user({ username, email, password: hashedPassword });
        await user.save();

        res.status(201).json({ status: true, message: 'User registered successfully.', userId: user._id });
    } catch (error) {
        next(error);
    }  
};

const login = async (req, res, next) => {
    try {
        const{password} = req.body;
        // User can send either username or email to login
        const identifier = req.body.email || req.body.username;
        if (!identifier) return res.status(400).json({ status: false, message: 'Please provide username or email' });

        const user = await user.findOne({ $or: [{ username: identifier }, { email: identifier }] });
        if (!user) return res.status(400).json({ status: false, message: 'Invalid username/email or password' });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).json({ status: false, message: 'Invalid username/email or password' });

        //optional JWT
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        return res.status(200).json({ status: true, message: 'Login successful',jwt_token: token });
    } catch (error) {
        next(error);
    }
};

module.exports = { signup, login };