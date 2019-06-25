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
async function borrarViaje(viajeId){
     return await mod.viaje.destroy({where:{id : viajeId}});

}
async function actualizaViaje(viaje,viajeid){
    
     return await mod.viaje.update({destino : viaje.destino,
                                   precio : viaje.precio,
                                   descuento : viaje.descuento,
                                   fechaSalida : viaje.fechaSalida,
                                   fechaVuelta : viaje.fechaVuelta},
                                   {where :{id:viajeid}}    )
}

module.exports= {
  actualizaViaje,      
  borrarViaje,    
  encuentraViajePorId, 
  recuperaViajes,
  insertaViaje

}