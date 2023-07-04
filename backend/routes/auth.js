const {Router} = require('express');
const { loguearUsuario, verificarToken } = require('../controllers/auth');
const { validarJWT } = require('../middleware/validar-jwt');

const router = Router();

// Rutas.
router.post('/login', loguearUsuario)
router.get('/verificar', [validarJWT], verificarToken)

module.exports = router;