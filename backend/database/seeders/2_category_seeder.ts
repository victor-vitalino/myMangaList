import { BaseSeeder } from '@adonisjs/lucid/seeders'
import CategoriesController from '../../app/controllers/Category/categories_controller.js'
import Category from '../../app/models/category.js'

export default class extends BaseSeeder {
  async run() {
    const categories = [
      'Ação',
      'Aventura',
      'Comédia',
      'Drama',
      'Fantasia',
      'Magia',
      'Horror',
      'Mecha',
      'Mistério',
      'Psicológico',
      'Romance',
      'Ficção Científica',
      'Slice of Life',
      'Esportes',
      'Sobrenatural',
      'Thriller',
      'Shoujo',
      'Shounen',
      'Seinen',
      'Josei',
    ]
    const data = categories.map((name) => {
      return {
        name: name.toUpperCase(),
        userId: 1,
      }
    })
    await Category.createMany(data)

    // Write your database queries inside the run method
  }
}
