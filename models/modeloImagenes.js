module.exports = (sequelize, dataTypes) => {
    let imagenes = sequelize.define('image',{
        images : dataTypes.STRING,
        
    })
    
    imagenes.associate = function (models){
        models.image.belongsTo(models.viaje),
        models.image.belongsTo(models.viaje, {as: "principal"})
    }
    return imagenes;
}