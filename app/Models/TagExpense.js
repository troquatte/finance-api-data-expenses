'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class TagExpense extends Model {
  static get hidden() {
    return ["pivot"]
  }

}

module.exports = TagExpense
