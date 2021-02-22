import models from '../database/models';

const { Todo } = models;
/** Class representing a Todo services . */
class TodoService {
  /**
   * create a Todo item
   * @param {string} param parameter to be checked against
   * @return {object} Oject of Todo if created
   */
  static async createTodo(param) {
    try {
      return await Todo.create(param);
    } catch (error) {
      return error;
    }
  }

  /**
   * fetch a list of all Todo items
   * @param {string} param parameter to be checked against
   * @return {object} Oject of Todo if found
   */
  static async fetchTodo(param) {
    try {
      const todos = await Todo.findAll(param);
      return todos.map((todo) => todo.get());
    } catch (error) {
      return error;
    }
  }

  /**
   * deletes a single todo item
   * @param {string} param parameter to be checked against
   * @return {object} Oject of Todo if deleted
   */
  static async deleteTodo(param) {
    try {
      const removedTodo = await Todo.destroy({ where: param });
      return removedTodo;
    } catch (error) {
      return error;
    }
  }

  /**
   * updates a single todo item
   * @param {string} param parameter to be checked against
   * @param {string} data parameter to be checked against
   * @return {object} Oject of Todo if updated
   */
  static async updateTodo(param, data) {
    try {
      const updateTodo = await Todo.update(data, { where: param });
      return updateTodo;
    } catch (error) {
      return error;
    }
  }

  /**
   * get a single todo item
   * @param {string} param parameter to be checked against
   * @return {object} Oject of Todo if updated
   */
  static async retrieveTodo(param) {
    try {
      const todo = await Todo.findOne({ where: param });
      return todo;
    } catch (error) {
      return error;
    }
  }
}

export default TodoService;
