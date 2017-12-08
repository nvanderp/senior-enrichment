const db = require('../index');
const DataTypes = db.Sequelize;

const Campus = db.define('campus', {
    name: {
        type: DataTypes.STRING(),
        allowNull: false
    },
    imageUrl: {
        type: DataTypes.STRING(),
        //defaultValue
    },
    description: {
        type: DataTypes.TEXT()
    }
});

module.exports = Campus;