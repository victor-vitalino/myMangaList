import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '../../app/models/user.js'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await User.create({
      email:"victor@email.com",
      password:"secret",
      fullName:"Victor Vitalino"
    })
  }
}