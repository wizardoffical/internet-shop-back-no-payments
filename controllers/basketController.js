const {Basket} = require('../models/models')
const {Device} = require('../models/models')
const ApiError = require('../error/ApiError')

class basketController {
  async addToBasket(req, res, next) {
    try {
      const { id } = req.params;
      const deviceId = parseInt(id);
      const device = await Device.findByPk(deviceId);

      if (!device) {
        return res.status(404).json({ error: 'Device not found' });
      }

      const { id: userId } = req.user;
      let basket = await Basket.findOne({ where: { userId, deviceId: device.id.toString() } });

      if (basket) {
        basket.count += 1;
        await basket.save();
      } else {
        basket = await Basket.create({
          userId,
          deviceId: device.id,
          name: device.name,
          price: device.price,
          img: device.img,
          count: 1,
        });
      }

      return res.status(201).json({ message: 'Device added to basket', basket });
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }
      
      

      async removeFromBasket(req, res, next) {
        try {
          const { deviceId } = req.params;
          const basket = await Basket.findOne({ where: { deviceId } });
      
          if (!basket) {
            return res.status(404).json({ error: `Basket item with deviceId ${deviceId} not found` });
          }
      
          await basket.destroy();
          return res.status(201).json({ message: `Item ${deviceId} has been removed from the basket`});
        } catch (error) {
          console.error(error);
          next(ApiError.badRequest(error.message));
        }
      }
      async getBasket(req, res, next) {
        try {
          const { userId } = req.params;
    
          if (!userId) {
            return res.status(400).json({ error: 'userId is required' });
          }
    
          const basket = await Basket.findAll({
            where: {
              userId,
            },
          });
    
          return res.json({message: `Basket with items of user ${userId}`, basket});
        } catch (error) {
          next(ApiError.badRequest(error.message));
        }
      }
};

module.exports = new basketController()