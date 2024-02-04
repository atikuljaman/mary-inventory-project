const multer = require('multer');
const path = require('path');
const uploadPath = path.join(__dirname, '..', '..', 'client', 'src', 'assets')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        const uniqueFileName = `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`;
        cb(null, uniqueFileName);
    }
});

const upload = multer({ storage });

module.exports = upload