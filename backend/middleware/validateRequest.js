const {validationResult} = require('express-validator');

module.exports = (req, res, next) => {
const errors = validationResult(req);

//check for any validation errors
if(!errors.isEmpty()) {
    const firstErrorMessage = errors.array()[0].msg;

    return res.status(400).json({
        status: false,
        message:firstErrorMessage
    });
}
//if no errors proceed
  next();
};