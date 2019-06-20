var express = require('express');
var router = express.Router();
var viajContr = require('../controllers/viajeController');
var userContr = require('../controllers/userController');
var imgContr = require('../controllers/imageController');
var moment = require('moment');



/* GET home page. */
router.get('/viaje/:id', async function (req, res) {
    let viaje = await viajContr.encuentraViajePorId(req.params.id);
    
    let formatoViaje = {
      destino: viaje.destino,
      imagen:'/uploads/' + viaje.imagen,
      precio: viaje.precio,
      descuento: viaje.descuento,
      fechaSalida: moment(viaje.fechaSalida).subtract(10, 'days').calendar(),
      fechaVuelta: moment(viaje.fechaSalida).subtract(10, 'days').calendar()
    }
    
  res.render('detalle', {
    formatoViaje
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
            }    
           } )
    
         
  
            
     

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
