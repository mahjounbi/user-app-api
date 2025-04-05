import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { serve, setup } from 'swagger-ui-express';
import cors from 'cors';
import dotenv from 'dotenv';

import swaggerSpec from './docs/swagger.js';
import morganMiddleware from './middlewares/logger.js';
import userRoutes from './modules/users/routes/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '.env') });

const app = express();
const port = process.env.PORT || 3002;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morganMiddleware);
app.use(cors());

app.use('/users', userRoutes);
app.use('/docs', serve, setup(swaggerSpec));

app.get('/health', (_, res) => res.send({ message: 'ok' }));

app.listen(port, () => {
  console.log(`✅ API listening on http://localhost:${port}`);
  console.log(`📘 Swagger docs available at http://localhost:${port}/docs`);
});
