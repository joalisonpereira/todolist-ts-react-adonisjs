import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Todo from 'App/Models/Todo'

export default class TodosController {
  public async index({}: HttpContextContract) {
    const todos = await Todo.all();

    return todos
  }

  public async store({request}: HttpContextContract) {
    const data = request.only(['title']);

    const todo = await Todo.create(data);

    return todo;
  }

  public async show({params}: HttpContextContract) {
    const todo = await Todo.find(params.id);

    return todo;
  }

  public async update({request, params}: HttpContextContract) {
    const data = request.only(['title']);

    const todo = await Todo.findOrFail(params.id);

    todo.merge(data);

    await todo.save();
  }

  public async destroy({params}: HttpContextContract) {
    const todo = await Todo.findOrFail(params.id);

    await todo.delete();
  }
}
