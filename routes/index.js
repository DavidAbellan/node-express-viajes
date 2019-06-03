var express = require('express');
var router = express.Router();
var viajContr = require('../controllers/viajeController');
var userContr = require('../controllers/userController');

var sesion = require('express-session');

/* GET home page. */
router.get('/',async function(req, res, next) {
  let viajes = await viajContr.recuperaViajes(); 
  res.render('index', { 
    viajes
  });
});





module.exports = router;
