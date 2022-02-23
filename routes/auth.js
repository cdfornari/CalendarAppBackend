const {Router} = require('express');
const { check } = require('express-validator');
const { crearUsuario, login, renewToken } = require('../controllers/auth');
const validate = require('../middlewares/validate');
const { verifyJWT } = require('../middlewares/verify-jwt');

const router = Router();
router.post(
    '/register', 
    [
        check('name', 'El nombre es obligatorio').notEmpty(),
        check('email', 'Email inválido').isEmail(),
        check('password', 'La contraseña debe de tener mínimo 6 caracteres').isLength({min: 6}),
        validate
    ], 
    crearUsuario
)
router.post(
    '/', 
    [
        check('email', 'Email inválido').isEmail(),
        check('password', 'La contraseña debe de tener mínimo 6 caracteres').isLength({min: 6}),
        validate
    ],
    login
)
router.get('/renew', verifyJWT, renewToken)
module.exports = router;