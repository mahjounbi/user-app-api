import dotenv from 'dotenv';
dotenv.config();
import swaggerJSDoc from 'swagger-jsdoc';

const port = process.env.PORT || 3002;
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'User API',
    version: '1.0.0',
    description: 'API documentation for user management',
  },
  servers: [
    {
      url: `http://localhost:${port}`,
      description: 'Local dev server',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./modules/**/routes/*.js', './modules/**/actions/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
