const recruitModel = require('../models/recruitModel.js');

module.exports = {
    saveForm: async (req, res) => {
        console.log(req);
        const formData = req.body;
        // console.log(formData);
        await recruitModel.createRecruitForm(formData);
        return 0;
    }
}