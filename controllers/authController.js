const authModel = require('../models/authModel.js');

module.exports = {
    login: async (req, res) => {
        const name = req.body.name;
        const phone = req.body.phone;
        const password = req.body.password;

        const result = await authModel.login(name, phone, password);

        res.json({success: result});
    },
}