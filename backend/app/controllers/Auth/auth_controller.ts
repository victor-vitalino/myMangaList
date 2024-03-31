import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class AuthController {
  /**
   * Display a list of resource
   */
  async login({request, auth}: HttpContext) {
    const { email, password } = request.only(['email', 'password'])
    const user = await User.verifyCredentials(email, password)
    const token = await User.accessTokens.create(user)

    return token

  }

  /**
   * Handle form submission for the create action
   */
  async logout({ auth }: HttpContext) {
    const user = await auth.authenticate()

    await User.accessTokens.delete(user, user.currentAccessToken.identifier)

  }

}