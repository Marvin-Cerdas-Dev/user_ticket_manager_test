import User, { IUser } from '../models/user.model';

class UserService {
    /**
     * Retrieves all users from the database, excluding their passwords.
     * @returns {Promise<IUser[]>} A promise that resolves to an array of users.
     */
    async getAllUsers(): Promise<IUser[]> {
        try {
            return await User.find().select('-password');
        } catch (error) {
            throw error;
        }
    }

    /**
     * Retrieves a user by their ID, excluding their password.
     * @param {string} userId - The ID of the user to retrieve.
     * @returns {Promise<IUser | null>} A promise that resolves to the user object or null if not found.
     */
    async getUserById(userId: string): Promise<IUser | null> {
        try {
            return await User.findById(userId).select('-password');
        } catch (error) {
            throw error;
        }
    }

    /**
     * Updates a user's information by their ID, excluding the password if provided.
     * @param {string} id - The ID of the user to update.
     * @param {Partial<IUser>} userData - The new data for the user.
     * @returns {Promise<IUser | null>} A promise that resolves to the updated user object or null if not found.
     */
    async updateUser(id: string, userData: Partial<IUser>): Promise<IUser | null> {
        try {
            if (userData.password) {
                delete userData.password;
            }

            return await User.findByIdAndUpdate(id, userData, { new: true }).select('-password');
        } catch (error) {
            throw error;
        }
    }

    /**
     * Deletes a user by their ID.
     * @param {string} userId - The ID of the user to delete.
     * @returns {Promise<IUser | null>} A promise that resolves to the deleted user object or null if not found.
     */
    async deleteUser(userId: string): Promise<IUser | null> {
        try {
            return await User.findByIdAndDelete(userId);
        } catch (error) {
            throw error;
        }
    }
}

export default new UserService();