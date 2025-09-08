// dhaval
import User from "./mysql/User.js";
import Vehicle from "./mysql/vehicle.js";
import Rides from "./mysql/rides.js";

User.hasMany(Vehicle, {foreignKey : 'driverid'});
Vehicle.belongsTo(User, {foreignKey : 'driverid'});


// Rider association (user who booked the ride)
Rides.belongsTo(User, { 
  foreignKey: "riderid", 
  as: "Rider"   // alias to distinguish
});

// Driver association (user who accepted the ride)
Rides.belongsTo(User, { 
  foreignKey: "driverid", 
  as: "Driver" 
});

// Vehicle association (vehicle used in ride)
Rides.belongsTo(Vehicle, { 
  foreignKey: "vehicleid", 
  as: "Vehicle" 
});

// For reverse lookups
User.hasMany(Rides, { foreignKey: "riderid", as: "RiderRides" });
User.hasMany(Rides, { foreignKey: "driverid", as: "DriverRides" });
Vehicle.hasMany(Rides, { foreignKey: "vehicleid", as: "VehicleRides" });

export {User, Vehicle, Rides};