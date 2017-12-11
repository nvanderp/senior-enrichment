const db = require('../index');
const DataTypes = db.Sequelize;

const Campus = db.define('campus', {
    name: {
        type: DataTypes.STRING(),
        allowNull: false
    },
    imageUrl: {
        type: DataTypes.STRING(),
        defaultValue: 'https://i.pinimg.com/736x/7a/7c/4c/7a7c4c36ae31ef033206bc8d0bf86f01--pixel-art-planets.jpg'
    },
    description: {
        type: DataTypes.TEXT()
    }
});

module.exports = Campus;