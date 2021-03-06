import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import colors from 'colors';

import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

import {
  errorHandler,
  notFound
} from './middleware/errorMiddleware.js'




dotenv.config();

connectDB();

const app = express();

// Body Parser to allow us to accept json data in the body
app.use(express.json())

app.get('/', (req, res) => {
  res.send('API is Running...')
})

// Mount routes from productRoutes with app.use...
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)

// Error middlewares
app.use(notFound)
app.use(errorHandler)



const PORT = process.env.PORT || 5000


app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} on PORT ${PORT}`.yellow.bold))
