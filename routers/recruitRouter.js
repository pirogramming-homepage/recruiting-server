const express = require('express');
const router = express.Router();
const RecruitController = require('../controllers/recruitController.js');
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, `${file.fieldname}_${Date.now()}.py`);
    }
})

const upload = multer({ storage: storage })

router.post('/save_form', RecruitController.saveForm);
router.post('/save_file', upload.array('coding-test'), RecruitController.saveFile);

module.exports = router;