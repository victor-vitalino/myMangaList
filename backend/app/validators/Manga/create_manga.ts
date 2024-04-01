import vine from '@vinejs/vine'

export const createMangaValidator = vine.compile(
  vine.object({
    jpTitle: vine.string().trim().minLength(2),
    enTitle: vine.string().trim().minLength(2),
    slug: vine.string().trim(),
    synopsis: vine.string().trim().minLength(2),
    status: vine.string().trim().minLength(2),
    type: vine.enum(['ANIME', 'MANGA', 'MANHUA', 'COMIC', 'NOVEL']),
    posterImg: vine.string(),
    coverImg: vine.string(),
  })
)

export const updateMangaValidator = vine.compile(
  vine.object({
    jpTitle: vine.string().trim().minLength(2).optional(),
    enTitle: vine.string().trim().minLength(2).optional(),
    slug: vine.string().trim().optional(),
    synopsis: vine.string().trim().minLength(2).optional(),
    status: vine.string().trim().minLength(2).optional(),
    type: vine.enum(['ANIME', 'MANGA', 'MANHUA', 'COMIC', 'NOVEL']).optional(),
    posterImg: vine.string().optional(),
    coverImg: vine.string().optional(),
    stars: vine.number().optional(),
    categoryId: vine
      .number()
      .exists(async (db, value, field) => {
        console.log(value,field)
        const user = await db.from('categories').where('id', value).first()
        return user
      })
      .optional(),
  })
)
