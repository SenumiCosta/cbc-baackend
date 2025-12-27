import express from 'express';
import { createProduct } from '../controllers/productsController.js';
import { getProducts } from '../controllers/productsController.js';


const productsRouter = express.Router();
productsRouter.post('/',createProduct);
productsRouter.get('/',getProducts);

export default productsRouter;