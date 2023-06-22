const {Router} = require('express');
const { validarJWT } = require('../middleware/validar-jwt');
const { usuariosGet, usuariosById, usuariosPost, usuariosPatch, usuariosDelete, usuariosReactivar } = require('../controllers/usuarios');

const router = Router();

// Rutas.
router.get('/', [validarJWT], usuariosGet);
router.get('/:id', [validarJWT], usuariosById);
router.post('/', [validarJWT], usuariosPost);
router.patch('/:id', [validarJWT], usuariosPatch);
router.delete('/:id', [validarJWT], usuariosDelete);
router.patch('/reactivar/:id', [validarJWT], usuariosReactivar);

module.exports = router;