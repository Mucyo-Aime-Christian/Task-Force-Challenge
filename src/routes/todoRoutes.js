import { Router } from 'express';
import TodoController from '../controllers/todoController';
import JoiValidator from '../middlewares/joiValidator';

const router = Router();

const {
  todoValidator, updateTodoValidator
} = JoiValidator;

/**
 * @swagger
 * /todo/new:
 *    post:
 *     tags:
 *       - Todo
 *     summary: register new todo item
 *     consumes:
 *       - application/json
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 required: true
 *               description:
 *                 type: string
 *                 required: true
 *               priority:
 *                 type: string
 *                 required: true
 *
 *     responses:
 *       201:
 *             description: a todo item successfully created.
 *       400:
 *             description: Bad request.
 *       500:
 *             description: server error.
 * */
router.post('/new/', todoValidator, TodoController.addTodo);
/**
 * @swagger
 * /todo/all:
 *    get:
 *     tags:
 *       - Todo
 *     summary: retrieve all  todo items
 *     consumes:
 *       - application/json
 *
 *     responses:
 *       200:
 *             description: todo items successfully retrieved.
 *       404:
 *             description: no todo items found.
 *       500:
 *             description: server error.
 * */
router.get('/all/', TodoController.fetchTodos);
/**
 * @swagger
 * /todo/{id}:
 *    get:
 *     tags:
 *       - Todo
 *     summary: retrieve a single todo item
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *             description: todo item successfully retrieved.
 *       404:
 *             description: no todo item found.
 *       500:
 *             description: server error.
 * */
router.get('/:id', TodoController.findTodo);
/**
 * @swagger
 * /todo/remove/{id}:
 *    delete:
 *     tags:
 *       - Todo
 *     summary: deletes a single todo item
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *             description: todo items successfully retrieved.
 *       404:
 *             description: no todo items found.
 *       500:
 *             description: server error.
 * */
router.delete('/remove/:id', TodoController.deleteTodo);
/**
 * @swagger
 * /todo/update/{id}:
 *    put:
 *     tags:
 *       - Todo
 *     summary: updates a single todo item
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 required: false
 *               description:
 *                 type: string
 *                 required: false
 *               priority:
 *                 type: string
 *                 required: false
 *
 *     responses:
 *       200:
 *             description: todo items successfully updated.
 *       404:
 *             description: no todo item found corresponding the id provided.
 *       500:
 *             description: server error.
 * */
router.put('/update/:id', updateTodoValidator, TodoController.updateTodo);
export default router;
