const {Value} = require('../models/models')
const ApiError = require('../error/ApiError')

class ValueController {
    async create(req, res) {
        const {name, categoryId} = req.body
        const value = await Value.create({name, categoryId})
        return res.json(value)
    }
    async getAll(req, res) {
        const value = await Value.findAll()
        return res.json(value)
    }
    async remove(req, res) {
        const {id} = req.params
        const value = await Value.destroy({ where: { id } })
        if (!value) {
            return res.status(404).json({ error: 'Value not found' });
            }
        return res.json({ message: "Value removed successfully", value })
        }
    async change(req, res) {
        const { id } = req.params;
        const { name, categoryId } = req.body;
        const [updatedCount, updatedValues] = await Value.update({ name, categoryId }, { where: { id } });
         if (!updatedCount) {
        return res.status(404).json({ error: 'Value not found' });
        }
        return res.json({ message: "Value updated successfully", updatedValues });
}
}

module.exports = new ValueController()