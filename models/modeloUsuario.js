

module.exports =(sequelize,dataTypes) => {
    let usuario = sequelize.define('user',{
    nombre: dataTypes.STRING,
    email: dataTypes.STRING,
    password : dataTypes.STRING,
    direccion: dataTypes.STRING,
    telefono : dataTypes.INTEGER,
    ciudad : dataTypes.STRING,
    administrador : dataTypes.BOOLEAN,
    activate :{type: dataTypes.BOOLEAN, defaultValue: false},
    
   })
   

return usuario;
}

