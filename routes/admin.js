var express = require('express');
var router = express.Router();
var upload = require('../config/multer');

let viajeControl = require('../controllers/viajeController');
let imgControl = require('../controllers/imageController');
let userContr = require('../controllers/userController')

router.post('/convert/:id', async function(req,res){
  let id = req.params.id;
  let admin;
  let usuarios;

  if (req.body.checkAdmin == 'on'){
    
    admin = true;
    await userContr.hazloAdmin(admin,id);
    
  }else if (req.body.checkAdmin == undefined)  {
    admin = false;
    await userContr.hazloAdmin(admin,id);
    
  }
  
  
  usuarios = await userContr.devuelveUsuarios();

  res.render('users', {
    usuarios
  } );  


})
router.post('/activa/user/:id',async function(req,res){
  let id = req.params.id;
  let usuarios;
 
  if(req.body.active == 'on'){
     await userContr.activaUsuario(id);
  }else if(req.body.active == undefined)  {
     await userContr.desactivaUsuario(id);
  }
  usuarios = await userContr.devuelveUsuarios();
  res.render('users', {
    usuarios
  } );
  

})
router.post('/viaje/insert',upload.array('file',10), async function (req, res) {
  if(!req.files) {
    return res.status(500).send('No has seleccionado un archivo valido');

  }
      let travel = req.body ;
      travel.imagen = req.files[0].filename
      let viaje = await viajeControl.insertaViaje(travel);
      let idviaje = viaje.id;
      await imgControl.insertarImagenes(req.files,idviaje);
      
  
  res.redirect('/')

})

  


router.get('/insertviaje', (req, res) => {
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
  