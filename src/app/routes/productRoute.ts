// import express from 'express';
// import { 
//     createProduct, 
//     getAllProducts,
//     getStoreProductById,
//     updateStoreProductById,
//     deleteStoreProductById,
//     getAProductByUser
// } from '../controllers/productsController';
// import { authenticateUser } from '../middlewares/authetication';

// const router = express.Router();
// router.use(authenticateUser)

// router.post('/', createProduct);
// router.get('/', getAllProducts);
// router.get('/:productUser',getAProductByUser);
// router.get('/:productId',getStoreProductById);
// router.put('/:productId', updateStoreProductById);
// router.delete('/:productId', deleteStoreProductById);



// export default router;



import express from 'express';
import { createProduct,
     getAllProducts, 
     getStoreProductById, 
     updateStoreProductById, deleteStoreProductById } from '../controllers/productsController';
import { authenticateUser } from '../middlewares/authetication';

const router = express.Router();
router.use(authenticateUser);

router.post('/', createProduct);
router.get('/:productId', getStoreProductById); 
router.get('/', getAllProducts);
// router.get('/user', getProductsByUser);
router.put('/:productId', updateStoreProductById);
router.delete('/:productId', deleteStoreProductById);

export default router;