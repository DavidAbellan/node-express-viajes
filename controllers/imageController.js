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
async function borrarImagenesViaje(id){
    return await mod.image.destroy({where:{viajeId : id}});

}
async function borraImagen(idimagen){
    return await mod.image.destroy({where:{id:idimagen}});

}
async function recuperaImagenPorId(idfoto){
    return await mod.image.findOne( {where:{id:idfoto} } );
}




module.exports = {
    recuperaImagenPorId,
    borraImagen,
    borrarImagenesViaje,
    recuperarImagenes,
    insertarImagenes,
    recuperarImagenPrincipal
}