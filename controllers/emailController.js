let config = require('../config/emailConf');
let userContr = require('../controllers/userController')
let hbs =  require('nodemailer-express-handlebars');
let ruta = 'http://localhost:3000/users/activate/now/';
let path = require('path');

async function enviarIdaMail(usuario){
   let nuevoPassword = usuario[0].id + Math.random()*1000 ;
   await userContr.actualizaPassword(usuario[0],nuevoPassword);
   config.transporter.use('compile',hbs ({
        viewEngine : {
          extName: '.hbs',
          partialsDir: {__dirname}  + '/../views/templates',
          layoutsDir: {__dirname}  + '/../views/layout',
          defaultLayout : 'recuperaMail.hbs'
        },
          extName:'.hbs',
          viewPath : path.join( __dirname,'/../views/templates')
  
  
      }))
   let message = {
        to: 'BarryelSucio@gmail.COM',
        subject : 'Hola  ' + usuario[0].nombre,
        template : 'mail',
        context : {
          empresa : 'Viajes Ajes',
          copyright: 'Este correo es confidencial, muy confidencial',
          password : nuevoPassword
        }
       
    }
      config.transporter.sendMail(message);


}

async function emailConfirmacion (usuario,hash){
    
    config.transporter.use('compile',hbs ({
        viewEngine : {
          extName: '.hbs',
          partialsDir: {__dirname}  + '/../views/templates',
          layoutsDir: {__dirname}  + '/../views/layout',
          defaultLayout : 'cabeceraMail.hbs'
        },
          extName:'.hbs',
          viewPath : path.join( __dirname,'/../views/templates')
  
  
      },))
  
      let message = {
        to: 'BarryelSucio@gmail.COM',
        subject : 'Hola  ' + usuario.nombre,
        template : 'mail',
        context : {
          empresa : 'Viajes Ajes',
          copyright: 'Este correo es confidencial, muy confidencial',
          confirmacion : ruta + hash.hash 
        }
       
      }
      config.transporter.sendMail(message);

}
module.exports = {
    enviarIdaMail,
    emailConfirmacion
}
