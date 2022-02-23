const jwt = require("jsonwebtoken");
const verifyJWT = (req,res,next) => {
    const token = req.header('x-token');
    if(!token){
        res.status(401).json({
            ok: false,
            msg: 'No hay token'
        })
    }
    try {
        const {uid,name} = jwt.verify(token, process.env.SECRET_JWT_KEY);
        req.uid = uid;
        req.name = name;
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        })
    }
    next();
}
module.exports = {
    verifyJWT
}