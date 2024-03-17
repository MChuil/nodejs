import Propertie from './Propertie.js'
import Category from './Category.js'
import Price from './Price.js'
import User from './User.js'

// Propertie.belongsTo(Price, { foreignKey: 'precio_id'})
Propertie.belongsTo(Price)
Propertie.belongsTo(Category)
// Propertie.belongsTo(User)
User.hasMany(Propertie)

export{
    Propertie,
    Category,
    Price,
    User
}