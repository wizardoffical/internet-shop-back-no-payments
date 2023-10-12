const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
    },
    role: {
        type: DataTypes.STRING, 
        defaultValue: "USER",
    },
})

const Basket = sequelize.define('basket', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'user',
            key: 'id',
        },
    },
    deviceId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'device',
            key: 'id'
        }
    },
    name: {
        type: DataTypes.STRING, unique: false, allowNull: true,
    },
    price: {
        type: DataTypes.INTEGER, allowNull: true,
    },
    img: {
        type: DataTypes.STRING, allowNull:true,
    },
    count: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
})

const BasketDevice = sequelize.define('basket_device', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
})

const Device = sequelize.define('device', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING, unique: true, allowNull: false,
    },
    price: {
        type: DataTypes.INTEGER, allowNull: false,
    },
    ratting: {
        type: DataTypes.INTEGER, defaultValue: 0,
    },
    sklad: {
        type: DataTypes.INTEGER, defaultValue: 0
    },
    img: {
        type: DataTypes.STRING, allowNull:false,
    },
})

const  Type = sequelize.define('type', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
})

const  Brand = sequelize.define('brand', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        unique: false,
        allowNull: false,
    },
    categoryId: {
        type: DataTypes.INTEGER,
        unique: false,
        allowNull: false
    }
})

const  Flavor = sequelize.define('flavor', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: true,
    },
})

const  Value = sequelize.define('value', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    categoryId: {
        type: DataTypes.STRING,
        unique: false,
        allowNull: false
    } 
})

const  Category = sequelize.define('category', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },

})

const  Rating = sequelize.define('rating', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    rate: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
})

const  DeviceInfo = sequelize.define('device_info', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {type: DataTypes.STRING, allowNull: false},
    
})

const CategoryBrand = sequelize.define('category_brand', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
})


User.hasMany(Basket)
Basket.belongsTo(User)

User.hasMany(Rating)
Rating.belongsTo(User)

Basket.hasMany(BasketDevice)
BasketDevice.belongsTo(Basket)

Type.hasMany(Device)
Device.belongsTo(Type)

Brand.hasMany(Device)
Device.belongsTo(Brand)

Category.hasMany(Device)
Device.belongsTo(Category)

Type.hasMany(Category)
Category.belongsTo(Type)

Device.hasMany(Rating)
Rating.belongsTo(Device)

Device.hasMany(BasketDevice)
BasketDevice.belongsTo(Device)

Device.hasMany(DeviceInfo, {as: 'info'})
DeviceInfo.belongsTo(Device)

Category.belongsToMany(Brand, {through: CategoryBrand})
Brand.belongsToMany(Category, {through: CategoryBrand})

Flavor.hasMany(Device)
Device.belongsTo(Flavor)

Value.hasMany(Device)
Device.belongsTo(Value)

module.exports = {
    User,
    Basket,
    BasketDevice,
    Device,
    Type,
    Brand,
    Rating,
    CategoryBrand,
    DeviceInfo,
    Category,
    Flavor,
    Value,
}