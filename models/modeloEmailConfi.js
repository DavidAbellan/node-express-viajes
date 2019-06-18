module.exports= (sequelize, dataTypes)=>{
    let confirm = (sequelize.define('confirm',{
        hash : dataTypes.STRING
       
    } ))
    confirm.associate = function (models){
        models.confirm.belongsTo(models.user)

    }

    return confirm;
}