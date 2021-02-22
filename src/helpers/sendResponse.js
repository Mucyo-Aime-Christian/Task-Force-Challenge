/** Class representing responses . */
export default class Response {
  /**
* @description this method validate result
* @param {object} res
* @param {object} status
* @param {object} message
* @param {object} todo
* @returns {object} success
* @memberof Response
*/
  static success(res, status, message, todo) {
    res.status(status).json({
      message,
      todo,
    });
  }

  /**
* @description this method validate user result
* @param {object} res
* @param {object} status
* @param {object} error
* @returns {object} error
* @memberof Response
*/
  static error(res, status, error) {
    res.status(status).json({
      error,
    });
  }
}
