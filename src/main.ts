import express from 'express';
import morgan from 'morgan';
import categoryRouter from './router/category.routes';
import unitRouter from './router/unit.routes';
import productRouter from './router/product.routes';
import { specs } from './swagger';
import swaggerUi from 'swagger-ui-express';


const host = 'localhost';
const port = 3000;

const app = express();
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/categories', categoryRouter);
app.use('/api/units', unitRouter);
app.use('/api/products', productRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});