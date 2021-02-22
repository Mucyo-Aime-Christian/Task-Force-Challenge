import swaggerUi from 'swagger-ui-express';
import swaggerJSDocs from 'swagger-jsdoc';
import { config } from 'dotenv';

config();

const backendUrl = process.env.BACKEND_URL;

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'TODO APP',
      version: '0.1.0',
      description:
        'TODO App is an application that will enable its users to create, view, update and even delete a schedule which he/she has added on the todo list. ',
      license: {
        name: 'MIT',
        url: 'https://spdx.org/licenses/MIT.html',
      },
      contact: {
        name: 'Mucyo Aime Christian',
        url: 'https://task-force-challenge.herokuapp.com/',
        email: 'christianmucyo49@gmail.com',
      },
    },
    servers: [
      {
        url: backendUrl,
      },
    ],
  },
  security: ['JWT'],
  apis: ['src/routes/*.js'],

};

const setUpSwaggerUi = (app) => {
  const specs = swaggerJSDocs(options);
  app.use(
    '/documentation',
    swaggerUi.serve,
    swaggerUi.setup(specs, { explorer: true })
  );
  return app;
};

export default setUpSwaggerUi;
