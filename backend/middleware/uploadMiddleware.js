const multer = require('multer');
const path = require('path');


// configure storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

// configure file filter
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only JPEG, PNG and JPG are allowed!'), false);
    }
};
// configure limits
const limits = {
    fileSize: 1024 * 1024 * 5 // 5 MB
};
// create upload middleware
const upload = multer({
    storage,
    fileFilter,
    limits
})
// export the middleware
module.exports = upload;
