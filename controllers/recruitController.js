const recruitModel = require('../models/recruitModel.js');

module.exports = {
    saveForm: async (req, res) => {
        const formData = req.body;
        const result = await recruitModel.createRecruitForm(formData);
        res.send(result);
    }
}