import { DataTypes } from "sequelize";
import { sequelize } from "../../config/mysql.js";

const Rides = sequelize.define("Rides", {
  rideid: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  riderid: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model : 'users',
      key : id
    }
  },
  driverid: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model : 'users',
      key : id
    } 
  },
  pickup: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  drop: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fail: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM("requested","start", "accepted", "cancelled", "completed"),
    allowNull: false,
    defaultValue: "requested",
  },

  starttime: {
    type: DataTypes.DATE,
    allowNull: true, 
  },
  endtime: {
    type: DataTypes.DATE,
    allowNull: true, 
  },

  vehicleid: {
  type: DataTypes.UUID,
  allowNull: true,
  references: {
    model : 'vehicles',
    key : 'vehicleid'
  }
  },
  
  paymentid: {
    type: DataTypes.UUID,
    allowNull: true,
  },
  ratingid: {
    type: DataTypes.UUID,
    allowNull: true,
  },
}, {
  timestamps: true, 
  tableName : 'rides'
});

export default Rides;
