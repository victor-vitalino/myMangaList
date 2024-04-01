import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '../../app/models/user.js'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    try {
      const user = await User.findBy('email', 'victor@email.com')
      if (user == null) {
        await User.create({
          email: 'victor@email.com',
          password: 'secret',
          fullName: 'Victor Vitalino',
        })
      }
    } catch (error) {
      console.log('usuário já existente')
    }
  }
}
