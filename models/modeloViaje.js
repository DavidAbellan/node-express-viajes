module.exports =(sequelize,dataTypes) => {
    let viaje = sequelize.define('viaje', {
       destino : dataTypes.STRING,
       precio : dataTypes.FLOAT,
       descuento : dataTypes.INTEGER,
       fechaSalida: dataTypes.DATE,
       fechaVuelta: dataTypes.DATE,
       imagen: dataTypes.STRING
       

    })
    viaje.associate = function(models){
       models.viaje.hasMany(models.image);
       models.viaje.hasOne(models.image, {as: "principal"})
    }

 return viaje;
    }
