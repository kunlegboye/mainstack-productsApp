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
const productModel_1 = __importDefault(require("../models/productModel"));
const authService_1 = require("./authService");
class ProductService {
    createProduct(name, price, description, email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield (0, authService_1.getUserByEmail)(email);
            const product = new productModel_1.default({ name, price, description, user_id: user === null || user === void 0 ? void 0 : user.id });
            return yield product.save();
        });
    }
    getAllProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield productModel_1.default.find();
        });
    }
    //   async getAllProductsByUser(email:string): Promise<IProduct[]> {
    //     const user = await getUserByEmail(email);
    //     console.log(user);
    //     return await Product.find({user_id: user?._id});
    //   }
    getProductById(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            return productModel_1.default.findById(productId);
        });
    }
    updateProductById(productId, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            return productModel_1.default.findByIdAndUpdate(productId, updateData, { new: true });
        });
    }
    deleteProductById(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield productModel_1.default.findByIdAndDelete(productId);
        });
    }
}
exports.default = new ProductService();
