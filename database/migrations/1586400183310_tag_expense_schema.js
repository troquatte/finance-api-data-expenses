'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TagExpenseSchema extends Schema {
  up () {
    this.create('tag_expenses', (table) => {
      table.increments()
      table.integer("tag_id").unsigned().index("tag_id");
      table.foreign("tag_id")
            .references("id")
            .inTable("tags")
            .onDelete("cascade")
            .onUpdate("cascade");

      table.integer("expense_id").unsigned().index("expense_id");
      table.foreign("expense_id")
            .references("id")
            .inTable("expenses")
            .onDelete("cascade")
            .onUpdate("cascade");

      table.timestamps()
    })
  }

  down () {
    this.drop('tag_expenses')
  }
}

module.exports = TagExpenseSchema
