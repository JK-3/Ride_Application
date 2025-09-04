import UserRepository from '../repositories/UserRepository.js';

const userRepository = new UserRepository();

export default class UserService {
    async registerUser(userData){
        return await userRepository.insertUser(userData)
    }
}