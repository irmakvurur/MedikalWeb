import mongoose from 'mongoose';

export interface IProduct extends mongoose.Document {
    name: string;
    description: string;
    category: string;
    images: string[];
}

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    images: { type: [String], required: false }, 
});

const Product = mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);

export default Product;
