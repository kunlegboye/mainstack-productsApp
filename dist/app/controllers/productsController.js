"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStoreProductById = exports.updateStoreProductById = exports.getStoreProductById = exports.getAllProducts = exports.createProduct = void 0;
const productService_1 = __importDefault(require("../services/productService"));
function createProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, price, description } = req.body;
        const user = req.user;
        try {
            const newProduct = yield productService_1.default.createProduct(name, price, description, user.email);
            res.status(201).json(newProduct);
        }
        catch (error) {
            res.status(500).json({ error: 'Internal Server Error', message: error.message });
        }
    });
}
exports.createProduct = createProduct;
function getAllProducts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const products = yield productService_1.default.getAllProducts();
            res.status(200).json(products);
        }
        catch (error) {
            res.status(500).json({ error: 'Internal Server Error', message: error.message });
        }
    });
}
exports.getAllProducts = getAllProducts;
// export async function getProductsByUser(req: Request, res: Response) {
//     const user = req.user as IJwtUser;
//     console.log('This is just anything')
//   try {
//     console.log(user);
//     const products = await productService.getAllProductsByUser(user.email);
//     res.status(200).json(products);
//   } catch (error:any) {
//     res.status(500).json({ error: 'Internal Server Error', message: error.message });
//   }
// }
function getStoreProductById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { productId } = req.params;
            const product = yield productService_1.default.getProductById(productId);
            res.status(200).json({ data: product });
        }
        catch (err) {
            res.status(404).json({ error: 'Product not found', data: err.message });
        }
    });
}
exports.getStoreProductById = getStoreProductById;
function updateStoreProductById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { productId } = req.params;
            const { name, description, price } = req.body;
            const updatedProduct = yield productService_1.default.updateProductById(productId, { name, description, price });
            res.status(200).json({ message: 'Product updated successfully', data: updatedProduct });
        }
        catch (err) {
            console.error('Error updating product:', err.message);
            res.status(404).json({ error: 'Product not found', data: err.message });
        }
    });
}
exports.updateStoreProductById = updateStoreProductById;
function deleteStoreProductById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { productId } = req.params;
            yield productService_1.default.deleteProductById(productId);
            res.status(200).json({ message: 'Product deleted successfully' });
        }
        catch (err) {
            res.status(404).json({ error: 'Product not found', data: err.message });
        }
    });
}
exports.deleteStoreProductById = deleteStoreProductById;
