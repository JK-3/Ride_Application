import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/mysql.js';

const User = sequelize.define('User', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    username: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
            notEmpty: { msg: "Username is required" },
            len: { args: [3, 50], msg: "Username must be between 3 and 50 characters" }
        }
    },
    email: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: { msg: "Email already exists" },
        validate: {
            notEmpty: { msg: "Email is required" },
            isEmail: { msg: "Invalid email format" }
        }
    },
    phone_number: {
        type: DataTypes.STRING(15),
        allowNull: false,
        unique: { msg: "Phone number already exists" },
        validate: {
            notEmpty: { msg: "Phone number is required" },
            isNumeric: { msg: "Phone number must contain only digits" },
            len: { args: [10, 15], msg: "Phone number must be between 10 and 15 digits" }
        }
    },
    role :{
        type: DataTypes.ENUM("driver", "rider"),
        allowNull : false,
        validate : {
            notEmpty : { msg : "Role is required" },
            isIn: {
                args: [["driver", "rider"]],
                msg: "Role must be either 'driver' or 'rider'"
            }
        },
        defaultValue : "rider"
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
            notEmpty: { msg: "Password is required" },
            len: { args: [6, 255], msg: "Password must be at least 6 characters long" }
        }
    },
    image: {
        type: DataTypes.STRING(255),
        allowNull: true,
        validate: {
            isUrl: { msg: "Image must be a valid URL" }
        }
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    }
}, {
    timestamps: false,
    tableName: 'users',
});

export default User;