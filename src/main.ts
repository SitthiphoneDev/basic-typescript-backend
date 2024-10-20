import express from 'express';
import morgan from 'morgan';
import router from './root-router';
import { glob } from 'fs';
import { globalErrorHandler } from './core/middlewares';


const host = 'localhost';
const port = 3000;

const app = express();
app.use(morgan('dev'));
app.use(express.json());

app.use('/api', router)

app.use(globalErrorHandler);

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
