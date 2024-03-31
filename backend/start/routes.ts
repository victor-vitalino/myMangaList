/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import AuthController from '../app/controllers/Auth/auth_controller.js'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.post('/session', [AuthController,'login'])
router.delete('/session', [AuthController,'logout'])