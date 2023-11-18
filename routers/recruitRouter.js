const express = require('express');
const router = express.Router();
const RecruitController = require('../controllers/recruitController.js');

router.post('/get_csrf', RecruitController.getCSRF);
router.post('/save_home', RecruitController.saveHome);
router.post('/save_form', RecruitController.saveForm);
router.post('/save_file', RecruitController.saveFile);
router.post('/send_mail', RecruitController.sendMail);

module.exports = router;