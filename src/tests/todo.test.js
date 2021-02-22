import mocha from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import mockdata from './mockdata';
import models from '../database/models';

const { Todo } = models;

chai.should();
chai.use(chaiHttp);
const { expect } = chai;
const {
  it, describe
} = mocha;

describe('todo items related tests:', () => {
  afterEach(async () => {
    await Todo.destroy({
      where: {},
      truncate: true
    });
  });
  it('should add a new todo item', async () => {
    const res = await chai.request(app).post('/api/v1/todo/new').send(mockdata.newTodo);
    expect(res.status).to.be.equal(201);
    expect(res.body).to.be.a('object');
    expect(res.body).to.have.property('message');
  });
  it('should not add a new todo item', async () => {
    const res = await chai.request(app).post('/api/v1/todo/new').send(mockdata.invalidTodo);
    expect(res.status).to.be.equal(400);
    expect(res.body).to.be.a('object');
    expect(res.body).to.have.property('error');
  });
  it('should not add a new todo item with additional column', async () => {
    const res = await chai.request(app).post('/api/v1/todo/new').send(mockdata.additionalCollTodo);
    expect(res.status).to.be.equal(400);
    expect(res.body).to.be.a('object');
    expect(res.body).to.have.property('error');
  });
  it('should retrieve all todo items', async () => {
    await chai.request(app).post('/api/v1/todo/new').send(mockdata.newTodo);
    const res = await chai.request(app).get('/api/v1/todo/all');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.a('object');
    expect(res.body).to.have.property('message');
  });
  it('should retrieve a single todo item by id', async () => {
    const todo = await chai.request(app).post('/api/v1/todo/new').send(mockdata.newTodo);
    const { id } = todo.body.todo;
    const res = await chai.request(app).get(`/api/v1/todo/${id}`);
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.a('object');
    expect(res.body).to.have.property('message');
  });
  it('should not retrieve all todo items if not found', async () => {
    const res = await chai.request(app).get('/api/v1/todo/all');
    expect(res.status).to.be.equal(404);
    expect(res.body).to.be.a('object');
    expect(res.body).to.have.property('error');
  });
  it('should update a todo item', async () => {
    const newTodo = await chai.request(app).post('/api/v1/todo/new').send(mockdata.newTodo);
    const { id } = newTodo.body.todo;
    const res = await chai.request(app).put(`/api/v1/todo/update/${id}`);
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.a('object');
    expect(res.body).to.have.property('message');
  });
  it('should not update a todo item if id provided is not found', async () => {
    const res = await chai.request(app).put('/api/v1/todo/update/100');
    expect(res.status).to.be.equal(404);
    expect(res.body).to.be.a('object');
    expect(res.body).to.have.property('error');
  });
  it('should delete a todo item', async () => {
    const newTodo = await chai.request(app).post('/api/v1/todo/new').send(mockdata.newTodo);
    const { id } = newTodo.body.todo;
    const res = await chai.request(app).delete(`/api/v1/todo/remove/${id}`);
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.a('object');
    expect(res.body).to.have.property('message');
  });
});
