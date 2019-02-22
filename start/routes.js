'use strict'

const Route = use('Route')

Route.post('users', 'UserController.store')
Route.post('sessions', 'SessionController.store')

Route.post('forgot', 'ForgotPasswordController.store')
Route.put('forgot', 'ForgotPasswordController.update')
