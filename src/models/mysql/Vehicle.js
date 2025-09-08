// janhawi
import { DataTypes } from "sequelize";
import { sequelize } from "../../config/mysql.js";

const Vehicle = sequelize.define("Vehicle", {
  vehicleid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  driverid: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model : 'users',
      key : 'id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  },
  brand: {
    type: DataTypes.STRING(50),   
    allowNull: false,
  },
  model: {
    type: DataTypes.STRING(50), 
    allowNull: false,
  },
  registration_no: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true,
    validate: {
      is: /^[A-Z0-9-]+$/i,
    },
  },
  color: {
    type: DataTypes.STRING(30),  
    allowNull: false,
  },
  year: {
    type: DataTypes.INTEGER,    
    allowNull: false,
    validate: {
      min: 1900,
      max: new Date().getFullYear(),
    },
  }
}, {
  tableName: "vehicles",
  timestamps: false,
});

export default Vehicle;