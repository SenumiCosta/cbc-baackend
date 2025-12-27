import Product from "../models/product.js";
import { isAdmin } from "../controllers/userController.js";

export function createProduct(req, res) {
    if (!isAdmin(req)) {
        return res.status(403).json({ message: "Access denied" });
    }

    // 📦 Create product
    const product = new Product(req.body);

    product.save()
        .then(() => {
            res.json({ message: "product created successfully" });
        })
        .catch((err) => {
            res.status(400).json({
                message: "product creation failed",
                error: err.message
            });
        });
}

export function getProducts(req, res) {
    Product.find()
        .then((products) => {
            res.json(products);
        })
        .catch((err) => {
            res.status(500).json({
                message: "error fetching products",
                error: err.message
            });
        });
}
