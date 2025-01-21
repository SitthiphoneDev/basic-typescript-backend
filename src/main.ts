import express, { Application } from 'express';
import morgan from 'morgan';
import categoryRouter from './router/category.routes';
import unitRouter from './router/unit.routes';
import productRouter from './router/product.routes';
import swaggerUi from 'swagger-ui-express';
import { specs } from './swagger';
import * as dotenv from 'dotenv';

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3000;
const host = '0.0.0.0'; 
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/categories', categoryRouter);
app.use('/api/units', unitRouter);
app.use('/api/products', productRouter);

// Swagger Docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Start the server
app.listen(Number(port), host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});