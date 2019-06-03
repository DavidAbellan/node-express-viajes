let mod = require('../models');

function recuperaViajes(){
 return mod.viaje.findAll();
}

async function insertaViaje(viaje){

  return await mod.viaje.create(viaje)
}

module.exports= {

  recuperaViajes,
  insertaViaje

}