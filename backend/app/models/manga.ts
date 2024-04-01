import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, belongsTo, column } from '@adonisjs/lucid/orm'
import { v4 } from 'uuid'
import User from './user.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Category from './category.js'

export default class Manga extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare slug: string

  @column()
  declare synopsis: string

  @column()
  declare stars: number

  @column()
  declare status: string

  @column()
  declare type: 'ANIME' | 'MANGA' | 'MANHUA' | 'COMIC' | 'NOVEL'

  @column({ columnName: 'en_title' })
  declare enTitle: string

  @column({ columnName: 'jp_title' })
  declare jpTitle: string

  @column({ columnName: 'poster_img' })
  declare posterImg: string

  @column({ columnName: 'cover_img' })
  declare coverImg: string

  @column({ columnName: 'category_id' })
  declare categoryId: number

  @column({ columnName: 'user_id' })
  declare userId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  static createUUID(model: Manga) {
    model.id = v4()
  }

  @belongsTo(() => User, {
    foreignKey: 'userId',
  })
  declare user: BelongsTo<typeof User>

  @belongsTo(() => Category, {
    foreignKey: 'categoryId',
  })
  declare category: BelongsTo<typeof Category>
}
