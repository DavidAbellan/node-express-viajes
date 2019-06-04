var express = require('express');
var router = express.Router();
var viajContr = require('../controllers/viajeController');
var userContr = require('../controllers/userController')
var session = require('express-session');



/* GET home page. */
router.get('/', async function (req, res, next) {
  let viajes = await viajContr.recuperaViajes();

  if (req.session.nombre === undefined) {
    res.render('index', {
      viajes
    });

  }

  else {
    let NuevoUsuario = await userContr.recuperaUser(req.session.email, req.session.password);

    res.render('index', {
      viajes,
      NuevoUsuario
    });
  }
});





module.exports = router;
