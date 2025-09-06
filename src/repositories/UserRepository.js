import { ValidationError, UniqueConstraintError } from "sequelize";
import {User} from '../models/index.js';
export default class UserRepository {

    async insertUser(userData) {
        try {

            const newUser = await User.create(userData);
    
            console.log(newUser.toJSON());
        
            return {data : newUser.toJSON()};
        } catch (error) {

            if (error instanceof UniqueConstraintError) {
                 return {message : error.errors[0].message};
            }
            if (error instanceof ValidationError) {
                 return {message : error.errors.map(e => e.message).join(", ")};
            }
            throw error;
        }
    }

    async updateUser(userId, updateData){
        try {
            const user = await User.findByPk(userId);
            if(!user){throw new Error('User not found')};
            const updatedUser = await user.update(updateData);
            return updatedUser.toJSON();
        } catch (error) {
            throw error;
        }
    }

    async deleteUser(userId){
        try {
            const user = await User.findByPk(userId);
            if(!user){throw new Error('User not found')};
            user.destroy();
            return {message : "User deleted Successfully"};
        } catch (error) {
            throw error
        }
    }

    async findByEmail(email){
        try {
            const user = await User.findOne({ where: { email } });
            return user ? user.toJSON() : null;
        } catch (error) {
            throw error;
        }
    }

    async findById(userId){
        try {
            const user = await User.findByPk(userId);
            return user ? user.toJSON() : null;
        } catch (error) {
            throw error;
        }
    }
}