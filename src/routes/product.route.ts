import {
    GetProducts,
    GetProductById,
    CreateProduct,
    UpdateProduct,
    DeleteProduct
} from '../controllers/product.controller.js';

import { Router } from 'express';
const router = Router();

router.get('/', GetProducts);
router.get('/:id', GetProductById);
router.post('/', CreateProduct);
router.patch('/:id', UpdateProduct);
router.delete('/:id', DeleteProduct);

export { router as productRouter}