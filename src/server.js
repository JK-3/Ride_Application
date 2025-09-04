import app from "./app.js";
import dotenv from 'dotenv';
dotenv.config();
import mongoConnect from "./config/mongo.js";
import {checkMySqlConnection, syncSqlDatabase} from './config/mysql.js';

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        
        await mongoConnect();

        await checkMySqlConnection();

        await syncSqlDatabase();

        app.listen(PORT, ()=>{
            console.log(`Server running on http://localhost:${PORT}`);            
        });
        
    } catch (error) {
        console.error("Error starting the server :", error.message);
        process.exit(1);
    }
}
startServer();