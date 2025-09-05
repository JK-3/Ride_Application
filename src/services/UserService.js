import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserRepository from '../repositories/UserRepository.js';
import HelperFunction from "../utils/HelperFunction.js";
const userRepository = new UserRepository();
const HF = new HelperFunction();

export default class UserService {
    async registerUser(userData){

        userData.password = await bcrypt.hash(userData.password, 10);
        const user = await userRepository.insertUser(userData)
        if(user) {
            delete user.password;

            // send Mail -------------------------------------------------
            let mailObj = {
                to : user.email ? [user.email] : [],
                subject : "Welcome to Ride App !",
                htmlTemplate : 'welcome.html',
                templateData : {
                    username : user.username,
                    email : user.email
                }
            }

            await HF.sendMail(mailObj);
            // -----------------------------------------------------------

            return {data : user, message : 'User registration sucessfull'};
        }
        return {data : null, message : "Registration unsucessfull"};
    }

    async loginUser({email, password}){

        const user = await userRepository.findByEmail(email);
        
        if(!user){
            throw new Error('User not found');
        }

        const matchPass = await bcrypt.compare(password, user.password);
        if(!matchPass){
            throw new Error('Invalid Credentials!');
        }

        const jwtToken = jwt.sign(
            {id : user.id, email : user.email},
            process.env.JWT_SECRET || '',
            {expiresIn : '1h'}
        );

        delete user.password;
        return {jwtToken, user};
    }

    async getUserProfile(userId){
        const user = await userRepository.findById(userId);
        
        if(!user){
            throw new Error('User not found');
        }
        if(user) {
            delete user.password;
            return {data : user};
        }
        return {data : null};
    }

    async updateUserProfile(userId, updateData){
        delete updateData?.password;
        const updatedUser = await userRepository.updateUser(userId, updateData);
        if(updatedUser) {
            delete updatedUser.password;
            return {data : updatedUser, message : 'User profile updated sucessfull'};
        }
        return {data : null, message : "User profile not updated"};
    }

    async changePassword(userId, oldPassword, newPassword){
        const user = await userRepository.findById(userId);

        if(!user){
            throw new Error('User not found');
        }

        const matchPass = await bcrypt.compare(oldPassword, user.password);
        if(!matchPass){throw new Error('Old password incorrect')};

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await userRepository.updateUser(userId, {password : hashedPassword});

        return {message : "Password changed successfully"};
    }
}