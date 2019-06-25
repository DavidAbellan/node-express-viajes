var express = require('express');
var router = express.Router();
let path = require('path');

var viajContr = require('../controllers/viajeController');
var userContr = require('../controllers/userController');
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
    let NuevoUsuario = await userContr.recuperaUser(req.session.email, req.session.password);

    res.render('index', {
      formatoViaje,
      NuevoUsuario
    });
  }
});





module.exports = router;
