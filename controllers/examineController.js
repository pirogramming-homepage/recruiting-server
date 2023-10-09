const examineModel = require('../models/examineModel.js');

module.exports = {
  getAllDocuments: async (req, res) => {
    const executiveId = req.body.executive_id;

    const documents = await examineModel.getAllDocuments();
    const documentIdList = await examineModel.getCheckedList(executiveId);

    res.json({documents: documents, documentIdList: documentIdList});
  },
  getDocument: async (req, res) => {
    const documentId = req.params.document_id;
    const document = await examineModel.getDocument(documentId);

    res.json({document: document});
  },
  getDocumentEvaluation: async (req, res) => {
    const documentId = req.params.document_id;
    const evaluations = await examineModel.getEvaluations(documentId);

    res.json({evaluations: evaluations});
  }
}