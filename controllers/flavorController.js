const {Flavor} = require('../models/models')
const ApiError = require('../error/ApiError')

class FlavorController {
    async create(req, res) {
        const {name} = req.body
        const flavor = await Flavor.create({name})
        return res.json(flavor)
    }
    async getAll(req, res) {
        const flavors = await Flavor.findAll()
        return res.json(flavors)
    }
    async remove(req, res) {
        const {id} = req.params
        const flavor = await Flavor.destroy({ where: { id } })
        if (!flavor) {
            return res.status(404).json({ error: 'Flavor not found' });
            }
        return res.json({ message: "Flavor removed successfully", flavor })
        }
}

module.exports = new FlavorController()