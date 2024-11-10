import { Product } from '../models/Product.js';
import { ProductImage } from '../models/ProductImage.js';
import PagePath from "../constants/PagePath.js";

class ShopController {
    async showShopPage(req, res) {
        try {
            const products = await Product.findAll({
                include: [{ model: ProductImage, as: 'images' }],
            });
            res.render(PagePath.SHOP_PAGE_PATH, { products });
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }
}

export default new ShopController();