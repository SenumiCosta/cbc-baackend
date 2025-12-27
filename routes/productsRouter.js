import express from 'express';
import { createProduct, deleteProduct, getProducts,getProductByName } from '../controllers/productController.js';

const productsRouter = express.Router();

productsRouter.get('/', getProducts);
productsRouter.post('/', createProduct);
productsRouter.delete('/:names', deleteProduct);
productsRouter.get('/:name', getProductByName);

export default productsRouter;