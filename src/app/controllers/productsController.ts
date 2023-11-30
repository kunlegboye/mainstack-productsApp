import { Request, Response } from 'express';
import productService from '../services/productService';
import { IJwtUser } from '../types';

export async function createProduct(req: Request, res: Response) {
  const { name, price, description } = req.body;
const user = req.user as IJwtUser;
  try {
    const newProduct = await productService.createProduct(name, price, description, user.email);
    res.status(201).json(newProduct);
  } catch (error: any) {
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
}

export async function getAllProducts(req: Request, res: Response) {
  try {
    const products = await productService.getAllProducts();
    res.status(200).json(products);
  } catch (error:any) {
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
}

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


export async function getStoreProductById(req: Request, res: Response) {
  try {
    const { productId } = req.params;
    const product = await productService.getProductById(productId);
    res.status(200).json({ data: product });
  } catch (err:any) {
    res.status(404).json({ error: 'Product not found', data: err.message });
  }
}


export async function updateStoreProductById(req: Request, res: Response) {
  try {
    const { productId } = req.params;
    const { name, description, price } = req.body;

    const updatedProduct = await productService.updateProductById(productId, { name, description, price });

    res.status(200).json({ message: 'Product updated successfully', data: updatedProduct });
  } catch (err: any) {
    console.error('Error updating product:', err.message);
    res.status(404).json({ error: 'Product not found', data: err.message });
  }
}


export async function deleteStoreProductById(req: Request, res: Response) {
  try {
    const { productId } = req.params;
    await productService.deleteProductById(productId);
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err:any) {
    res.status(404).json({ error: 'Product not found', data: err.message });
  }
}





