const multer = require('multer');
const path = require('path');
const mkdirp = require('mkdirp');
const fs = require('fs');



const getDirImage = () => {
    let year = new Date().getFullYear();
    let month = new Date().getMonth() + 1;
    let day = new Date().getDay();
    let dir = `${path.join(__dirname, 'public')}/upload/images/${year}/${month}/${day}/`
    return dir;
}

const imageStorage = multer.diskStorage({
    destination: (req, file, cb) => {

        let dir = getDirImage();

        mkdirp(dir)
            .then(made => {
                cb(null, dir);
            });
    },
    
    filename: (req, file, cb) => {
        let filePath = getDirImage() + '/' + file.originalname;
        if (!fs.existsSync(filePath)) {
            cb(null, file.originalname)
        } else {
            cb(null, Date.now() + '-' + file.originalname)
        }
    }
})

const uploadImage = multer({
    storage: imageStorage
});


module.exports = uploadImage;