import User from "./mysql/User.js";
import Vehicle from "./mysql/vehicle.js";

User.hasMany(Vehicle, {foreignKey : 'driverid'});
Vehicle.belongsTo(User, {foreignKey : 'driverid'});

export {User, Vehicle};