const multer = require('multer');
const storage = multer.diskStorage ({
    destination : (req , file , callback) => {
        callback(null, __dirname + '/../uploads');
    },
    filename : (req,file,callback) => {
        callback(null, file.originalname); 
    } 
})

const upload = multer({storage});
module.exports = upload;