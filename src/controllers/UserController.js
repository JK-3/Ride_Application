import UserService from "../services/UserService.js";
const userService = new UserService();

export default class UserController{
    async createUser(req, res, next) {
        try {
            const {data, message} = await userService.registerUser(req.body);
            if (!data) {
                req.responseData = {
                    status: 400,
                    message
                };
            } else {
                req.responseData = {
                    status: 201,
                    message,
                    data
                };
            }
            next();
        } catch (error) {
            req.responseData = {
                status : 500,
                error : error.message
            }
            next();
        }
    }

    async loginUser(req, res, next){
        try {
            const { email, password } = req.body;

            if(!email || !password){
                throw new Error('Email and password are required');
            }

            const { jwtToken, user } = await userService.loginUser({email : email, password : password});
            
            // Secure JWT cookie
            res.cookie("auth_token", jwtToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 60 * 60 * 1000
            });

            // User details cookie (readable on frontend)
            res.cookie("user_info", JSON.stringify({
                id: user.id,
                username: user.username,
                email: user.email
            }), {
                httpOnly: false, // frontend can read this
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                maxAge: 60 * 60 * 1000
            });

            req.responseData = {
                status: 200,
                message: "Login successful"
            };
            next();
        } catch (error) {
            req.responseData = {
                status: 401,
                error: error.message
            };
            next();
        }
    }

    async getUserProfile(req, res, next){
        try {
            const userId = req.userDetails?.id || req.body?.userId;
            if (!userId) throw new Error("User ID is missing");

            const { data } = await userService.getUserProfile(userId);

            if (!data) {
                req.responseData = {
                    status: 404,
                    error: "User not found"
                };
            } else {
                req.responseData = {
                    status: 200,
                    data
                };
            }
            next();
        } catch (error) {
            req.responseData = {
                status: 500,
                error: error.message
            };
            next();
        }
    }

    async updateUserProfile(req, res, next){
        try {
            const updatedData = req.body;
            const userId = req.userDetails?.id;
            
            const {data, message} = await userService.updateUserProfile(userId, updatedData);

            if (!data) {
                req.responseData = {
                    status: 400,
                    message
                };
            } else {
                req.responseData = {
                    status: 200,
                    message,
                    data
                };
            }
            next();
        } catch (error) {
            req.responseData = {
                status : 500,
                error : error.message
            }
            next();
        }
    }

    async changeUserPassword(req, res, next){
        try {
            const userId = req.userDetails?.id || req.body?.userId;
            const {oldpassword, newpassword} = req.body

            if(!userId || !oldpassword || !newpassword){
                throw new Error("User ID, old password, and new password are required");
            }

            const {message} = await userService.changePassword(userId, oldpassword, newpassword);
            req.responseData = {
                status : 200,
                message
            }
            next();
        } catch (error) {
            req.responseData = {
                status : 500,
                error : error.message
            }
            next();
        }
    }
}