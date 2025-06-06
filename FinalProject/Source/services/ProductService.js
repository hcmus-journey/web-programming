// services/ProductService.js
import { Product } from "../models/Product.js";
import { ProductImage } from "../models/ProductImage.js";
import { ProductCategory } from "../models/ProductCategory.js";
import { ProductManufacturer } from "../models/ProductManufacturer.js";
import { ProductReview } from "../models/ProductReview.js";
import { User } from "../models/User.js";
import { Op } from "sequelize";

class ProductService {
  // Count all products
  async countProducts() {
    try {
      return await Product.count();
    } catch (error) {
      throw new Error("Error counting products: " + error.message);
    }
  }

  // Get paginated products
  async getProductsPaginated(page = 1, limit = 9) {
    const offset = (page - 1) * limit;

    try {
      const { count, rows: products } = await Product.findAndCountAll({
        include: [
          { model: ProductImage, as: "images" },
          { model: ProductCategory, as: "category" },
          { model: ProductManufacturer, as: "manufacturer" },
          {
            model: ProductReview,
            as: "reviews",
            include: [{ model: User, as: "user" }],
          },
        ],
        limit,
        offset,
      });

      return { products, total: count, totalPages: Math.ceil(count / limit) };
    } catch (error) {
      console.error("Error paginating products:", error.message);
      throw new Error("Failed to fetch products.");
    }
  }

  // Get all products
  async getAllProducts() {
    try {
      return await Product.findAll({
        include: [
          { model: ProductImage, as: "images" },
          { model: ProductCategory, as: "category" },
          { model: ProductManufacturer, as: "manufacturer" },
          { model: ProductReview, as: "reviews" },
        ],
      });
    } catch (error) {
      throw new Error("Error fetching all products: " + error.message);
    }
  }

  // Find a product by its ID
  async getProductById(productId) {
    try {
      const product = await Product.findByPk(productId, {
        include: [
          { model: ProductImage, as: "images" },
          { model: ProductCategory, as: "category" },
          { model: ProductManufacturer, as: "manufacturer" },
          {
            model: ProductReview,
            as: "reviews",
            include: [{ model: User, as: "user" }],
          },
        ],
      });
      if (!product) throw new Error("Product not found");
      return product;
    } catch (error) {
      throw new Error("Error fetching product by ID: " + error.message);
    }
  }

  // Create a new product
  async createProduct(productData) {
    try {
      return await Product.create(productData, {
        include: [{ model: ProductImage, as: "images" }],
      });
    } catch (error) {
      throw new Error("Error creating product: " + error.message);
    }
  }

  async createProductImages(images) {
    try {
      return await ProductImage.bulkCreate(images);
    } catch (error) {
      throw new Error("Error creating product images: " + error.message);
    }
  }

  async updateProductImages(productId, images) {
    try {
      await ProductImage.destroy({ where: { product_id: productId } });
      return await ProductImage.bulkCreate(images);
    } catch (error) {
      throw new Error("Error updating product images: " + error.message);
    }
  }

  // Update a product by ID
  async updateProduct(productId, updateData) {
    try {
      const [updated] = await Product.update(updateData, {
        where: { product_id: productId },
      });
      if (!updated) throw new Error("Product not found");
      return await this.getProductById(productId);
    } catch (error) {
      throw new Error("Error updating product: " + error.message);
    }
  }

  // Delete a product by ID
  async deleteProduct(productId) {
    try {
      const deleted = await Product.destroy({
        where: { product_id: productId },
      });
      if (!deleted) throw new Error("Product not found");
      return { message: "Product deleted successfully" };
    } catch (error) {
      throw new Error("Error deleting product: " + error.message);
    }
  }

  // Update product stock or purchases count
  async updateProductStock(productId, quantity) {
    try {
      const product = await this.getProductById(productId);
      if (!product) throw new Error("Product not found");

      product.quantity = quantity;
      await product.save();

      return product;
    } catch (error) {
      throw new Error("Error updating product stock: " + error.message);
    }
  }

  async incrementPurchases(productId) {
    try {
      const product = await this.getProductById(productId);
      if (!product) throw new Error("Product not found");

      product.total_purchases += 1;
      await product.save();

      return product;
    } catch (error) {
      throw new Error("Error incrementing product purchases: " + error.message);
    }
  }

  // Find products by manufacturer
  async getProductsByCategory(manufacturerId) {
    try {
      return await Product.findAll({
        where: { manufacturer_id: manufacturerId },
        include: [
          { model: ProductImage, as: "images" },
          { model: ProductCategory, as: "category" },
          { model: ProductManufacturer, as: "manufacturer" },
          { model: ProductReview, as: "reviews" },
        ],
      });
    } catch (error) {
      throw new Error(
        "Error fetching products by manufacturer: " + error.message
      );
    }
  }

