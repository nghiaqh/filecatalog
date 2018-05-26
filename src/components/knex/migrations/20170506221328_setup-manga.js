
exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('series', (table) => {
      table.increments('series_id')
      table.string('title').notNullable().index()
      table.text('cover_picture')
      table.text('description')
      table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'))
      table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now())
      table.collate('utf8_general_ci')
      table.charset('utf8')
    })
      .then(res => console.log('Created "series" table'))
      .catch(err => console.log(err)),

    knex.schema.createTable('manga', (table) => {
      table.increments('manga_id')
      table.string('title').notNullable()
      table.text('cover_picture')
      table.text('description')
      table.integer('number_of_chapters')
      table.integer('series_id').unsigned()
      table.foreign('series_id').references('series.series_id')
        .onUpdate('CASCADE').onDelete('CASCADE')
      table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'))
      table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now())
      table.collate('utf8_general_ci')
      table.charset('utf8')
    })
      .then(res => console.log('Created "manga" table'))
      .catch(err => console.log(err)),

    knex.schema.createTable('chapter', (table) => {
      table.increments('chapter_id')
      table.integer('number').notNullable().unsigned()
      table.string('title')
      table.text('cover_picture')
      table.text('description')
      table.integer('manga_id').unsigned().notNullable()
      table.foreign('manga_id').references('manga.manga_id')
        .onUpdate('CASCADE').onDelete('CASCADE')
      table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'))
      table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now())
      table.collate('utf8_general_ci')
      table.charset('utf8')
    })
      .then(res => console.log('Created "chapter" table'))
      .catch(err => console.log(err)),

    knex.schema.createTable('page', (table) => {
      table.increments('page_id')
      table.integer('number')
      table.text('src').notNullable()
      table.integer('manga_id').unsigned().notNullable()
      table.foreign('manga_id').references('manga.manga_id')
        .onUpdate('CASCADE').onDelete('CASCADE')
      table.integer('chapter_number').unsigned().notNullable()
      table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'))
      table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now())
      table.collate('utf8_general_ci')
      table.charset('utf8')
    })
      .then(res => console.log('Created "page" table'))
      .catch(err => console.log(err)),

    knex.schema.createTable('author', (table) => {
      table.increments('author_id')
      table.string('name').notNullable()
      table.unique('name')
      table.text('bio')
      table.text('photo')
      table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'))
      table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now())
      table.collate('utf8_general_ci')
      table.charset('utf8')
    })
      .then(res => console.log('Created "author" table'))
      .catch(err => console.log(err)),

    knex.schema.createTable('genre', (table) => {
      table.increments('genre_id')
      table.string('name').notNullable()
      table.unique('name')
      table.text('description')
      table.text('cover_picture')
      table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'))
      table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now())
      table.collate('utf8_general_ci')
      table.charset('utf8')
    })
      .then(res => console.log('Created "genre" table'))
      .catch(err => console.log(err)),

    knex.schema.createTable('manga_author', (table) => {
      table.increments('id')
      table.integer('manga_id').unsigned().notNullable()
      table.foreign('manga_id').references('manga.manga_id')
        .onUpdate('CASCADE').onDelete('CASCADE')
      table.integer('author_id').unsigned().notNullable()
      table.foreign('author_id').references('author.author_id')
        .onUpdate('CASCADE').onDelete('CASCADE')
      table.unique(['manga_id', 'author_id'])
    })
      .then(res => console.log('Created "manga_author" table'))
      .catch(err => console.log(err)),

    knex.schema.createTable('manga_genre', (table) => {
      table.increments('id')
      table.integer('manga_id').unsigned().notNullable()
      table.foreign('manga_id').references('manga.manga_id')
        .onUpdate('CASCADE').onDelete('CASCADE')
      table.integer('genre_id').unsigned().notNullable()
      table.foreign('genre_id').references('genre.genre_id')
        .onUpdate('CASCADE').onDelete('CASCADE')
      table.unique(['manga_id', 'genre_id'])
    })
      .then(res => console.log('Created "manga_genre" table'))
      .catch(err => console.log(err)),

    knex.schema.createTable('series_author', (table) => {
      table.increments('id')
      table.integer('series_id').unsigned().notNullable()
      table.foreign('series_id').references('series.series_id')
        .onUpdate('CASCADE').onDelete('CASCADE')
      table.integer('author_id').unsigned().notNullable()
      table.foreign('author_id').references('author.author_id')
        .onUpdate('CASCADE').onDelete('CASCADE')
      table.unique(['series_id', 'author_id'])
    })
      .then(res => console.log('Created "series_author" table'))
      .catch(err => console.log(err))
  ])
}

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('manga_genre'),
    knex.schema.dropTable('manga_author'),
    knex.schema.dropTable('series_author'),
    knex.schema.dropTable('page'),
    knex.schema.dropTable('chapter'),
    knex.schema.dropTable('manga'),
    knex.schema.dropTable('series'),
    knex.schema.dropTable('author'),
    knex.schema.dropTable('genre')
  ])
}
