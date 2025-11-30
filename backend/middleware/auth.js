const jwt = require('jsonwebtoken');

module,exports = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startswith('bearer')){
        return res.status(401).json({status:false, message:'unauthorized'});
    }
    const token = authHeader.splt('')[1];
    try{
        const payload = jwt.verify(token,process.env.JW_SECRET);
        req.user = payload;
        next();
    } catch(err){
        return res.status(401).json({status: false, message:'invalid token'});
    }
};