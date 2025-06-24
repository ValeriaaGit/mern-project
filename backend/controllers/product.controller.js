import Product from '../models/products.model.js'
import mongoose from 'mongoose';

// Get all products... (additionally used with the product.route.js file)
export const getProducts = async (req, res) => {

    try {
        const products = await Product.find({});
        res.status(200).json({success: true, data: products});
    } catch (error) {
        res.status(500).json({success: false, message: "Server Error"});
    }

};

// Create a new product
export const createProduct = async (req,res) => {
    const product = req.body; // user will send this data 

    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({success:false, message: "Please provide all field"});
    }

    const newProduct = new Product(product);

    try {
        await newProduct.save();
        res.status(201).json({success: true, data: newProduct});
    } catch (error) {
        console.log("Error in Create product: ", error.message);
        res.status(500).json({success: false, message: "Server Error"});
    }

};

// Update a product
export const updateProduct = async (req,res) => {
    // id usage
    const {id} = req.params;
    // product
    const product = req.body;
 
    // if not a valid ID...
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({success: false, message: "Invalid Product Id"});
    }

    try { // we are adding new: true so that the listing products show the product after the update was done
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new: true});
        res.status(200).json({success: true, data: updatedProduct});
    } catch (error) {
        res.status(500).json({success: false, message: "Server Error"});
    }

};

// Delete a product
export const deleteProduct = async (req, res) => {
    const {id} = req.params;

    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({success: true, message: "Product deleted"});
    } catch (error) {
        console.log("Error in deleting product: " , error.message);
        res.status(404).json({success: false, message: "Product not found"});
    }
};