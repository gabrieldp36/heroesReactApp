const {Router} = require('express');
const { validarJWT } = require('../middleware/validar-jwt');
const { heroesGet, heroesById, heroesPost, heroesPatch, heroesDelete } = require('../controllers/heroes');

const router = Router();

// Rutas.
router.get('/', [validarJWT], heroesGet);
router.get('/:id', [validarJWT], heroesById);
router.post('/', [validarJWT], heroesPost);
router.patch('/:id', [validarJWT], heroesPatch);
router.delete('/:id', [validarJWT], heroesDelete);

module.exports = router;