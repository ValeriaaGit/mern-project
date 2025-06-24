import express from 'express';
import { 
    getProducts, createProduct, updateProduct, deleteProduct 
} from '../controllers/product.controller.js';

const router = express.Router();

// Get endpoint - (show on the client side)
// this will use 'getProducts' from the product controllers file
router.get('/', getProducts);

// Post endpoint - creates a new product
router.post('/', createProduct);

// Update/Put endpoint
router.put("/:id", updateProduct);

// Delete endpoint
router.delete("/:id", deleteProduct);

export default router;