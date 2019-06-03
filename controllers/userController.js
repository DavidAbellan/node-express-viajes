let mod = require("../models");
let cript = require("bcrypt");

function insertaUsuario(usuario){
  
   return mod.user.create(usuario);
}
async function recuperaMail (mail) {
     
   return await mod.user.findAll({
      where: {
         email: mail
      }
   })
}

async function recuperaUser (e,p){
   console.log('email' , e);
   console.log('pass', p );
  return await mod.user.findAll({
   where:{
      email : e,
      password : p
   }

  })
}



module.exports = {
     recuperaMail,
     insertaUsuario,
     recuperaUser
     
}
