const express = require('express');
const router = express.Router();
const examineController = require('../controllers/examineController.js');

router.post('/read_applies', examineController.getAllDocuments);
router.get('/read/:document_id', examineController.getDocument);
router.get('/statistics/:document_id', examineController.getDocumentEvaluation);

module.exports = router;