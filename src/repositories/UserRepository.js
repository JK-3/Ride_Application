// import mongoConnect from "../config/mongo.js";
// import {checkMySqlConnection, syncSqlDatabase} from '../config/mysql.js';
import User from "../models/mysql/User.js";

export default class UserRepository {

    async insertUser(userData) {
        try {
            // const newUser = await User.create({
            //     username: 'john_doe',
            //     email: 'john@example.com',
            //     phone_number: '1234567890',
            //     password: 'hashed_password',
            //     image: 'profile_image_url',
            // });

            const newUser = await User.create(userData);
    
            console.log(newUser.toJSON());
        
            return newUser.toJSON();
        } catch (error) {

            if (error instanceof UniqueConstraintError) {
                throw new Error(error.errors[0].message);
            }
            if (error instanceof ValidationError) {
                throw new Error(error.errors.map(e => e.message).join(", "));
            }
            throw new Error("Database error: " + error.message);

        }
    }

    async updateUser(userData){
        try {
            
        } catch (error) {
            
        }
    }
}

// const startServer = async () => {
//     try {
        
//         await mongoConnect();

//         await checkMySqlConnection();

//         await syncSqlDatabase();

//         const ur = new UserRepository()
//         ur.insertUser();
        
//     } catch (error) {
//         console.error("Error starting the server :", error.message);
//         process.exit(1);
//     }
// }
// startServer();

