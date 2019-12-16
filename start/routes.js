'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

Route.group(() => {
  Route.post('user/register','UserController.store');
  Route.post('user/login','UserController.login');
  Route.get('user/all','UserController.index');

  Route.post('user/sendEmail','UserController.forgotPassword')
  Route.post('user/resetPassword','UserController.resetPassword')
  
  Route.get('user/bus/all','BusController.index');
  Route.post('user/bus/add','BusController.create');
  Route.put('user/bus/update/status/:id','BusController.updateStatus');
  Route.put('user/bus/update/:id','BusController.update');
  Route.get('user/bus/:id','BusController.show');
  Route.put('user/bus/edit/:id','BusController.updateBusAll');
  Route.post('user/bus/name','BusController.showByName');

  
  Route.post('user/history','HistoryController.store');
  Route.get('user/history','HistoryController.index');
  Route.post('user/history/bus','HistoryController.indexByBus');

  Route.post('user/venta','VentaController.store'); 
  Route.get('user/venta','VentaController.index'); 
  Route.post('user/ventas/bus','VentaController.indexByBus'); 


}).prefix('api/v1/');

