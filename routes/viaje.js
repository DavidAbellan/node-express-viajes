var express = require('express');
var router = express.Router();

var imgControl = require('../controllers/imageController');
var viajeControl = require('../controllers/viajeController');


///mover el insert y el detalle aquI

router.post('/edita/:id', async function(req,res){
   
    if (req.body.edita){
        let viaje = await viajeControl.encuentraViajePorId(req.params.id);
        let imagenes = await imgControl.recuperarImagenes(req.params.id);
        imagenes = imagenes.map(i => { 
            return{
                nombre :'/uploads/'+ i.images,
                idviaje : i.viajeid

            }
        })
        res.render('editViaje',{
        imagenes,      
        viaje
         })

    } else if (req.body.borra) {
        await viajeControl.borrarViaje(req.params.id);
        await imgControl.borrarImagenesViaje(req.params.id);
        res.redirect('/');

    }
    
    

})
router.post('/modify/:id', async function(req,res) {
    let viaje ={
        destino : req.body.destino,
        precio : req.body.precio,
        descuento : req.body.descuento,
        fechaSalida: req.body.fechaSalida,
        fechaVuelta: req.body.fechaVuelta
    }
    let id =req.params.id;
    await viajeControl.actualizaViaje(viaje,id);
    res.redirect('/');
})



module.exports = router;