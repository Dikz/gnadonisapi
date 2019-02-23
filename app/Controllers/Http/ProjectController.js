'use strict'

const Project = use('App/Models/Project')

/**
 * Resourceful controller for interacting with projects
 */
class ProjectController {
  /**
   * Show a list of all projects.
   * GET projects
   */
  async index({
    request,
    response,
    view
  }) {
    const projects = await Project.query().with('user').fetch()

    return projects
  }

  /**
   * Create/save a new project.
   * POST projects
   */
  async store({
    request,
    response,
    auth
  }) {
    const data = request.only(['title', 'description'])

    const project = await Project.create({
      ...data,
      user_id: auth.user.id
    })

    return project
  }

  /**
   * Display a single project.
   * GET projects/:id
   */
  async show({
    params
  }) {
    const project = await Project.findOrFail(params.id)

    // Pegando user e tasks do projeto
    await project.load('user')
    await project.load('tasks')

    return project
  }

  /**
   * Update project details.
   * PUT or PATCH projects/:id
   */
  async update({
    params,
    request,
    response
  }) {
    const project = await Project.findOrFail(params.id)
    const data = request.only(['title', 'description'])

    project.merge(data)

    await project.save()

    return project
  }

  /**
   * Delete a project with id.
   * DELETE projects/:id
   */
  async destroy({
    params
  }) {
    const project = await Project.findOrFail(params.id)

    await project.delete()
  }
}

module.exports = ProjectController
