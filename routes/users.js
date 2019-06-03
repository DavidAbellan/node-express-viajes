var express = require('express');
var router = express.Router();
var userContr = require('../controllers/userController')
var viajContr = require('../controllers/viajeController')

/* GET users listing. */
router.get('/form', function (req, res) {
  res.render('formulario');
})

router.post('/form', async function (req, res) {
  
  let viajes = await viajContr.recuperaViajes();
  let coincidencia = await userContr.recuperaMail(req.body.email);
  
  if (!coincidencia[0] ) {
    let NuevoUser = await userContr.insertaUsuario(req.body);
   
    
    
    res.render('index', {
      NuevoUser,
      viajes
    })
  } else {
    let existe = true;
    res.render('index', {
      viajes,
      existe
    }
    )
  }
})

router.post('/login', async function (rq, rs) {
 
  let viajes = await viajContr.recuperaViajes();
  let NuevoUser;
   NuevoUser = await userContr.recuperaUser(rq.body.email, rq.body.password);
  console.log('nuevouser : ',NuevoUser)
  if (NuevoUser === undefined){
      rs.send ('No existe el usuario'); 
         
  } else {
    
    rs.render('index', {
      NuevoUser : NuevoUser[0],
      viajes
    })
 }
})

router.get('/admin',(req,res)=>{
     res.render('insertaViaje');
  
})

router.post('/admin/insert',async function (req,res) {
 await viajContr.insertaViaje(req.body);
 let viajes = await viajContr.recuperaViajes();
 res.render('index',{
   viajes
 });

})
module.exports = router;
