import Joi from 'joi';
import joiResponse from '../helpers/joiResponse';
/** Class representing joi validation . */
export default class JoiValidator {
/**
* @description this method validate request body
* @param {object} req
* @param {object} res
* @param {object} next
* @returns {object} res
* @memberof JoiValidator
*/
  static todoValidator(req, res, next) {
    const schema = Joi.object({
      title: Joi.string().min(3).required(),
      description: Joi.string().min(8).required(),
      priority: Joi.string().required().valid('low', 'high', 'medium').insensitive(),
    });
    joiResponse(req.body, res, schema, next);
  }

  /**
* @description this method validate request body
* @param {object} req
* @param {object} res
* @param {object} next
* @returns {object} res
* @memberof JoiValidator
*/
  static updateTodoValidator(req, res, next) {
    const schema = Joi.object({
      title: Joi.string().min(3),
      description: Joi.string().min(8),
      priority: Joi.string().valid('law', 'high', 'medium').insensitive(),
    });
    joiResponse(req.body, res, schema, next);
  }
}
