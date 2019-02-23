'use strict'

const Model = use('Model')

class Project extends Model {
  user() {
    return this.belongsTo('App/Models/User')
  }

  tasks() {
    return this.hasMany('App/Model/Task')
  }
}

module.exports = Project
