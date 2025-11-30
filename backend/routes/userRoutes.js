const express = require('express');
const router = express.Router();
const {signup, login} = require('../controllers/usercontroller');
const{body} = require('express-validator');
const validateRequest = require('../middleware/validateRequest');

router.post('/signup',
    [
       body('username').notEmpty().withMessage('username requirement'),
       body('email').isEmail().withMessage('valid email required'),
       body('password').isLength({min:6}).withMessage('password min 6 chars')
    ],
    validateRequest,
    signup
);
router.post('/login',
    [
        //login accepts emails or username plus password
        body('password').exists().withMessage('password required'),
        body('email').optional().isEmail().withMessage('email invalid'),
        body('username').optional().isString
    ],
    validateRequest,
    login
);
module.exports = router;