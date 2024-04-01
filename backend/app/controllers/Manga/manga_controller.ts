import type { HttpContext } from '@adonisjs/core/http'
import Manga from '#models/manga'
import { createMangaValidator, updateMangaValidator } from '../../validators/Manga/create_manga.js'

export default class MangaController {
  /**
   * Display a list of resource
   */
  async index({ request, auth }: HttpContext) {
    const user = auth.getUserOrFail()
    const { search = undefined, page = 1 } = request.qs()
    const mangas = await Manga.query()
      .where('user_id', user.id)
      .where((qs) => {
        if (search) {
          qs.where('slug', `%${search}%`)
        }
      })
      .paginate(page, 10)

    return mangas
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, auth, response }: HttpContext) {
    const user = auth.getUserOrFail()

    const { coverImg, enTitle, jpTitle, posterImg, slug, status, synopsis, type } =
      await request.validateUsing(createMangaValidator)

    const manga = await Manga.create({
      coverImg,
      enTitle,
      jpTitle,
      posterImg,
      slug,
      status,
      synopsis,
      type,
      stars: 0,
      userId: user.id,
    })
    return manga
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    const manga = await Manga.findByOrFail('id', params.id)
    return manga
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ request, params }: HttpContext) {
    const manga = await Manga.findByOrFail('id', params.id)

    const data = await request.validateUsing(updateMangaValidator)

    manga.merge(data)
    await manga.save()
    return manga
  }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {
    const manga = await Manga.findByOrFail('id', params.id)
    await manga.delete()
  }
}
