const Router = require('express')
const router = new Router()
const flavorController = require('../controllers/flavorController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), flavorController.create)
router.delete('/:id', checkRole('ADMIN'), flavorController.remove)
router.get('/', flavorController.getAll)

module.exports = router