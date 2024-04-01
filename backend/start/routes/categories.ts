import router from '@adonisjs/core/services/router'
import CategoriesController from '#controllers/Category/categories_controller'
import { middleware } from '../kernel.js'

router.get('/categories', [CategoriesController, 'index']).use([middleware.auth()])
router.post('/categories', [CategoriesController, 'store']).use([middleware.auth()])
router.get('/categories/:id', [CategoriesController, 'show']).use([middleware.auth()])
router.put('/categories/:id', [CategoriesController, 'update']).use([middleware.auth()])
router.delete('/categories/:id', [CategoriesController, 'destroy']).use([middleware.auth()])
