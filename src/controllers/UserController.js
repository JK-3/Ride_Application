import UserService from "../services/UserService.js";
const userService = new UserService();

export default class UserController{
    async createUser(req, res, next) {
        try {
            const user = await userService.registerUser(req.body);
            if(user){
                req.responseData = {
                    status : 201,
                    data : user
                }
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