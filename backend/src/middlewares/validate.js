module.exports = (schema) => (req, res, next) => {

    if(!schema) {
        return res.status(500).json({
            status : 'error',
            message : 'Validation schema not provided'
        })
    }
    
    const {error} = schema.validate(req.body);
    if(error) {
        return res.status(400).json({
            status: 'error',
            message: error.details[0].message
        });
    }
    next();
}