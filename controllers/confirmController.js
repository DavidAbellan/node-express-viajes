let mod = require('../models');
async function confirma (id) {
   return await mod.confirm.create({ hash : id + Date.now() , userId: id } )
}
async function existe(hash){
 return await mod.confirm.findOne({where:{hash}})
  
}
module.exports = {
  existe,
  confirma
}