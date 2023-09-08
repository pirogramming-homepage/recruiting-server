const db = require('../config/db.js');

module.exports = {
    createRecruitForm: async(formData) => {
        const attend = formData.attend == 'true' ? true : false;
        const workshop = formData.workshop == 'true' ? true : false;
        const personal_info = formData.personal_info == 'true' ? true : false;
        const deposit = formData.deposit == 'true' ? true : false;
        
        const rawQuery = `
        INSERT INTO Document(attend_ok, workshop_ok, pi_ok, deposit_ok)
        VALUE(?, ?, ?, ?);
        `;
        await db.query(
            rawQuery,
            [
                attend, workshop, personal_info, deposit
            ]);
        return {"success": "success"};
    }
}