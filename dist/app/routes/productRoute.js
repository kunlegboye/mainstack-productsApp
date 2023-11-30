"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const router = express.Router();
// router.use(authenticateUser)
// router.post('/', createProduct);
// router.get('/', getAllProducts);
// router.get('/:productUser',getAProductByUser);
// router.get('/:productId',getStoreProductById);
// router.put('/:productId', updateStoreProductById);
// router.delete('/:productId', deleteStoreProductById);
// export default router;
const express_1 = __importDefault(require("express"));
const productsController_1 = require("../controllers/productsController");
const authetication_1 = require("../middlewares/authetication");
const router = express_1.default.Router();
router.use(authetication_1.authenticateUser);
router.post('/', productsController_1.createProduct);
router.get('/:productId', productsController_1.getStoreProductById);
router.get('/', productsController_1.getAllProducts);
// router.get('/user', getProductsByUser);
router.put('/:productId', productsController_1.updateStoreProductById);
router.delete('/:productId', productsController_1.deleteStoreProductById);
exports.default = router;
