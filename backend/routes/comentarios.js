const {Router} = require('express');
const { validarJWT } = require('../middleware/validar-jwt');
const { comentariosGet, comentariosById, comentariosHeroes, comentariosPost, comentariosPatch, comentariosDelete } = require('../controllers/comentarios');

const router = Router();

// Rutas.
router.get('/', [validarJWT], comentariosGet);
router.get('/:id', [validarJWT], comentariosById);
router.get('/heroe/:id', [validarJWT], comentariosHeroes);
router.post('/', [validarJWT], comentariosPost);
router.patch('/:id', [validarJWT], comentariosPatch);
router.delete('/:id', [validarJWT], comentariosDelete);

module.exports = router;