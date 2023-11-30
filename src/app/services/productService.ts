import Product from '../models/productModel';
import { IProduct } from '../types';
import { getUserByEmail } from './authService';

class ProductService {
  async createProduct(name: string, price: number, description: string, email:string ) {
const user = await getUserByEmail(email);
    const product = new Product({ name, price, description,user_id:user?.id });
    return await product.save();
  }

  async getAllProducts() {
    return await Product.find();
  }

//   async getAllProductsByUser(email:string): Promise<IProduct[]> {
//     const user = await getUserByEmail(email);
//     console.log(user);
//     return await Product.find({user_id: user?._id});


//   }


  async getProductById(productId: string): Promise<IProduct | null> {
    return Product.findById(productId);
  }

  async updateProductById(productId: string, updateData: { name?: string; description?: string; price?: number }): Promise<IProduct | null> {
    return Product.findByIdAndUpdate(productId, updateData, { new: true });
  }

  async deleteProductById(productId: string): Promise<void> {
    await Product.findByIdAndDelete(productId);
  }
}

export default new ProductService();
