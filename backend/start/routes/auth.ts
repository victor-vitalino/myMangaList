import router from '@adonisjs/core/services/router'
import AuthController from '#controllers/Auth/auth_controller'

router.post('/session', [AuthController, 'login'])
router.delete('/session', [AuthController, 'logout'])
