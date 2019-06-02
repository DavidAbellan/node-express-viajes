let mod = require('../models');

function recuperaViajes(){
 return mod.viaje.findAll();
}

module.exports= {
  recuperaViajes,

}