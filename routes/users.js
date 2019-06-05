var express = require('express');
var router = express.Router();
var userContr = require('../controllers/userController')
var viajContr = require('../controllers/viajeController')
var flash = require('connect-flash');
var moment = require('moment');

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

    console.log(NuevoUser.email);
    req.session.email = NuevoUser.email;
    req.session.password = NuevoUser.password;
    req.session.nombre = NuevoUser.nombre;

    res.redirect('/')
  } else {

    //definir flash
    req.flash('error', 'el usuario ya existe');
    res.redirect('/users/form');
  }
})

router.post('/login', async function (rq, rs) {

  let viajes = await viajContr.recuperaViajes();
  let mail = rq.body.email;
  let pass = rq.body.password;
  let formatoViaje = viajes
  formatoViaje.map(a => {
    return {
      destino: a.destino,
      imagen: a.imagen,
      precio: a.precio,
      descuento: a.descuento,
      fechaSalida: moment(a.fechaSalida).subtract(10, 'days').calendar()
    }
  })

  let NuevoUser;
  NuevoUser = await userContr.recuperaUser(rq.body.email, rq.body.password);
  if (NuevoUser === undefined) {

    rs.redirect('/');

  } else {
    rq.session.email = mail;
    rq.session.password = pass;
    rq.session.nombre = NuevoUser[0].nombre;


    rs.render('index', {
      NuevoUser: NuevoUser[0],
      formatoViaje
    })
  }

})

router.get('/admin', (req, res) => {
  res.render('insertaViaje');

})

router.post('/admin/insert', async function (req, res) {
  await viajContr.insertaViaje(req.body);
  let viajes = await viajContr.recuperaViajes();
  res.render('index', {
    viajes
  });

})

router.get('/:id', async function (req, res) {
  let viaje = await viajContr.encuentraViajePorId(req.params.id);
  console.log('VIAJE FORMATEADO ; ',viaje);
  let formatoViaje = {
      destino: viaje.destino,
      imagen: viaje.imagen,
      precio: viaje.precio,
      descuento: viaje.descuento,
      fechaSalida: moment(viaje.fechaSalida).subtract(10, 'days').calendar(),
      fechaVuelta: moment(viaje.fechaSalida).subtract(10, 'days').calendar()
    } 
    res.render('detalle', {
    formatoViaje
    })});

module.exports = router;
