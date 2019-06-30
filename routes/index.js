var express = require('express');
var router = express.Router();

let paginacion = require('../helpers/page')
var viajContr = require('../controllers/viajeController');
var moment = require('moment');

if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}



/* GET home page. */
router.get('/detalle/:id', async function (req, res) {
  let viaje = await viajContr.encuentraViajePorId(req.params.id);
  let admin = req.session.admin;
  let user = req.session

  res.render('detalle', {
    admin,
    viaje,
    user
  })
});


router.get('/anterior',async function(req,res){
let pagina = Number(localStorage.getItem('page'));
 pagina--;
let viajes = await paginacion.recuperaViajes(pagina)
   localStorage.setItem('page', pagina.toString()) 
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
     pagina,
     formatoViaje
   });
 } else {
   let NuevoUser = {
     nombre : req.session.nombre,
     email : req.session.email,
     administrador : req.session.admin,
     carritoCompra : req.session.carritoCompra
  }
  let carritoCompra = req.session.carritoCompra;  

   if (!carritoCompra){
    carritoCompra=0;
  } else {
    carritoCompra = req.session.carritoCompra.length ;
  }
    res.render('index', {
     pagina,
     formatoViaje,
     NuevoUser,
     carritoCompra 
   });

 }


});

router.get('/siguiente',async function(req,res){
  let pagina = Number(localStorage.getItem('page'));
  pagina++;
  let numerototal = Number(localStorage.getItem('paginas'))
  if(numerototal > pagina){
    numerototal = false;
  } else {
    numerototal = true;
  } 
   let viajes = await paginacion.recuperaViajes(pagina)
   localStorage.setItem('page', pagina.toString()) 
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
     pagina,
     numerototal,
     formatoViaje
   });
 } else {
   let NuevoUser = {
     nombre : req.session.nombre,
     email : req.session.email,
     administrador : req.session.admin,
     carritoCompra : req.session.carritoCompra
   }
   let carritoCompra =  req.session.carritoCompra;
   if (!carritoCompra){
    carritoCompra = 0;
  } else {
    carritoCompra = req.session.carritoCompra.length ;
  }
   res.render('index', {
     pagina,
     numerototal,
     formatoViaje,
     NuevoUser ,
     carritoCompra
   });
} 
});
router.get('/', async function (req, res, next) {
  let numerototal =await paginacion.numeroPagina() 
  numerototal -= 1;
  localStorage.setItem('page','0'); 
  localStorage.setItem('paginas',numerototal)   
  let pagina = Number(localStorage.getItem('page'))
  let viajes = await paginacion.recuperaViajes(pagina);
  if(numerototal > pagina){
    numerototal = false;
  } else {
    numerototal = true;
  }
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
        pagina,
        numerototal,
        formatoViaje
      });
  } else {
    let NuevoUser = {
      nombre : req.session.nombre,
      email : req.session.email,
      administrador : req.session.admin,
    }
    carritoCompra = req.session.carritoCompra;
    if (!carritoCompra){
      carritoCompra=0;
    } else {
      carritoCompra = req.session.carritoCompra.length  ;
    }
   res.render('index', {
      pagina,
      numerototal,
      formatoViaje,
      NuevoUser ,
      carritoCompra
    });
  }
});





module.exports = router;
