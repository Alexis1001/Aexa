'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const User=use('App/Models/User');
var nodemailer = require('nodemailer');
const TwoStep=use('App/Models/TwoStep');

class UserController {
 
  async index ({ request, response, view }) {
    const user =await User.all();
    return response.json({user});
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
      const twoStep=new TwoStep();
      twoStep.user_id=user.id;
      var max=5000;
      var min=1000;
      var numero=Math.floor(Math.random() * (max - min)) + min;
      twoStep.number=numero;
      await twoStep.save();
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
  async forgotPassword({request,response}){
    const data=request.all();
    var sent="";
    console.log("entra aqui ")
    const user=await User.findByOrFail('email',data.email);
    var id=user.id;
    console.log("el email es ",user.email);
    var transporter = nodemailer.createTransport({
      service:'gmail',
      auth: {
        user: '171117@ids.upchiapas.edu.mx',
        pass: '171117GOAF2030'
      }
    });
    var mailOptions = {
      from: '171117@ids.upchiapas.edu.mx',
      to:data.email,
      subject: 'reset password',
      text: 'reset password',
      html: `<h1> reset password </h1>
      <p>link</p>
      <a href="http://localhost:8080/resetpassword/${id}">http://bancosDeSangre/resetpassword</a>`,
    }; 
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error){
          sent=false;
          console.log("correo no enviado ",error);
        }else {
          sent=true;
          console.log("correo enviado");
        }
    });
  }

  async resetPassword({request,response}){
    const data =request.all()
    const newPassword=data.newPassword;
    const id=data.id
    const user=await User.findByOrFail('id',id);
    if(user){
      user.password = newPassword;
      await user.save()
      return response.json({ message: 'Password Success!'})      
    }
    return response.json({message:'eror not password permited'});
  }



 
}

module.exports = UserController
