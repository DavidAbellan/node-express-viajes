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

  if (coincidencia.length == 0) {
    let NuevoUser = await userContr.insertaUsuario(req.body);
    let hash = await confirm.confirma(NuevoUser.id);
    req.session.email = NuevoUser.email;
    req.session.nombre = NuevoUser.nombre;
    req.session.admin = NuevoUser.administrador;
    await emailContr.emailConfirmacion(NuevoUser,hash);
    res.redirect('/')
  } else {

    //definir flash
    req.flash('error', 'el usuario ya existe');
    res.redirect('/users/form');
  }
})


router.post('/login',  async function (rq, rs) {

  let viajes = await viajContr.recuperaViajes();
  let mail = rq.body.email;
  let formatoViaje = viajes.map(a => {
    return {
      id : a.id,
      destino: a.destino,
      imagen: RUTA + a.imagen,
      precio: a.precio,
      descuento: a.descuento,
      fechaSalida: moment(a.fechaSalida).subtract(10, 'days').calendar()
    }
  })

  let NuevoUser;
  NuevoUser = await userContr.recuperaMail(rq.body.email);
  if (NuevoUser === undefined) {

    rs.redirect('/');

  } else if (NuevoUser[0].activate) {
    rq.session.email = mail;
    rq.session.nombre = NuevoUser[0].nombre;
    rq.session.admin = NuevoUser[0].administrador;

    rs.render('index', {
      NuevoUser: NuevoUser[0],
      formatoViaje
    })
  } else {
    rs.redirect('/'
    )
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
  if (user === undefined){
    req.flash('error', 'el usuario no existe');

  } else {
    emailContr.enviarIdaMail(user)
    console.warn('hecho!', 'Se ha enviado un correo con tu password a' + req.body.email)
    res.redirect('/')
  }
})



router.get('/activate/now/:hash', async function (req,res) {
  let hash = await confirm.existe(req.params.hash);
  
  if (hash === undefined){
    let error= req.flash(error);
    res.redirect('/');
    
    
  } else {
    let NuevoUser = await userContr.recuperaUserPorId(hash.userId);
    let viajes = await viajContr.recuperaViajes();
    await userContr.activaUsuario(hash.id);
    
    req.session.email = NuevoUser.email;
    req.session.nombre = NuevoUser.nombre;
    req.session.admin = NuevoUser.administrador;
    
    let formatoViaje = viajes.map(a => {
      return{
        destino: a.destino,
        imagen: RUTA + a.imagen,
        precio: a.precio,
        descuento: a.descuento,
        fechaSalida: moment(a.fechaSalida).subtract(10, 'days').calendar()}});
     res.render('index', {
      NuevoUser,
      formatoViaje
    }) ;


  }

})


module.exports = router;