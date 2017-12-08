const db = require('../index');
const DataTypes = db.Sequelize;

const Student = db.define('student', {
    firstName: {
        type: DataTypes.STRING(),
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING(),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(),
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    gpa: {
        type: DataTypes.DECIMAL(),
        validate: {
            min: 0.0,
            max: 4.0
        }
    }
}, {
    getterMethods: {
        fullName() {
            return this.firstName + ' ' + this.lastName;
        }
    }
});

module.exports = Student;