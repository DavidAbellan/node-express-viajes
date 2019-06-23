var express = require('express');
var router = express.Router();
let path = require('path');

let viajContr = require('../controllers/viajeController');
let imgContr = require('../controllers/imageController');
let userContr = require('../controllers/userController')
var upload = require('../config/multer');



router.post('/insert',upload.array('file',10), async function (req, res) {
    if(!req.files) {
      return res.status(500).send('No has seleccionado un archivo valido');
  
    }
        let travel = req.body ;
        travel.imagen = req.files[0].filename
        let viaje = await viajContr.insertaViaje(travel);
        let idviaje = viaje.id;
        await imgContr.insertarImagenes(req.files,idviaje);
        
    
    res.redirect('/')
  
  })

  router.get('/', (req, res) => {
    res.render('insertaViaje');
  
  })
  router.post('/users/borrar/:id', async function (req,res){
    await userContr.borraUsuario(req.params.id);
    let usuarios = await userContr.devuelveUsuarios();
    
    res.render('users', {
      usuarios
    } );


  })

  router.get('/users', async function (req , res)  {
    let usuarios = await userContr.devuelveUsuarios();
    
    res.render('users', {
      usuarios
    } );
  })

  module.exports = router;
  