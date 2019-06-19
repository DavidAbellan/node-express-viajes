var express = require('express');
var router = express.Router();
let email = require('../config/emailConf');
let path = require('path');
let hbs =  require('nodemailer-express-handlebars');
var confirm = require('../controllers/confirmController');
var userContr = require('../controllers/userController');
var viajContr = require('../controllers/viajeController');
var upload = require('../config/multer');
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
    let hash;

   
    req.session.email = NuevoUser.email;
    req.session.password = NuevoUser.password;
    req.session.nombre = NuevoUser.nombre;

    hash =  (confirm.confirma(NuevoUser.id));

    

    email.transporter.use('compile',hbs ({
      viewEngine : {
        extName: '.hbs',
        partialsDir: {__dirname}  + '/../views/templates',
        layoutsDir: {__dirname}  + '/../views/layout',
        defaultLayout : 'cabeceraMail.hbs'
      },
        extName:'.hbs',
        viewPath : path.join( __dirname,'/../views/templates')


    },))

    let message = {
      to: 'Owax90@gmail.COM',
      subject : 'Hola  ' + NuevoUser.nombre,
      template : 'mail',
      context : {
        empresa : 'Viajes Ajes',
        copyright: 'Este correo es confidencial o no',
        confirmacion :'<a>' + hash + '</a>'
      }
     
    }
    email.transporter.sendMail(message);

    
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

router.post('/admin/insert',upload.single('file'), async function (req, res) {
  await viajContr.insertaViaje(req.body);
  if(!req.file) {
    return res.status(500).send('No has seleccionado un archivo valido');
  }
  res.redirect('/')

})


module.exports = router;