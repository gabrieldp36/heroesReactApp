const {Router} = require('express');
const { loguearUsuario } = require('../controllers/auth');

const router = Router();

// Rutas.
router.post('/login', loguearUsuario)

module.exports = router;