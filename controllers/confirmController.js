let mod = require('../models');
async function confirma (id) {
   return await mod.confirm.create({ hash : String.fromCharCode(97 + (id)) , userId: id } )
}
module.exports = {
  confirma
}