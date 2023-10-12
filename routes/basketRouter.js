const Router = require('express');
const router = new Router();
const basketController = require('../controllers/basketController');
const checkRole = require('../middleware/checkRoleMiddleware');

router.delete('/:userId/:deviceId', checkRole('USER'), basketController.removeFromBasket);
router.post('/:userId/:id', checkRole('USER'), basketController.addToBasket);
router.get('/:userId', basketController.getBasket);

module.exports = router;