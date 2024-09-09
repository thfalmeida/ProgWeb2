import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API com JWT',
      version: '1.0.0',
      description: 'Documentação da API com autenticação JWT',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor de desenvolvimento',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT', // Formato do token esperado
        },
      },
    },
    security: [
      {
        bearerAuth: [], // Define que todas as rotas requerem autenticação por token JWT
      },
    ],
  },
  apis: ['./src/routes/*.ts'], // Caminho para os arquivos de rotas
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export const setupSwagger = (app: Express) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  console.log('Swagger disponível em http://localhost:3000/api-docs');
};
