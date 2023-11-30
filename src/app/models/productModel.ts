import mongoose, { Document, Schema } from 'mongoose';

interface IProduct {
  name: string;
  price: number;
  description: string;
  user_id: string;
}

const productSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps:true });

const Product = mongoose.model<IProduct>('Product', productSchema);

export default Product;