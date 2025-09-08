// dhaval
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserRepository from '../repositories/UserRepository.js';
import HelperFunction from "../utils/HelperFunction.js";
const userRepository = new UserRepository();
const HF = new HelperFunction();

export default class UserService {
    async registerUser(userData){

        userData.password = await bcrypt.hash(userData.password, 10);
        const response = await userRepository.insertUser(userData)
        if(response?.data) {
            delete response.data.password;

            // send Mail -------------------------------------------------
            let mailObj = {
                to : response.data.email ? [response.data.email] : [],
                subject : "Welcome to Ride App !",
                htmlTemplate : 'welcome.html',
                templateData : {
                    username : response.data.username,
                    email : response.data.email,
                    appname : "Ride App"
                }
            }

            await HF.sendMail(mailObj);
            // -----------------------------------------------------------

            return {data : response.data, message : 'User registration sucessfull'};
        }
        return {data : null, message : response.message};
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
        delete updateData?.role;
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
            return {message : "User not found.", status : 400};
        }

        const matchPass = await bcrypt.compare(oldPassword, user.password);
        if(!matchPass){return {message : "Old password incorrect", status : 400};};

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await userRepository.updateUser(userId, {password : hashedPassword});

        return {message : "Password changed successfully"};
    }

    async userForgotPassword(email){
        const user = await userRepository.findByEmail(email);
        
        if(!user){
            return {message : "User not found.", status : 400}
        }

        // Generate 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // Set expiry time (10 minutes from now)
        const expiry = new Date(Date.now() + 10 * 60 * 1000); // 10 mins

        // Save the otp and expiry of this otp
        await userRepository.updateUser(user.id, {resetOtp : otp, resetOtpExpiry : expiry});


        // send Mail -------------------------------------------------
        let mailObj = {
            to : user.email ? [user.email] : [],
            subject : "Your Ride App password reset code",
            htmlTemplate : 'forgotpassword.html',
            templateData : {
                otpcode : otp
            }
        }

        await HF.sendMail(mailObj);
        // ------------------------------------------------------------

        return {message : "OTP sent successfully on the registered email."}
    }

    async userRestPassword(email, newPassword, otpcode){
        const user = await userRepository.findByEmail(email);

        if(!user){
            return {message : "User not found.", status : 400}
        }

        if(!newPassword || newPassword.length < 6){
            return {message : "Password is required and must be at least 6 characters long.", status : 400}
        }
        
        // Check OTP match
        if (user.resetOtp !== otpcode) {
            return { valid: false, message: "Invalid OTP", status: 400 };
        }

        // Check expiry
        if (new Date() > new Date(user.resetOtpExpiry)) {
            return { valid: false, message: "OTP has expired", status: 400 };
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        let updateObj = {
            resetOtp : null, 
            resetOtpExpiry : null,
            password: hashedPassword
        }
        
        const response = await userRepository.updateUser(user.id, updateObj);
        if(response) {
            return {message : 'Password updated successfully.'};
        }
        return {message : 'Password not updated.', status : 500};
    }
}