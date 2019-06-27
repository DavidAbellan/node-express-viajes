var express = require('express');
var router = express.Router();
var upload = require('../config/multer');


var imgControl = require('../controllers/imageController');
var viajeControl = require('../controllers/viajeController');




router.post('/edita/:id', async function(req,res){
   
    if (req.body.edita){
        let viaje = await viajeControl.encuentraViajePorId(req.params.id);
        let imagenes = viaje.fotos;
        imagenes = imagenes.map(i => { 
            return{
                nombre :'http://localhost:3000/'+ i.images,
                viajeId : i.viajeId,
                id : i.id
                
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
router.post('/borra/imagen/:id', async function(req,res){
    console.log('REQ PARAMAS :::', req.params);
    let imagen = await imgControl.recuperaImagenPorId(req.params.id);
    console.log('IIMAGEN::::',imagen);
    let idviaje = imagen.viajeId;
    console.log('ID VIAJE @:::::',idviaje);
    await imgControl.borraImagen(req.params.id);
    let viaje = await viajeControl.encuentraViajePorId(idviaje);
    let imagenes = await imgControl.recuperarImagenes(idviaje);
    imagenes = imagenes.map(i => { 
        return{
            nombre :'http://localhost:3000/'+ i.images,
            viajeId : i.viajeId,
            id : i.id

        }
    })
        
        res.render('editViaje',{
        imagenes,      
        viaje
         })

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

router.post('/insert',upload.array('file',10), async function (req, res) {
    if(!req.files) {
      return res.status(500).send('No has seleccionado un archivo valido');
  
    }
        let travel = req.body ;
        travel.imagen = req.files[0].filename
        let viaje = await viajeControl.insertaViaje(travel);
        let idviaje = viaje.id;
        await imgControl.insertarImagenes(req.files,idviaje);
        
    
    res.redirect('/')
  
  })



module.exports = router;