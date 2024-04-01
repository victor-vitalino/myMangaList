import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'manga'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.string('en_title')
      table.string('jp_title')
      table.string('slug')
      table.text('synopsis')
      table.double('stars').defaultTo(0)
      table.string('status')
      table.enum('type', ['ANIME', 'MANGA', 'MANHUA', 'COMIC', 'NOVEL'])
      table.string('poster_img')
      table.string('cover_img')
      table.integer('category_id').references('id').inTable('categories').nullable()
      table.integer('user_id').references('id').inTable('users')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
