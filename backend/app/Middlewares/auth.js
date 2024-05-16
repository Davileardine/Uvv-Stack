const jwt = require('jsonwebtoken');
const secretToken = process.env.APP_SECRET
let User = require('../models/user');
const auth = async (req, res, next) => {

    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, secretToken);

        const user = await User.findById(decoded.user._id);

        if (!user) {
            throw new Error('JsonWebTokenError');
        }

        const now = Math.floor(Date.now() / 1000);

        if (decoded.exp <= now) {
            throw new Error('TokenExpiredError');
        }

        req.auth = user;
        next();
    } catch (error) {
        // Custom handling based on specific JWT errors
        if (error.name === 'TokenExpiredError') {
            return res.status(401).send({error: 'O token expirou. Por favor faça login novamente.'});
        } else if (error.name === 'JsonWebTokenError') {
            return res.status(401).send({error: 'Por favor, autentique.'});
        }

        // Log the error and send a generic 401 error message
        console.log(error);
        res.status(500).send({error: 'Por favor, autentique.'});
    }
};

module.exports = auth;
