// services/ProductService.js
import { User } from "../models/User.js";
import { Product } from "../models/Product.js";
import { ProductImage } from "../models/ProductImage.js";
import { ProductCategory } from "../models/ProductCategory.js";
import { ProductManufacturer } from "../models/ProductManufacturer.js";
import { ProductReview } from "../models/ProductReview.js";
import { Op } from "sequelize";

class AdminService {
  // Count all products
  async countUsers() {
    try {
      return await User.count();
    } catch (error) {
      throw new Error("Error counting users: " + error.message);
    }
  }

  // Get paginated products
  async getUsersPaginated(page = 1, limit = 9) {
    const offset = (page - 1) * limit;

    try {
      const { count, rows: users } = await User.findAndCountAll({
        limit,
        offset,
      });

      return { users, total: count, totalPages: Math.ceil(count / limit) };
    } catch (error) {
      console.error("Error paginating users:", error.message);
      throw new Error("Failed to fetch users.");
    }
  }

  // Get all products
  async getAllUsers() {
    try {
      return await User.findAll();
    } catch (error) {
      throw new Error("Error fetching all users: " + error.message);
    }
  }

  // Find a product by its ID
  async getUserById(userId) {
    try {
      const user = await Product.findByPk(userId);
      if (!user) throw new Error("Product not found");
      return user;
    } catch (error) {
      throw new Error("Error fetching product by ID: " + error.message);
    }
  }

  async searchUsers(query, sort) {
    let orderClause = [];
    if (sort === "name-a-to-z") {
      orderClause = [["name", "ASC"]];
    } else if (sort === "name-z-to-a") {
      orderClause = [["name", "DESC"]];
    } else if (sort === "email-a-to-z") {
      orderClause = [["email", "ASC"]];
    } else if (sort === "email-z-to-a") {
      orderClause = [["email", "DESC"]];
    } else if (sort === "latest") {
      orderClause = [["created_at", "DESC"]];
    } else {
      orderClause = [["created_at", "ASC"]];
    }

    try {
      query = query?.trim();

      const whereClause = query
        ? {
            [Op.or]: [
              { name: { [Op.iLike]: `%${query}%` } },
              { email: { [Op.iLike]: `%${query}%` } },
            ],
          }
        : {};

      const users = await User.findAll({
        where: whereClause,
        order: orderClause, // Sắp xếp kết quả
      });

      return users;
    } catch (error) {
      console.error("Error searching users:", error.message);
      throw new Error("Failed to search users.");
    }
  }
}

export default new AdminService();
