'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const User=use('App/Models/User');
/**
 * Resourceful controller for interacting with users
 */
class UserController {
 
  async index ({ request, response, view }) {
    const user =await User.all();
    return response.json({user});
  }

  
  async create ({ request, response, view }) {
  }

  async store ({ request, response }) {
    const data=request.all();
    const user=new User();
    user.username=data.username;
    user.email=data.email;
    user.password=data.password;

    if(data.username==null||data.email==null||data.password==null){
      return response.json({message:'fields emptys'});
    }
    else{
      await user.save();
      return this.login(...arguments);
    }

  }
  async login({request,response,auth}){
    const data=request.all();
    const token = await auth.attempt(data.email,data.password);
    const user =await User.findByOrFail('email',data.email);
    if(user.email){
      const admin=({
        id:user.id,
        username:user.username,
        email:user.email,
        token:token.token,
      });
      return response.json({admin});
    }

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

module.exports = UserController
