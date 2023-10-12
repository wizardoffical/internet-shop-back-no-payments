const Router = require('express')
const router = new Router()
const valueController = require('../controllers/valueController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), valueController.create)
router.delete('/:id', checkRole('ADMIN'), valueController.remove)
router.get('/', valueController.getAll)
router.put('/', checkRole('ADMIN'), valueController.change)


module.exports = router