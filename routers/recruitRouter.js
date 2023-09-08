const express = require('express');
const router = express.Router();
const RecruitController = require('../controllers/recruitController.js');

router.post('/save_form', RecruitController.saveForm);

module.exports = router;