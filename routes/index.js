var express = require('express');
var router = express.Router();

let paginacion = require('../helpers/page')
var viajContr = require('../controllers/viajeController');
var moment = require('moment');





/* GET home page. */
router.get('/detalle/:id', async function (req, res) {
  let viaje = await viajContr.encuentraViajePorId(req.params.id);
  let admin = req.session.admin;
  let user = req.session.nombre;

  res.render('detalle', {
    admin,
    viaje,
    user
  })
});
router.get('/:pagina?', async function (req, res, next) {
  let pagina = req.params.pagina;
  let primeraPagina; 
  let ultimaPagina;
  

  if (!pagina){
    pagina = 0;
  }
  if (pagina==0){
    primeraPagina=true
  } else {
    primeraPagina=false
  }
  let limite = await paginacion.numeroPagina();

  if((limite-1) >= pagina){
    ultimaPagina = false;
  }else{
    ultimaPagina= true;
  }
 
  let viajes = await paginacion.recuperaViajes(pagina);
 
  res.render("index", {
    viajes,
    pagina,
    paginaSiguiente: Number(pagina) + 1,
    paginaAnterior : Number(pagina) - 1,
    primeraPagina,
    ultimaPagina
  })
});





module.exports = router;
