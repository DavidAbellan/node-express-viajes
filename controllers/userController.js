let mod = require("../models");
let cript = require("bcrypt");

function insertaUsuario(usuario){
  
   return mod.user.create(usuario);
}




module.exports = {
     insertaUsuario
     
}
