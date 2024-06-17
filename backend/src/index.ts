import express from 'express';
import cron from 'cron';
import axios from 'axios';
import cors from 'cors';
import { products } from './productData';
import { Product } from './productInterfaces';

const app = express();
const port = 3000;

app.use(cors()); // Enable CORS for all routes
app.use(express.json());

// Endpoint to get the products
app.get('/products', (req, res) => {
  console.log('Fetching products...');
  res.json(products);
});

// Cron job to add a new product every 5 seconds
const job = new cron.CronJob('*/5 * * * * *', async () => {
  try {
    const response = await axios.get('https://fakestoreapi.com/products/1'); // Using a static product for testing
    const product: Product = response.data; // Assuming the response structure matches Product interface
    products.push(product);
    console.log(`Product added at ${new Date().toISOString()}`, product);
  } catch (error) {
    console.error('Error fetching product:', error);
  }
});

job.start();

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
