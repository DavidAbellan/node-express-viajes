var express = require('express');
var router = express.Router();
let path = require('path');

var viajContr = require('../controllers/viajeController');
var imgContr = require('../controllers/imageController');
var moment = require('moment');
var winston =require('../config/winston')
const puerto = 'http://localhost:3000/';



/* GET home page. */
router.get('/detalle/:id', async function (req, res) {
    let viaje = await viajContr.encuentraViajePorId(req.params.id);
    let imagenes = await imgContr.recuperarImagenes(req.params.id);
    let formatoViaje = viaje ;
    let isAdmin = req.session.admin;
    formatoViaje.imagen = 'http://localhost:3000/' + viaje.imagen;
    imagenes = imagenes.map((i)=>{i.imagen = puerto + i.imagen});
    

  res.render('detalle', {
    isAdmin,
    formatoViaje,
    imagenes
  })
});
router.get('/', async function (req, res, next) {
  console.log('NUEVO SUSEREARAR:::',req.session);
  
  let viajes = await viajContr.recuperaViajes();
  let formatoViaje = viajes
   formatoViaje.map(v => {  
       return { 
          destino : v.destino,
          precio :  v.precio ,
          imagen : '/uploads/' + v.imagen,
          descuento :v.descuento ,
          fechaSalida: moment(v.fechaSalida).subtract(10, 'days').calendar(), 
          id : v.id 
        };    
    })
    
   
  if (req.session.nombre === undefined) {
    res.render('index', {
      formatoViaje
    });

  } else {
    let NuevoUser = {
      nombre : req.session.nombre,
      email : req.session.email,
      administrador : req.session.admin
    }
    
    
    
    res.render('index', {
      formatoViaje,
      NuevoUser 
    });
  }
});





module.exports = router;
