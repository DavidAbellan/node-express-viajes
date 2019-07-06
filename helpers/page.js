let viajeContr = require('../controllers/viajeController');
let mod = require('../models');



async function recuperaViajes(page){
    let pageSize = 6;
    let offset = page * pageSize;
    let limit = pageSize; 
    return await mod.viaje.findAll( {
         offset,
         limit} 
    );
}



async function numeroPagina() {
    let viajes = await viajeContr.recuperaViajes();
    let numeroViajes = Number(viajes.length);
    console.log(numeroViajes);
    numeroViajes = numeroViajes/6;
    return numeroViajes;

}

module.exports ={
recuperaViajes,    
numeroPagina }
    