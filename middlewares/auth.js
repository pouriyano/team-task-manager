const jwt = require('jsonwebtoken');


const authForUser = (req, res, next) => {
    const token=req.headers['authorization_user'];
    if(!token){
        return res.status(401).json({
            status:'error',
            data:'unauthorized'
        });
    }
    try {
        const decoded = jwt.verify(token, 'this_is_a_secret_key');
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({
            status: 'error',
            data: 'invalid token'
        });
    }

}
const authForTeam = (req, res, next) => {
    const token=req.headers['authorization_team'];
    if(!token){
        return res.status(401).json({
            status:'error',
            data:'unauthorized'
        });
    }
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({
            status: 'error',
            data: 'invalid token'
        });
    }

}

module.exports = {
    authForUser,
    authForTeam
};