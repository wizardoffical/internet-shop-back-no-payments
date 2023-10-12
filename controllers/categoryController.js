const {Category} = require('../models/models')
const ApiError = require('../error/ApiError')

class CategoryController {
    // async create(req, res) {
    //     const {name, typeId} = req.body
    //     const category = await Category.create({name})
    //     return res.json(category)
    // }
    async create(req,res,next) {
        try {
            let {name, typeId} = req.body 
        
        const category = await Category.create({name, typeId})

        return res.json(category)
    } catch (e) {
        next(ApiError.badRequest(e.message))
    }

    }
    async getAll(req, res) {
        const category = await Category.findAll()
        return res.json(category)
    }
    async remove(req, res) {
        const {id} = req.params
        const category = await Category.destroy({ where: { id } })
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
            }
        return res.json({ message: `Category ${id} removed successfully`, category })
        }
}

module.exports = new CategoryController()