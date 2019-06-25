var express = require('express');
var router = express.Router();
let path = require('path');

let viajContr = require('../controllers/viajeController');
let imgContr = require('../controllers/imageController');
let userContr = require('../controllers/userController')

router.post('/convert/:id', async function(req,res){
  let id = req.params.id;
  let admin;
  let usuarios;
  console.log('REQUEST BODY ::::::',req.body.checkAdmin);

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
  