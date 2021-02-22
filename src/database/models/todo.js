const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  /** class representing a TODO model */
  class Todo extends Model {
    /**
* @description this method defines todo association
* @param {Object} models
* @returns {object} Todo
* @memberof Room
*/
    static associate() {
      // define association here
    }
  }
  Todo.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    priority: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};
