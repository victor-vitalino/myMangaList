import vine from '@vinejs/vine'

export const createPostValidator = vine.compile(
  vine.object({
    jpTitle: vine.string().trim().minLength(2),
    enTitle: vine.string().trim().minLength(2),
    slug: vine.string().trim(),
    synopsis: vine.string().trim().minLength(2),
    status: vine.string().trim().minLength(2),
    type: vine.enum(['ANIME', 'MANGA', 'MANHUA', 'COMIC', 'NOVEL']),
    posterImg: vine.string().trim().escape(),
    coverImg: vine.string().trim().escape(),
  })
)
