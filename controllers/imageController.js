let mod = require('../models');

async function insertarImagenes (array,viajeId){
    let arrPaths = array.map(a =>({ images : a.filename, viajeId}))
    return await mod.image.bulkCreate(arrPaths);
}
 async function recuperarImagenPrincipal(idviaje){
    let imgPrin = await mod.image.findAll({where : {viajeId : idviaje}})
    return imgPrin[0].images;
}
async function recuperarImagenes(idviaje){
    let imgPrin = await mod.image.findAll({where : {viajeId : idviaje}})
    return imgPrin;
}



module.exports = {
    recuperarImagenes,
    insertarImagenes,
    recuperarImagenPrincipal
}