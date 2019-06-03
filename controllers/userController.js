let mod = require("../models");
let cript = require("bcrypt");

async function insertaUsuario(usuario){
   let result = await encriptar(usuario.password);
   usuario.password = result; 
   
   return mod.user.create(usuario);
}

function encriptar(pass){
   return cript.hash(pass,5);
}

function desencriptar(pass,password){
    return cript.compare(pass,password);////// el compare funciona con la contrasena de usuario, encriptada
 }                             ///// devuelve booleano

 async function recuperaMail (mail) {
     
   return await mod.user.findAll({
      where: {
         email: mail
      }
   })
}
async function recuperaUser (e,p){
  let password = await recuperaMail(e);
  let pass = await desencriptar(p,password[0].password); 
   
   
 if(pass){
     
     
  return await mod.user.findAll({
   where:{
      email : e,
      password :  password[0].password,
    }
   
  })} 
}



module.exports = {
     recuperaMail,
     insertaUsuario,
     recuperaUser
     
}
