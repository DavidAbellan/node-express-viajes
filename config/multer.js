const multer = require('multer');
const storage = multer.diskStorage ({
    destination : (req , file , callback) => {
        callback(null, __dirname + '/../uploads');
    },
    filename : (req,file,callback) => {
        callback(null,String.fromCharCode( 97 + Math.random()*10) +  Date.now() + file.originalname ); 
    } 
})

const upload = multer({storage});
module.exports = upload;