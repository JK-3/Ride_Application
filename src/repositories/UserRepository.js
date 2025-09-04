import { ValidationError, UniqueConstraintError } from "sequelize";
import User from "../models/mysql/User.js";

export default class UserRepository {

    async insertUser(userData) {
        try {

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