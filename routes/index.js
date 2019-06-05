var express = require('express');
var router = express.Router();
var viajContr = require('../controllers/viajeController');
var userContr = require('../controllers/userController')
var session = require('express-session');
var moment = require('moment');



/* GET home page. */
router.get('/', async function (req, res, next) {
  let viajes = await viajContr.recuperaViajes();
 
  let formatoViaje = viajes
  
  formatoViaje.map(a => {  
      return { 
             destino : a.destino,
             imagen : a.imagen ,
             precio : a.precio ,
             descuento : a.descuento ,
             fechaSalida: moment(a.fechaSalida).subtract(10, 'days').calendar(), 
             id : a.id 
            }           
  } )

  if (req.session.nombre === undefined) {
    res.render('index', {
      formatoViaje
    });

  }

  else {
    let NuevoUsuario = await userContr.recuperaUser(req.session.email, req.session.password);

    res.render('index', {
      formatoViaje,
      NuevoUsuario
    });
  }
});





module.exports = router;
