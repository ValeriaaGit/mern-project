import express from 'express';
import dotenv from 'dotenv'
import { connectDB } from './config/db.js';
import productRoutes from './routes/product.route.js'

dotenv.config();

const app = express();

app.use(express.json()); // allows us to accept JSON data  in the req.body

// Prefix endpoint routes by adding this line '/api/products' before any GET, POST, PUT, DELETE from the productRoutes 
app.use('/api/products', productRoutes);

app.listen(5000, () => {
    connectDB();
    console.log("Server started at http://localhost:5000");
});

