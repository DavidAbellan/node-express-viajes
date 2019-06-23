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
  
    if (password.length > 0){
        let pass = await desencriptar(p,password[0].password); 
               if(pass){
                  return await mod.user.findAll({
                               where:{
                               email : e,
                               password :  password[0].password,
                                                                }
   
})} }}

async function recuperaUserPorId(id){
   return await mod.user.findOne({where:{id}} );
}

async function devuelveUsuarios(){
   return await mod.user.findAll();
}
async function borraUsuario(userId){
   await mod.user.destroy({where:{id : userId}});
}
async function actualizaPassword(user,nuevoPassword){
   console.log('USERERERERER:',user);
   console.log('newPAss ; ',nuevoPassword);

   let newPass = await encriptar(''+nuevoPassword)
   console.log('newPAss ; ',newPass);
   await mod.user.update( {password:newPass},
                          {where:{ id : user.id}}
                     );

}

module.exports = {

     actualizaPassword,  
     borraUsuario,
     devuelveUsuarios,
     recuperaUserPorId,
     recuperaMail,
     insertaUsuario,
     recuperaUser
     
}
