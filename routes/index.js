const Router = require('express')
const router = new Router()
const deviceRouter = require('./deviceRouter')
const brandRouter = require('./brandRouter')
const userRouter = require('./userRouter')
const typeRouter = require('./typeRouter')
const basketRouter = require('./basketRouter')
const categoryRouter = require('./categoryRouter')
const flavorRouter = require('./flavorRouter')
const valueRouter = require('./valueRouter')


router.use('/user', userRouter)
router.use('/type', typeRouter)
router.use('/brand', brandRouter)
router.use('/device', deviceRouter)
router.use('/basket', basketRouter)
router.use('/category', categoryRouter)
router.use('/flavor', flavorRouter)
router.use('/value', valueRouter)

module.exports = router