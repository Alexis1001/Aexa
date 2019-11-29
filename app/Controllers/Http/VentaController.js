'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const History=use('App/Models/History');
const Bus=use('App/Models/Bus');
const Database = use('Database');
const Ventas=use('App/Models/Venta');

class VentaController {

  async index ({ request, response, view,auth }) {
    const user = await auth.getUser();
    const solds=await Ventas.all();
    return response.json({solds});
  }

  async indexByBus({response,request,auth}){
    const user = await auth.getUser();
    const data=request.all();
    const solds=await Database.table('ventas')
    .innerJoin('buses','buses.id','ventas.bus_id')
    .where('ventas.nameBus',data.nameBus)
    .select('ventas.nameBus','ventas.occupiedSeats','ventas.typeSeat',
    'ventas.freeSeats','ventas.specialFreeSeats','ventas.totalSeatsSold',
    'ventas.date','ventas.bus_id');
    
    return response.json({solds});
      
  }
  async create ({ request, response, view }) {
  }

  async store ({ request, response }) {
  }

  async show ({ params, request, response, view }) {
  }

  async edit ({ params, request, response, view }) {
  }

  async update ({ params, request, response }) {
  }


  async destroy ({ params, request, response }) {
  }
}

module.exports = VentaController
