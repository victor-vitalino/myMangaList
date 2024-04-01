import type { HttpContext } from '@adonisjs/core/http'
import Category from '../../models/category.js'
import { createCategoryValidator } from '../../validators/Categories/createcategory.js'

export default class CategoriesController {
  /**
   * Display a list of resource
   */
  async index({ auth }: HttpContext) {
    const user = await auth.getUserOrFail()
    const categories = await Category.query().where('user_id', user.id).orderBy('name','asc')
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
  async show({ params }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {}

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {}
}
