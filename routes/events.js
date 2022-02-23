const {Router} = require('express');
const { check } = require('express-validator');
const { getEventos, crearEvento, actualizarEvento, borrarEvento } = require('../controllers/events');
const isDate = require('../helpers/isDate');
const validate = require('../middlewares/validate');
const { verifyJWT } = require('../middlewares/verify-jwt');

const router = Router();
router.use(verifyJWT);
router.get('/', getEventos);
router.post(
    '/',
    [
        check('title', 'El titulo es obligatorio').notEmpty(),
        check('start', 'La fecha de inicio es obligatoria').custom(isDate),
        check('end', 'La fecha de fin es obligatoria').custom(isDate),
        validate
    ],
    crearEvento
);
router.put('/:id', actualizarEvento);
router.delete('/:id', borrarEvento);

module.exports = router;