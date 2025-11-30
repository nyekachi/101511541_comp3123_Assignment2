module.exports = (error, req, res, next) => {
    console.error(error);
    res.status(500).json({status: false, message:'server error', error:error.message });
};
