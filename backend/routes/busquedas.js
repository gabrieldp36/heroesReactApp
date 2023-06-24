const {Router} = require('express');
const { validarJWT } = require('../middleware/validar-jwt');
const { heroesBusquedas } = require('../controllers/busquedas');

const router = Router();

// Rutas.
router.get('/', [validarJWT],heroesBusquedas);

module.exports = router;