  // Find related products
  async getRelatedProducts(productId) {
    try {
      const product = await this.getProductById(productId);
      if (!product) throw new Error("Product not found");

      return await Product.findAll({
        where: {
          category_id: product.category_id,
          product_id: { [Op.ne]: productId }, // Exclude the current product ID
        },
        include: [
          { model: ProductImage, as: "images" },
          { model: ProductCategory, as: "category" },
          { model: ProductManufacturer, as: "manufacturer" },
          { model: ProductReview, as: "reviews" },
        ],
        limit: 4,
        order: [["total_purchases", "DESC"]],
      });
    } catch (error) {
      throw new Error("Error fetching related products: " + error.message);
    }
  }

  // Find Top new arrivals products
  async getTopNewArrivals() {
    try {
      return await Product.findAll({
        include: [
          { model: ProductImage, as: "images" },
          { model: ProductCategory, as: "category" },
          { model: ProductManufacturer, as: "manufacturer" },
          { model: ProductReview, as: "reviews" },
        ],
        limit: 8,
        order: [["created_at", "DESC"]],
      });
    } catch (error) {
      throw new Error("Error fetching top new arrivals: " + error.message);
    }
  }

  // Find recommended products
  async getRecommendedProducts() {
    try {
      return await Product.findAll({
        include: [
          { model: ProductImage, as: "images" },
          { model: ProductCategory, as: "category" },
          { model: ProductManufacturer, as: "manufacturer" },
          { model: ProductReview, as: "reviews" },
        ],
        limit: 8,
        order: [["total_purchases", "DESC"]],
      });
    } catch (error) {
      throw new Error("Error fetching recommended products: " + error.message);
    }
  }

  // Tìm kiếm sản phẩm dựa trên tên và mô tả
  async searchProducts(query, sort) {
    let orderClause = [];
    if (sort === "price-low-to-high") {
      orderClause = [["price", "ASC"]];
    } else if (sort === "price-high-to-low") {
      orderClause = [["price", "DESC"]];
    } else if (sort === "latest") {
      orderClause = [["created_at", "DESC"]];
    }

    try {
      query = query?.trim();

      const whereClause = query
        ? {
            [Op.or]: [
              { product_name: { [Op.iLike]: `%${query}%` } },
              { detail: { [Op.iLike]: `%${query}%` } },
            ],
          }
        : {};

      const products = await Product.findAll({
        where: whereClause,
        include: [
          { model: ProductImage, as: "images" },
          { model: ProductCategory, as: "category" },
          { model: ProductManufacturer, as: "manufacturer" },
          { model: ProductReview, as: "reviews" },
        ],
        order: orderClause, // Sắp xếp kết quả
      });

      return products;
    } catch (error) {
      console.error("Error searching products:", error.message);
      throw new Error("Failed to search products.");
    }
  }

  async getAllCategories() {
    try {
      return await ProductCategory.findAll();
    } catch (error) {
      throw new Error("Error fetching categories: " + error.message);
    }
  }

  async getAllManufacturer() {
    try {
      return await ProductManufacturer.findAll();
    } catch (error) {
      throw new Error("Error fetching manufacturers: " + error.message);
    }
  }

  // Create a new manufacturer
  async createManufacturer(manufacturerData) {
    try {
      return await ProductManufacturer.create(manufacturerData);
    } catch (error) {
      throw new Error("Error creating manufacturer: " + error.message);
    }
  }

  async updateManufacturer(manufacturerId, updateData) {
    try {
      const [updated] = await ProductManufacturer.update(updateData, {
        where: { manufacturer_id: manufacturerId },
      });

      if (!updated) throw new Error("Manufacturer not found!");
      return await this.getManufacturerById(manufacturerId);
    } catch (error) {
      throw new Error("Error updating manufacturer: " + error.message);
    }
  }

  // Create a new category
  async createCategory(categoryData) {
    try {
      return await ProductCategory.create(categoryData);
    } catch (error) {
      throw new Error("Error creating category: " + error.message);
    }
  }

  async createProductReview(productId, userId, detail, rating) {
    try {
      return await ProductReview.create({
        product_id: productId,
        user_id: userId,
        detail,
        rating,
      });
    } catch (error) {
      throw new Error("Error creating product review: " + error.message);
    }
  }
  
  async updateCategory(categoryId, updateData) {
    try {
      const [updated] = await ProductCategory.update(updateData, {
        where: { category_id: categoryId },
      });

      if (!updated) throw new Error("Category not found!");
      return await this.getCategoryById(categoryId);
    } catch (error) {
      throw new Error("Error updating category: " + error.message);
    }
  }
}

export default new ProductService();
