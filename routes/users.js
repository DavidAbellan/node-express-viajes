var express = require('express');
var router = express.Router();
var confirm = require('../controllers/confirmController');
var userContr = require('../controllers/userController');
var viajContr = require('../controllers/viajeController');
var emailContr = require('../controllers/emailController');
var flash = require('connect-flash');
var moment = require('moment');
var loginMid = require('../middleware/Logged')
const RUTA = 'http://localhost:3000/'

/* GET users listing. */
router.get('/form', function (req, res) {
  //leer sesion flash
 let error = req.flash('error')

  // pasar flash al render
  res.render('formulario', {
    error
  });
})

router.post('/form', async function (req, res) {

  let coincidencia = await userContr.recuperaMail(req.body.email);

  if (!coincidencia) {
    let NuevoUser = await userContr.insertaUsuario(req.body);
    let hash = await confirm.confirma(NuevoUser.id);
    if (NuevoUser.activate){
    req.session.email = NuevoUser.email;
    req.session.nombre = NuevoUser.nombre;
    req.session.admin = NuevoUser.administrador;
  }
  
 
  await emailContr.emailConfirmacion(NuevoUser,hash);
    res.redirect('/')
  } else {

    //definir flash
    req.flash('error', 'el usuario ya existe');
    res.redirect('/users/form');
  }
})


router.post('/login',  async function (rq, rs) {
  let pagina = rq.params.pagina
  let mail = rq.body.email;

  let nuevoUser = await userContr.recuperaMail(rq.body.email);
  if (!nuevoUser) {

    rs.redirect('/');

  } else if (nuevoUser.activate) {
    rq.session.email = mail;
    rq.session.nombre = nuevoUser.nombre;
    rq.session.administrador =nuevoUser.administrador;
    rq.session.userId = nuevoUser.id;
    rs.redirect('/')
  } else {
    rs.redirect('/')
  }

})

router.get('/logoff', async function(req,res){
   req.session.destroy(function (err) {
       if (err) {
           res.send(err)
       }

       res.redirect('/')
   })
})

router.get('/forgot', function(req,res){
  res.render('password');
})
router.post('/sendpass', async function(req,res){
  let user = await userContr.recuperaMail(req.body.email);
  if (!user){
    req.flash('error', 'el usuario no existe');
    res.render('password');


  } else {
    emailContr.enviarIdaMail(user)
    res.redirect('/')
  }
})



router.get('/activate/now/:hash', async function (req,res) {
  
  let hash = await confirm.existe(req.params.hash);
  
 
  if (!hash){
    let error= req.flash(error);
    res.redirect('/');
    
    
  } else {
    let NuevoUser = await userContr.recuperaUserPorId(hash.userId);
    await userContr.activaUsuario(hash.id);
    
    req.session.email = NuevoUser.email;
    req.session.nombre = NuevoUser.nombre;
    req.session.admin = NuevoUser.administrador;
   
    res.redirect('/');
  }})


router.get('/carrito', async function(req,res){
  let carritoCompra;
  if (!req.session.carritoCompra){
     carritoCompra= false  
  } else {
    carritoCompra =  req.session.carritoCompra
   }
  let total = 0;    
  for(viaje of carritoCompra){
    total +=  viaje.precio
  } 

  res.render('carrito',{
    carritoCompra,
    total
  })
})

router.get('/anade/:id',async function(req,res){
  let viaje = await viajContr.encuentraViajePorId(req.params.id);
  if(!req.session.carritoCompra){
    req.session.carritoCompra =[{ viaje: viaje.destino, precio : viaje.precio }]
  } else {
    req.session.carritoCompra.push({ viaje: viaje.destino, precio : viaje.precio })
  }
  res.redirect('/');
})


module.exports = router;