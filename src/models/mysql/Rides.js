import { DataTypes } from "sequelize";
import { sequelize } from "../../config/mysql.js";

const Rides = sequelize.define(
  "Rides",
  {
    rideid: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },

    riderid: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      validate: {
        notEmpty: { msg: "Rider ID is required" },
        isUUID: { args: 4, msg: "Rider ID must be a valid UUID" },
      },
    },

    driverid: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "users",
        key: "id",
      },
      validate: {
        isUUID: { args: 4, msg: "Driver ID must be a valid UUID" },
      },
    },

    pickup: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Pickup location is required" },
        len: {
          args: [3, 255],
          msg: "Pickup location must be between 3 and 255 characters",
        },
      },
    },

    drop: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Drop location is required" },
        len: {
          args: [3, 255],
          msg: "Drop location must be between 3 and 255 characters",
        },
      },
    },

    fare: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: { msg: "Fare must be a valid number" },
        min: { args: [0], msg: "Fare cannot be negative" },
      },
    },

    status: {
      type: DataTypes.ENUM(
        "requested",
        "accepted",
        "start",
        "cancelled",
        "completed"
      ),
      allowNull: false,
      defaultValue: "requested",
      validate: {
        isIn: {
          args: [["requested", "accepted", "start", "cancelled", "completed"]],
          msg: "Status must be one of: requested, accepted, start, cancelled, completed",
        },
      },
    },

    starttime: {
      type: DataTypes.DATE,
      allowNull: true,
      validate: {
        isDate: { msg: "Start time must be a valid date" },
      },
    },

    endtime: {
      type: DataTypes.DATE,
      allowNull: true,
      validate: {
        isDate: { msg: "End time must be a valid date" },
      },
    },

    vehicleid: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "vehicles",
        key: "vehicleid",
      },
      validate: {
        isUUID: { args: 4, msg: "Vehicle ID must be a valid UUID" },
      },
    },

    paymentid: {
      type: DataTypes.UUID,
      allowNull: true,
      validate: {
        isUUID: { args: 4, msg: "Payment ID must be a valid UUID" },
      },
    },

    ratingid: {
      type: DataTypes.UUID,
      allowNull: true,
      validate: {
        isUUID: { args: 4, msg: "Rating ID must be a valid UUID" },
      },
    },
  },
  {
    timestamps: true,
    tableName: "rides",
  }
);

export default Rides;
