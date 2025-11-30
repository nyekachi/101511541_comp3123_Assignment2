const express = require('express');
const router = express.Router();
const empCtrl = require('../controllers/empcontroller');
const { body, param, query} = require('express-validator');
const validateRequest = require('../middleware/validateRequest');
const auth = require('../middleware/auth');

router.get('/employees',/* auth, */ empCtrl.listEmployees);

//create employee 
router.post('/employees',
    /*auth, */
    [
        body('first_name').notEmpty().withMessage('First name is required'),
        body('last_name').notEmpty().withMessage('last name is required'),
        body('email').isEmail().withMessage('valid email required'),
        body('position').notEmpty().withMessage('Position is required'),
        body('salary').isNumeric().withMessage('Salary must be a number'),
        body('date_of_joining').isISO8601().toDate().withMessage('invalid date'),
        body('department').notEmpty().withMessage('Department is required'),
    ],
    validateRequest,
    empCtrl.createEmployee
);

router.get('/employees/:eid',
    /*auth, */
    [
        param('eid').isMongoId().withMessage('Invalid Employee Id'),
    ],
    validateRequest,
    empCtrl.getEmployee

);

//update employee
router.put('/employees/:eid',
    [
        param('eid').isMongoId().withMessage('Invalid Employee id'),
        body('salary').optional().isNumeric().withMessage('Salary must be a number'),
        body('date_of_joining').optional().isISO8601().toDate().withMessage('Invalid date'),
    ],
    validateRequest,
    empCtrl.updateEmployee
   
);

// delete employee
router.delete('/employees',
    [
        query('eid').isMongoId().withMessage('Invalid employee ID in query parameter')
    ],
    validateRequest,
    empCtrl.deleteEmployee
);
module.exports = router;