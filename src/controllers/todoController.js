import Response from '../helpers/sendResponse';
import code from '../helpers/statusCode';
import TodoService from '../services/todoServices';

/** Class representing a TODO items controllers */
export default class TodoController {
  /**
   * create a todo item
   * @param {Object} req provides the requests from users to controllers
   * @param {Object} res provides responses to the users
   * @return {object} Oject of data or error
  */
  static async addTodo(req, res) {
    try {
      const newTodo = await TodoService.createTodo(req.body);
      return Response.success(res, code.created, 'A todo item is successfully created', newTodo);
    } catch (error) {
      return Response.error(res, code.serverError, error);
    }
  }

  /**
   * retrieve a list of all todo items
   * @param {Object} req provides the requests from users to controllers
   * @param {Object} res provides responses to the users
   * @return {object} Oject of data or error
  */
  static async fetchTodos(req, res) {
    try {
      const allTodos = await TodoService.fetchTodo(req.body);
      if (allTodos.length === 0) return Response.error(res, code.notFound, 'no todo items found');
      return Response.success(res, code.ok, 'A list of todo items is successfully retrieved', allTodos);
    } catch (error) {
      return Response.error(res, code.serverError, error);
    }
  }

  /**
   * retrieve a todo item
   * @param {Object} req provides the requests from users to controllers
   * @param {Object} res provides responses to the users
   * @return {object} Oject of data or error
  */
  static async findTodo(req, res) {
    try {
      const { id } = req.params;
      const todo = await TodoService.retrieveTodo({ id });
      if (todo === null) return Response.error(res, code.notFound, 'no todo item found');
      return Response.success(res, code.ok, 'A todo item is successfully retrieved', todo);
    } catch (error) {
      return Response.error(res, code.serverError, error);
    }
  }

  /**
   * deletes a single todo item
   * @param {Object} req provides the requests from users to controllers
   * @param {Object} res provides responses to the users
   * @return {object} Oject of data or error
  */
  static async deleteTodo(req, res) {
    try {
      const { id } = req.params;
      await TodoService.deleteTodo({ id });
      return Response.success(res, code.ok, 'A todo item was successfully deleted from your todo items');
    } catch (error) {
      return Response.error(res, code.serverError, error);
    }
  }

  /**
   * updates a single todo item
   * @param {Object} req provides the requests from users to controllers
   * @param {Object} res provides responses to the users
   * @return {object} Oject of data or error
  */
  static async updateTodo(req, res) {
    try {
      const { id } = req.params;
      const todo = await TodoService.retrieveTodo({ id });
      if (!todo) return Response.error(res, code.notFound, 'no todo items found to update');
      await TodoService.updateTodo({ id }, req.body);
      const updated = await TodoService.retrieveTodo({ id });
      return Response.success(res, code.ok, 'A todo item was successfully updated from your todo items', updated);
    } catch (error) {
      return Response.error(res, code.serverError, error);
    }
  }
}
