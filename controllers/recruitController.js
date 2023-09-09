const recruitModel = require('../models/recruitModel.js');
const fs = require('fs');

module.exports = {
    saveForm: async (req, res) => {
        const formData = req.body;
        const result = await recruitModel.createRecruitForm(formData);
        res.send(result);
    },
    saveFile: async (req, res) => {
        // 파일명에 지원자 이름 명시
        try {
            fs.renameSync(req.files[0].path, `uploads/[${req.body.name}]_${req.files[0].filename}`);
            res.send({'status': true});
        } catch {
            res.send({'status': false});
        }
    }
}