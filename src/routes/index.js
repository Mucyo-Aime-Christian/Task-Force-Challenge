import setUpSwaggerUi from '../config/swaggerDoc';
import todoRoutes from './todoRoutes';

const urlPreffix = '/api/v1';
/**
 * @swagger
 * components:
 *    securitySchemes:
 *      bearerAuth:
 *        type: http
 *        scheme: bearer
 *        bearerFormat: JWT
 * */

const routes = (app) => {
  app.use(`${urlPreffix}/todo`, todoRoutes);
  setUpSwaggerUi(app);

  return app;
};
export default routes;
