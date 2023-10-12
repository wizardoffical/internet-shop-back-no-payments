const {Brand} = require('../models/models')
const ApiError = require('../error/ApiError')

class BrandController {
    async create(req, res) {
        const {name, categoryId} = req.body
        const brand = await Brand.create({name, categoryId})
        return res.json(brand)
    }
    async getAll(req, res) {
        const brands = await Brand.findAll()
        return res.json(brands)
    }
    async remove(req, res) {
        const {id} = req.params
        const brand = await Brand.destroy({ where: { id } })
        if (!brand) {
            return res.status(404).json({ error: 'Brand not found' });
            }
        return res.json({ message: "Brand removed successfully", brand })
        }
}

module.exports = new BrandController()