import router from '@adonisjs/core/services/router'
import MangaController from '#controllers/Manga/manga_controller'
import { middleware } from '../kernel.js'

router.get('/manga', [MangaController, 'index']).use([middleware.auth()])
router.post('/manga', [MangaController, 'store']).use([middleware.auth()])
router.get('/manga/:id', [MangaController, 'show']).use([middleware.auth()])
router.put('/manga/:id', [MangaController, 'update']).use([middleware.auth()])
router.delete('/manga/:id', [MangaController, 'destroy']).use([middleware.auth()])
