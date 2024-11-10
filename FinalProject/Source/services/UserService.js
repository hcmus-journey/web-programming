class UserService {
    constructor(userModel) {
        this.userModel = userModel;
    }

    async createUser(userData) {
        try {
            const user = await this.userModel.create(userData);
            return user;
        } catch (error) {
            throw new Error('Error creating user: ' + error.message);
        }
    }

    async getUserById(userId) {
        try {
            const user = await this.userModel.findByPk(userId);
            if (!user) {
                throw new Error('User not found');
            }
            return user;
        } catch (error) {
            throw new Error('Error retrieving user: ' + error.message);
        }
    }

    async updateUser(userId, updateData) {
        try {
            const [updated] = await this.userModel.update(updateData, {
                where: { user_id: userId }
            });
            if (!updated) {
                throw new Error('User not found');
            }
            const updatedUser = await this.userModel.findByPk(userId);
            return updatedUser;
        } catch (error) {
            throw new Error('Error updating user: ' + error.message);
        }
    }

    async deleteUser(userId) {
        try {
            const deleted = await this.userModel.destroy({
                where: { user_id: userId }
            });
            if (!deleted) {
                throw new Error('User not found');
            }
            return { message: 'User deleted successfully' };
        } catch (error) {
            throw new Error('Error deleting user: ' + error.message);
        }
    }
}

export default UserService;