const db = require("../config/db");

module.exports = {
  getAllDocuments: async () => {
    const query = 'SELECT * FROM Document;';
    const documents = await db.query(query);

    return documents[0];
  },
  getCheckedList: async (executiveId) => {
    const query = 'SELECT document_fk FROM Evaluation WHERE executive_fk=?;';
    const evaluations = await db.query(query, [executiveId]);

    return evaluations[0];
  },
  getDocument: async (documentId) => {
    const query = 'SELECT * FROM Document WHERE document_id=?;';
    const document = await db.query(query, [documentId]);

    return document[0][0];
  },
  getEvaluations: async (documentId) => {
    const query = `
    SELECT AVG(q1) AS avg_q1, AVG(q2) AS avg_q2, AVG(q3) AS avg_q3, AVG(q4) AS avg_q4,
    AVG(q5) AS avg_q5, AVG(q6) AS avg_q6, AVG(coding_test) AS avg_coding_test
    FROM Evaluation
    WHERE document_fk=?;`;
    const result = await db.query(query, [documentId]);
    console.log(result[0]);

    return result[0];
  }
}