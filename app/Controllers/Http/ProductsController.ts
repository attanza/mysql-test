import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product'

export default class ProductsController {
  async index({ request, response }: HttpContextContract) {
    const rq = request.qs()
    const page = Number(rq.page) || 1
    const limit = Number(rq.limit) || 10
    const data = await Product.query().paginate(page, limit)
    return response.status(200).send(data)
  }
  async store({ request, response }: HttpContextContract) {
    const body = request.only(['name', 'price', 'image'])
    const created = await Product.create(body)
    return response.status(201).send(created)
  }
  async show({ request, response }: HttpContextContract) {
    const id = request.param('id')
    const found = await Product.findOrFail(id)
    return response.status(200).send(found)
  }
  async update({ request, response }: HttpContextContract) {
    const id = request.param('id')
    const body = request.only(['name', 'price', 'image'])
    const found = await Product.findOrFail(id)

    await found.merge(body).save()
    return response.status(200).send(found)
  }
  async destroy({ request, response }: HttpContextContract) {
    const id = request.param('id')
    const found = await Product.findOrFail(id)
    await found.delete()
    return response.status(200).send({ message: 'Data Deleted' })
  }
}
