const uuid = require('uuid')
const path = require('path')
const { Device, DeviceInfo } = require('../models/models')
const ApiError = require('../error/ApiError')

class DeviceController {
    async create(req, res, next) {
        try {
            let {name, price, brandId, typeId, categoryId, flavorId, valueId, sklad, info} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const device = await Device.create({name, price, brandId, typeId, categoryId, flavorId, valueId, sklad, img: fileName})

            if (info) {
                info = JSON.parse(info)
                info.forEach(i =>
                    DeviceInfo.create({
                        title: i.title,
                        description: i.description,
                        deviceId: device.id
                    })
                )
            }

        

        return res.json(device)

        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
        
    }
    async getAll(req, res) {
        let {typeId, brandId, categoryId} = req.query
        let devices
            if(!brandId && !typeId && !categoryId) {
            devices = await Device.findAndCountAll()
            }
            if(brandId && !typeId && !categoryId) {
            devices = await Device.findAndCountAll({where:{brandId}})
            }
            if(!brandId && typeId && !categoryId) {
            devices = await Device.findAndCountAll({where:{typeId}})
            }
            if(brandId && typeId && !categoryId) {
            devices = await Device.findAndCountAll({where:{brandId, typeId}, })
            }
            if(!brandId && !typeId && categoryId) {
            devices = await Device.findAndCountAll({where:{categoryId}, })
            }
            if(brandId && !typeId && categoryId) {
            devices = await Device.findAndCountAll({where:{brandId, categoryId}, })
            }
            if(!brandId && typeId && categoryId) {
            devices = await Device.findAndCountAll({where:{typeId, categoryId}, })
            }
            if(brandId && typeId && categoryId) {
            devices = await Device.findAndCountAll({where:{brandId, typeId, categoryId}, })
            }
            return res.json(devices)
            }
    async getOne(req, res) {
        const {id} = req.params
        const device = await Device.findOne(
            {
                where: {id},
                include: [{model: DeviceInfo, as: 'info'}]
            },
        )
        return res.json(device)
    }
    async remove(req, res) {
        const {id} = req.params
        const device = await Device.destroy({ where: { id } })
        if (!device) {
            return res.status(404).json({ error: 'Device not found' });
            }
        return res.json({ message: "Device removed successfully", device })
        }

        async change(req, res, next) {
    try {
        const {id} = req.params
        let {name, price, brandId, typeId, categoryId, flavorId, valueId, info} = req.body
        const device = await Device.findOne({ where: { id } });

        if (!device) {
            return res.status(404).json({ error: 'Device not found' });
        }
        
        if (req.files) {
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            await device.update({ name, price, brandId, typeId, categoryId, flavorId, valueId, img: fileName });
        } else {
            await device.update({ name, price, brandId, typeId, categoryId, flavorId, valueId });
        }

        if (info) {
            info = JSON.parse(info)
            await DeviceInfo.destroy({ where: { deviceId: device.id } });
            info.forEach(i =>
                DeviceInfo.create({
                    title: i.title,
                    description: i.description,
                    deviceId: device.id
                })
            );
        }

        return res.json(device);

    } catch (e) {
        next(ApiError.badRequest(e.message));
    }
}
}

module.exports = new DeviceController()