import type { HttpContext } from '@adonisjs/core/http'
import Category from '../../models/category.js'
import { createCategoryValidator } from '../../validators/Categories/createcategory.js'

export default class CategoriesController {
  /**
   * Display a list of resource
   */
  async index({ auth }: HttpContext) {
    const user = await auth.getUserOrFail()
    const categories = await Category.query().where('user_id', user.id).orderBy('name', 'asc')
    return categories
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, auth }: HttpContext) {
    const user = await auth.getUserOrFail()
    const { name } = await request.validateUsing(createCategoryValidator)

    const newCategory = await Category.create({
      name: name.toUpperCase(),
      userId: user.id,
    })
    return newCategory
  }

  /**
   * Show individual record
   */
  async show({ params, auth, response }: HttpContext) {
    const user = await auth.getUserOrFail()
    const category = await Category.findByOrFail('id', params.id)
    if (user.id !== category.userId) {
      return response
        .status(401)
        .json({ errors: [{ message: 'This category ins`t you property' }] })
    }
    return category
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, auth, response }: HttpContext) {
    const user = await auth.getUserOrFail()
    const { name } = await request.validateUsing(createCategoryValidator)

    const category = await Category.findByOrFail('id', params.id)

    if (user.id !== category.userId) {
      return response
        .status(401)
        .json({ errors: [{ message: 'This category ins`t you property' }] })
    }
    if (category.name != name.toUpperCase()) {
      category.name = name.toUpperCase()
      await category.save()
    }
    return category
  }

  /**
   * Delete record
   */
  async destroy({ params,  auth, response }: HttpContext) {
    const user = await auth.getUserOrFail()

    const category = await Category.findByOrFail('id', params.id)

    if (user.id !== category.userId) {
      return response
        .status(401)
        .json({ errors: [{ message: 'This category ins`t you property' }] })
    }

    await category.delete()

    return { message: `Category ${category.name} is deleted!` }
  }
}
