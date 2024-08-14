import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express'; // Supondo que sua aplicação seja Express

export const setupSwagger = (app: Express) => {
  // Defina as opções de documentação
  const swaggerOptions = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'PetCare 0.1 Alpha version',
        version: '1.0.0',
        description: 'Documentação da API usando Swagger',
        contact: {
          name: 'Suporte',
          email: 'thiago.farias.almeida@ccc.ufcg.edu.br',
        },
        servers: [
          {
            url: 'http://localhost:3000',
          },
        ],
      },
    },
    // Caminho para os arquivos de definição de rota
    apis: ['./src/routes/*.ts'], // Ajuste o caminho conforme necessário
  };

  const swaggerDocs = swaggerJsDoc(swaggerOptions);
  console.log(JSON.stringify(swaggerDocs, null, 2)); // Log do JSON gerado pelo Swagger
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};
