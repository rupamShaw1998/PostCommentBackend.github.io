const jwt = require("jsonwebtoken");

const authTokenVerification = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(!token) {
        return res.status(404).send("authentication failed");
    }
    
    req.user = jwt.verify(token, "SecretTokenSecretTokenSecretToken");
    next();
};

module.exports = authTokenVerification;
