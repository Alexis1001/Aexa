'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TwoStepSchema extends Schema {
  up () {
    this.create('two_steps', (table) => {
      table.increments()
      table.integer('number').notNullable()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.timestamps()
    })
  }

  down () {
    this.drop('two_steps')
  }
}

module.exports = TwoStepSchema
