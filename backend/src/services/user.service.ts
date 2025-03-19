import User, { IUser } from '../models/user.model';

class UserService {
    async getAllaUsers(): Promise<IUser[]> {
        try {
            return await User.find().select('-password');
        } catch (error) {
            throw error;
        }
    }

    async getUserById(userId: string): Promise<IUser | null> {
        try {
            return await User.findById(userId).select('-password');
        } catch (error) {
            throw error;
        }
    }

    async updateUser(id: string, userData: Partial<IUser>): Promise<IUser | null> {
        try {
            
            if(userData.password){
                delete userData.password;
            }

            return await User.findByIdAndUpdate(id, userData, { new: true }).select('-password');
        } catch (error) {
            throw error;
        }
    }

    async deleteUser(userId: string): Promise<IUser | null> {
        try {
            return await User.findByIdAndDelete(userId);
        } catch (error) {
            throw error;
        }
    }
}

export default new UserService();