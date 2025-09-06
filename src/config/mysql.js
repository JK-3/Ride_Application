import { Sequelize } from "sequelize";
import mysql from "mysql2/promise";

const dbName = "ride_app_demo_node";
const dbUser = "root";
const dbPass = "760097";
const dbHost = "localhost";

// ✅ Step 1: Create DB if it doesn't exist
const createDatabaseIfNotExists = async () => {
  try {
    const connection = await mysql.createConnection({
      host: dbHost,
      user: dbUser,
      password: dbPass,
    });

    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`);
    console.log(`✅ Database "${dbName}" is ready`);
    await connection.end();
  } catch (error) {
    console.error("❌ Error creating database:", error);
    throw error;
  }
};

// ✅ Step 2: Initialize Sequelize (after DB is created)
const sequelize = new Sequelize(dbName, dbUser, dbPass, {
  host: dbHost,
  dialect: "mysql",
  logging: false, // set to false to disable SQL logging
});

const checkMySqlConnection = async () => {
  try {
    await createDatabaseIfNotExists(); // ✅ Ensure DB exists first
    await sequelize.authenticate();
    console.log("✅ MySQL Connected using Sequelize");
  } catch (error) {
    console.error("❌ MySQL Connection Error:", error.message);
    throw error;
  }
};

const syncSqlDatabase = async () => {
  try {
    await sequelize.sync({ force: false });
    console.log("✅ MySQL database synchronized successfully.");
  } catch (error) {
    console.error("❌ Error syncing database:", error.message);
    throw error;
  }
};

export { sequelize, checkMySqlConnection, syncSqlDatabase };
