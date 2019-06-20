let mod = require('../models');

function recuperaViajes(){
     return mod.viaje.findAll();
}

async function insertaViaje(viaje){
     return await mod.viaje.create(viaje)
}

async function encuentraViajePorId(id){
     return await mod.viaje.findByPk(id) 
}

module.exports= {
   
  encuentraViajePorId, 
  recuperaViajes,
  insertaViaje

}