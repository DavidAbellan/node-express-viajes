function isLogged(req, res, next){
    if(req.session )
    {
       next(); 
    } else {
       res.status(401).send(error)  ; 
    }
}
module.exports = isLogged;